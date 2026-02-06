import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AnalyticsService } from '../services/analytics';
import { steps } from '../data/quiz';
import { ArrowLeft, Trash2, RefreshCcw, GripVertical, Calendar, X, Eye, User, TrendingUp, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Reorder, useDragControls } from "framer-motion";

const DraggableStepItem = ({ step, index }) => {
    const controls = useDragControls();

    return (
        <Reorder.Item 
            value={step}
            dragListener={false}
            dragControls={controls}
            className="relative"
        >
            <div className="glass-card p-4 flex items-center gap-4 hover:bg-slate-800 transition-colors group select-none">
                <div 
                    className="text-slate-500 group-hover:text-slate-300 cursor-grab active:cursor-grabbing p-2 hover:bg-slate-700/50 rounded"
                    onPointerDown={(e) => controls.start(e)}
                    style={{ touchAction: 'none' }}
                >
                    <GripVertical />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm text-slate-300">
                    {index + 1}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200 uppercase text-xs tracking-wider bg-slate-700 px-2 py-0.5 rounded">
                            {step.type}
                        </span>
                        <span className="text-slate-400 text-xs font-mono">{step.id}</span>
                    </div>
                    <p className="font-medium text-slate-300 mt-1 line-clamp-1">
                        {step.question ? step.question.replace(/<[^>]*>?/gm, '') : (step.title || step.copy || 'Sem título')}
                    </p>
                </div>
            </div>
        </Reorder.Item>
    );
};

// Date filter options
const DATE_FILTERS = [
    { label: 'Todos', value: 'all' },
    { label: 'Hoje', value: 'today' },
    { label: 'Ontem', value: 'yesterday' },
    { label: 'Últimos 7 dias', value: 'last7days' },
    { label: 'Últimos 30 dias', value: 'last30days' },
    { label: 'Data específica', value: 'custom' },
];

