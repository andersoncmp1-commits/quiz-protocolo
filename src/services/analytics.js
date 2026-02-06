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
            await fetch(TRACK_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    step_id: stepId,
                    quiz_name: QUIZ_NAME,
                    user_agent: navigator.userAgent,
                    referrer: document.referrer,
                    ...utmParams
                }),
            });
        } catch (error) {
            console.error('Failed to track step:', error);
        }
    },

    // Get funnel stats from Supabase for the Dashboard
    // Options: { date: 'YYYY-MM-DD' } for single day, { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' } for range
    getFunnelStats: async (allSteps, options = {}) => {
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
                label: step.type === 'question' ? `Q: ${step.question.substring(0, 15)}...` : step.id,
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
                totalUniqueVisitors
            };
        } catch (error) {
            console.error('Failed to get funnel stats:', error);
            // Fallback to empty stats
            return {
                funnelStats: allSteps.map(step => ({
                    id: step.id,
                    name: step.id,
                    label: step.type === 'question' ? `Q: ${step.question.substring(0, 15)}...` : step.id,
                    visitors: 0,
                    dropOff: 0
                })),
                dailyStats: [],
                totalUniqueVisitors: 0
            };
        }
    },

    // Reset data (only clears local session, not Supabase data)
    reset: () => {
        sessionStorage.removeItem('quiz_session_id');
        sessionStorage.removeItem('quiz_utm_params');
        console.log('Local session data cleared. Note: Supabase data is not affected.');
    },

    // Legacy method for backward compatibility (returns empty data)
    getData: () => {
        return { sessions: [], stepCounts: {} };
    }
};
