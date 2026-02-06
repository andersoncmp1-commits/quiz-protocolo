// Analytics service with Supabase integration for centralized tracking
const SUPABASE_URL = 'https://kfzcjrmejjgnadaboedh.supabase.co';
const TRACK_ENDPOINT = `${SUPABASE_URL}/functions/v1/track-quiz-event`;
const STATS_ENDPOINT = `${SUPABASE_URL}/functions/v1/get-quiz-analytics`;
const QUIZ_NAME = 'crianca_interior';

// Generate or retrieve session ID
const getSessionId = () => {
    let sessionId = sessionStorage.getItem('quiz_session_id');
    if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('quiz_session_id', sessionId);
    }
    return sessionId;
};

// Get UTM parameters from URL
const getUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        utm_term: urlParams.get('utm_term'),
    };
};

// Store UTM params on first load
const storeUTMParams = () => {
    const utmParams = getUTMParams();
    const hasAnyUTM = Object.values(utmParams).some(v => v !== null);
    
    if (hasAnyUTM) {
        sessionStorage.setItem('quiz_utm_params', JSON.stringify(utmParams));
    }
};

// Retrieve stored UTM params
const getStoredUTMParams = () => {
    const stored = sessionStorage.getItem('quiz_utm_params');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return {};
        }
    }
    return getUTMParams();
};

// Store UTM on load
if (typeof window !== 'undefined') {
    storeUTMParams();
}

export const AnalyticsService = {
    // Track a step view - sends to Supabase
    trackStep: async (stepId) => {
        const sessionId = getSessionId();
        const utmParams = getStoredUTMParams();
        
        try {
            // Send to Supabase Edge Function
            const response = await fetch(TRACK_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                keepalive: true,
                body: JSON.stringify({
                    session_id: sessionId,
                    step_id: stepId,
                    quiz_name: QUIZ_NAME,
                    user_agent: navigator.userAgent,
                    referrer: document.referrer,
                    ...utmParams
                }),
            });

            if(!response.ok) throw new Error('Network response was not ok');
            // console.log(`[Analytics] Tracked ${stepId} successfully`);
        } catch (error) {
            console.error(`[Analytics] Failed to track step ${stepId}:`, error);
        }
    },

    // Get funnel stats from Supabase for the Dashboard
    // Options: { date: 'YYYY-MM-DD' } for single day, { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' } for range
    getFunnelStats: async (allSteps, options = {}) => {
        // Descriptive labels for each step
        const STEP_LABELS = {
            'landing': '🏠 Página Inicial',
            'transition_gender': '⏳ Carregando Quiz',
            'q1': '📅 Pergunta: Idade',
            'q2': '🧒 Pergunta: Criança Interior',
            'transition_inner_child': '💡 Transição: Já Conhece',
            'transition_inner_child_intro': '📖 Transição: Introdução CI',
            'q3': '👨‍👩‍👧 Pergunta: Pais na Infância',
            'q4': '🏡 Pergunta: Ambiente de Criação',
            'q5': '💔 Pergunta: Memórias Negativas',
            'transition_info_1': '📊 Info: 5 Feridas Emocionais',
            'q6': '😰 Pergunta: Mente Sobrecarregada',
            'q7': '🗣️ Pergunta: Voz Interna',
            'q8': '💞 Pergunta: Relacionamentos',
            'transition_info_2': '📰 Info: Impacto do Trauma',
            'q9': '⏰ Pergunta: Procrastinação',
            'q10': '💸 Pergunta: Vida Financeira',
            'q11': '🚫 Pergunta: Limites e Dizer Não',
            'transition_info_3': '🎯 Info: Benefícios do Protocolo',
            'q12': '🤝 Pergunta: Comprometimento',
            'q13': '🎯 Pergunta: Área para Melhorar',
            'q14': '✨ Pergunta: Outros Temas',
            'analysis': '⚙️ Análise das Respostas',
            'sales': '🛒 Página de Vendas'
        };
        
        try {
            let url = `${STATS_ENDPOINT}?quiz_name=${QUIZ_NAME}`;
            
            if (options.date) {
                url += `&date=${options.date}`;
            } else if (options.startDate && options.endDate) {
                url += `&start_date=${options.startDate}&end_date=${options.endDate}`;
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch analytics');
            }
            
            const { stepCounts = {}, dailyStats = [], totalUniqueVisitors = 0 } = await response.json();
            
            const stats = allSteps.map(step => ({
                id: step.id,
                name: step.id,
                label: STEP_LABELS[step.id] || step.id,
                visitors: stepCounts[step.id] || 0
            }));

            // Calculate drop-off
            const funnelStats = stats.map((step, index) => {
                const prevStep = stats[index - 1];
                const dropOff = prevStep && prevStep.visitors > 0 
                    ? ((prevStep.visitors - step.visitors) / prevStep.visitors * 100).toFixed(1) 
                    : 0;
                return {
                    ...step,
                    dropOff: isNaN(dropOff) ? 0 : Number(dropOff)
                };
            });

            return {
                funnelStats,
                dailyStats,
                totalUniqueVisitors,
                stepCounts
            };
        } catch (error) {
            console.error('Failed to get funnel stats:', error);
            // Fallback to empty stats
            return {
                funnelStats: allSteps.map(step => ({
                    id: step.id,
                    name: step.id,
                    label: STEP_LABELS[step.id] || step.id,
                    visitors: 0,
                    dropOff: 0
                })),
                dailyStats: [],
                totalUniqueVisitors: 0,
                stepCounts: {}
            };
        }
    },

    // Reset data (clears both local session and Supabase data)
    reset: async () => {
        // Clear local storage
        sessionStorage.removeItem('quiz_session_id');
        sessionStorage.removeItem('quiz_utm_params');
        
        try {
            // Call Supabase function to delete remote data
            const RESET_ENDPOINT = `${SUPABASE_URL}/functions/v1/reset-quiz-analytics`;
            
            const response = await fetch(RESET_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quiz_name: QUIZ_NAME
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to reset remote data');
            }
            
            console.log('Quiz analytics reset successfully (Local + Remote)');
            return true;
        } catch (error) {
            console.error('Failed to reset analytics:', error);
            return false;
        }
    },

    // Legacy method for backward compatibility (returns empty data)
    getData: () => {
        return { sessions: [], stepCounts: {} };
    }
};