const getDateFromFilter = (filter) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (filter) {
        case 'today':
            return { date: today.toISOString().split('T')[0] };
        case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return { date: yesterday.toISOString().split('T')[0] };
        case 'last7days':
            const last7 = new Date(today);
            last7.setDate(last7.getDate() - 6);
            return { 
                startDate: last7.toISOString().split('T')[0], 
                endDate: today.toISOString().split('T')[0] 
            };
        case 'last30days':
            const last30 = new Date(today);
            last30.setDate(last30.getDate() - 29);
            return { 
                startDate: last30.toISOString().split('T')[0], 
                endDate: today.toISOString().split('T')[0] 
            };
        default:
            return {};
    }
};

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [dailyStats, setDailyStats] = useState([]);
    const [activeTab, setActiveTab] = useState('analytics');
    const [localSteps, setLocalSteps] = useState([]);
    const [dateFilter, setDateFilter] = useState('all');
    const [customDate, setCustomDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Load Analytics Data
    const loadData = async (filter = dateFilter, custom = customDate) => {
        setIsLoading(true);
        const currentOrder = getOrderedSteps();
        
        let options = {};
        if (filter === 'custom' && custom) {
            options = { date: custom };
        } else if (filter !== 'all') {
            options = getDateFromFilter(filter);
        }
        
        const result = await AnalyticsService.getFunnelStats(currentOrder, options);
        setData(result.funnelStats);
        setDailyStats(result.dailyStats);
        setIsLoading(false);
    };

    // Helper to get ordered steps
    const getOrderedSteps = () => {
        const saved = localStorage.getItem('quiz_order');
        if (saved) {
            try {
                const savedIds = JSON.parse(saved);
                const reordered = savedIds.map(id => steps.find(s => s.id === id)).filter(Boolean);
                const others = steps.filter(s => !savedIds.includes(s.id));
                return [...reordered, ...others];
            } catch (e) {
                console.error(e);
            }
        }
        return [...steps];
    };

    useEffect(() => {
        loadData();
        setLocalSteps(getOrderedSteps());
        
        const interval = setInterval(() => loadData(), 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    // Handle filter change
    const handleFilterChange = (newFilter) => {
        setDateFilter(newFilter);
        if (newFilter !== 'custom') {
            setCustomDate('');
            loadData(newFilter, '');
        }
    };

    // Handle custom date change
    const handleCustomDateChange = (date) => {
        setCustomDate(date);
        if (date) {
            loadData('custom', date);
        }
    };

    const handleReset = async () => {
        if (window.confirm('Tem certeza que deseja zerar os dados de ACESSO/VISITAS?\n\nIsso irá apagar todo o histórico de visitas no servidor.\nA ordem das perguntas e configurações NÃO serão alteradas.')) {
            // Clear analytics data only
            await AnalyticsService.reset();
            
            // Clear local session progress (so you can test again from start), but KEEP settings
            localStorage.removeItem('quizAnswers');
            localStorage.removeItem('currentStep');
            // localStorage.removeItem('quiz_order'); // Configuração mantida!
            
            // Reload the data
            loadData();
            
            alert('✅ Dados de acesso foram limpos com sucesso!');
        }
    };

    const handleSaveOrder = () => {
        const ids = localSteps.map(s => s.id);
        localStorage.setItem('quiz_order', JSON.stringify(ids));
        alert('Ordem atualizada com sucesso!');
        loadData(); // Reload stats with new order
    };

    const handleResetOrder = () => {
        if(confirm('Isso voltará a ordem original do Quiz. Confirmar?')) {
            localStorage.removeItem('quiz_order');
            setLocalSteps([...steps]);
            alert('Ordem restaurada.');
            loadData();
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center glass-card gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                            <ArrowLeft />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                                Funnel Admin
                            </h1>
                            <p className="text-xs text-slate-400">Gerencie seu quiz e veja resultados</p>
                        </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="flex bg-slate-800 p-1 rounded-lg">
                        <button 
                            onClick={() => setActiveTab('analytics')}
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'analytics' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Analytics
                        </button>
                        <button 
                            onClick={() => setActiveTab('editor')}
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'editor' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Editar Perguntas
                        </button>
                    </div>

                    <div className="flex gap-2">
                         {activeTab === 'analytics' && (
                            <>
                                <button onClick={loadData} className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                                    <RefreshCcw size={18} /> Atualizar
                                </button>
                                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 bg-red-900/30 text-red-400 border border-red-900 rounded-lg hover:bg-red-900/50 transition-colors">
                                    <Trash2 size={18} /> Limpar Dados
                                </button>
                            </>
                         )}
                         {activeTab === 'editor' && (
                             <>
                                <button onClick={handleResetOrder} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
                                    Restaurar Padrão
                                </button>
                                <button 
                                    onClick={handleSaveOrder}
                                    className="px-4 py-2 rounded-lg font-bold text-sm shadow-lg transition-all flex items-center gap-2"
                                    style={{ backgroundColor: '#2563eb', color: 'white' }}
                                >
                                    Salvar Ordem
                                </button>
                             </>
                         )}
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'analytics' ? (
                    <div className="space-y-6">
                        {/* Date Filter Bar - Improved Design */}
                        <div className="glass-card p-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none" />
                            
                            <div className="flex flex-col xl:flex-row items-center justify-between gap-4 p-2 relative z-10">
                                
                                {/* Label Section */}
                                <div className="hidden md:flex items-center gap-3 text-slate-400 pl-2">
                                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 shadow-sm">
                                        <Calendar className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <span className="font-semibold text-sm uppercase tracking-wider text-slate-500">Período</span>
                                </div>

                                {/* Filters Group */}
                                <div className="flex-1 w-full xl:w-auto flex justify-center">
                                    <div className="flex flex-wrap justify-center gap-1.5 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto">
                                        {DATE_FILTERS.filter(f => f.value !== 'custom').map((filter) => (
                                            <button
                                                key={filter.value}
                                                onClick={() => handleFilterChange(filter.value)}
                                                className={`
                                                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1 md:flex-none whitespace-nowrap
                                                    ${dateFilter === filter.value
                                                        ? 'bg-slate-700 text-white shadow-md ring-1 ring-slate-600'
                                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                                    }
                                                `}
                                            >
                                                {filter.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Custom Date & Actions */}
                                <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                                    <div className={`
                                        relative group flex items-center transition-all duration-200 rounded-lg border 
                                        ${dateFilter === 'custom' 
                                            ? 'bg-purple-500/10 border-purple-500/50 ring-1 ring-purple-500/30' 
                                            : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                                        }
                                    `}>
                                        <div className="absolute left-3 text-slate-400 pointer-events-none">
                                            <Calendar size={14} className={dateFilter === 'custom' ? 'text-purple-400' : ''} />
                                        </div>
                                        <input
                                            type="date"
                                            value={customDate}
                                            onChange={(e) => handleCustomDateChange(e.target.value)}
                                            className="bg-transparent text-sm pl-9 pr-3 py-2 text-slate-200 outline-none cursor-pointer min-w-[140px] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                                        />
                                    </div>

                                    {/* Loading State or Refresh */}
                                    <div className="w-8 flex justify-center">
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <button 
                                                onClick={() => loadData()} 
                                                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-purple-400 transition-colors"
                                                title="Atualizar dados"
                                            >
                                                <RefreshCcw size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overview Cards - Clean Design */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {/* Card 1: Visitantes */}
                            <div className="glass-card p-5 hover:border-purple-500/30 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                        <Eye size={16} className="text-purple-400" />
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visitantes</h3>
                                </div>
                                <p className="text-3xl font-black text-white mb-1">
                                    {data[0]?.visitors.toLocaleString() || 0}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Acessaram o funil
                                </p>
                            </div>

                            {/* Card 2: Iniciaram */}
                            <div className="glass-card p-5 hover:border-blue-500/30 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <User size={16} className="text-blue-400" />
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Iniciaram</h3>
                                </div>
                                <p className="text-3xl font-black text-white mb-1">
                                    {data[1]?.visitors.toLocaleString() || 0}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Interagiram com o quiz
                                </p>
                            </div>

                            {/* Card 3: Conversão */}
                            <div className="glass-card p-5 hover:border-green-500/30 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                                        <TrendingUp size={16} className="text-green-400" />
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversão</h3>
                                </div>
                                <p className="text-3xl font-black text-white mb-1">
                                    {data.length > 1 && data[0]?.visitors > 0 
                                        ? ((data[1].visitors / data[0].visitors) * 100).toFixed(1) 
                                        : 0}%
                                </p>
                                <p className="text-xs text-slate-500">
                                    Taxa de interação
                                </p>
                            </div>

                            {/* Card 4: Leads Qualificados (+50% etapas) */}
                            <div className="glass-card p-5 hover:border-pink-500/30 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                        <User size={16} className="text-pink-400" />
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qualificados</h3>
                                </div>
                                <p className="text-3xl font-black text-white mb-1">
                                    {(() => {
                                        const midIndex = Math.floor(data.length / 2);
                                        return data[midIndex]?.visitors.toLocaleString() || 0;
                                    })()}
                                </p>
                                <p className="text-xs text-slate-500">
                                    +50% de etapas interagidas
                                </p>
                            </div>

                            {/* Card 5: Conclusão */}
                            <div className="glass-card p-5 hover:border-orange-500/30 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                        <ClipboardCheck size={16} className="text-orange-400" />
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conclusão</h3>
                                </div>
                                <p className="text-3xl font-black text-white mb-1">
                                    {data[data.length - 1]?.visitors.toLocaleString() || 0}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Finalizaram o quiz
                                </p>
                            </div>
                        </div>

                        {/* Funnel Chart */}
                        <div className="glass-card h-[500px]">
                            <h2 className="text-xl font-bold mb-6">Retention by Step</h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={data}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis
                                        dataKey="label"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        stroke="#94a3b8"
                                        fontSize={12}
                                    />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
                                        itemStyle={{ color: '#818cf8' }}
                                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                    />
                                    <Bar dataKey="visitors" name="Visitors" radius={[4, 4, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.dropOff > 20 ? '#ef4444' : '#8b5cf6'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Detailed Table */}
                        <div className="glass-card overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-700 text-slate-400">
                                        <th className="p-4">Step Name</th>
                                        <th className="p-4">Visitors</th>
                                        <th className="p-4">Drop-off Rate</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((step, i) => (
                                        <tr key={step.id} className="border-b border-slate-700/50 hover:bg-slate-800/30">
                                            <td className="p-4 font-medium">{step.label}</td>
                                            <td className="p-4">{step.visitors}</td>
                                            <td className="p-4 text-slate-300">
                                                {i === 0 ? '-' : (
                                                    <span className={`${step.dropOff > 20 ? 'text-red-400' : 'text-green-400'}`}>
                                                        {step.dropOff}%
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {step.dropOff > 20 && i !== 0 ? (
                                                    <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs border border-red-500/20">Critical</span>
                                                ) : (
                                                    <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs border border-green-500/20">Healthy</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-blue-500/20 mb-6">
                            <p className="text-blue-300 text-sm flex items-center gap-2">
                                ℹ️ Arraste os itens abaixo para reordenar a sequência do quiz. Não esqueça de salvar no botão acima.
                            </p>
                        </div>
                        
                        <Reorder.Group axis="y" values={localSteps} onReorder={setLocalSteps} className="space-y-3 pb-12">
                            {localSteps.map((step, index) => (
                                <DraggableStepItem key={step.id} step={step} index={index} />
                            ))}
                        </Reorder.Group>
                    </div>
                )}            </div>
        </div>
    );
};





const Card = ({ title, value, subtitle, warning }) => (
    <div className={`glass-card p-6 ${warning ? 'border-red-500/30' : ''}`}>
        <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
        <p className={`text-3xl font-bold mb-1 ${warning ? 'text-red-400' : 'text-white'}`}>{value}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
);

export default Dashboard;
