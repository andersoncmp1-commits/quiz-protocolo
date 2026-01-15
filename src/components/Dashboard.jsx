import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AnalyticsService } from '../services/analytics';
import { steps } from '../data/quiz';
import { ArrowLeft, Trash2, RefreshCcw, GripVertical } from 'lucide-react';
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

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState('analytics');
    const [localSteps, setLocalSteps] = useState([]);
    const navigate = useNavigate();

    // Load Analytics Data
    const loadData = () => {
        // We want analytics to respect the CURRENT order if saved
        // But for consistency, let's load the order first
        const currentOrder = getOrderedSteps();
        const stats = AnalyticsService.getFunnelStats(currentOrder);
        setData(stats);
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
        
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleReset = () => {
        if (window.confirm('Tem certeza que deseja apagar TODOS os dados do quiz?\n\nIsso irá limpar:\n- Dados de analytics/acessos\n- Ordem personalizada do quiz\n- Respostas salvas')) {
            // Clear all quiz-related data
            AnalyticsService.reset();
            localStorage.removeItem('quiz_order');
            localStorage.removeItem('quizAnswers');
            localStorage.removeItem('currentStep');
            
            // Reload the data
            loadData();
            setLocalSteps([...steps]);
            
            alert('✅ Todos os dados foram limpos com sucesso!');
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
        <div className="min-h-screen p-8 bg-slate-900 text-slate-100">
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
                    <div className="space-y-8">
                        {/* Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card
                                title="Total Visitors"
                                value={data[0]?.visitors || 0}
                                subtitle="Started the quiz"
                            />
                            <Card
                                title="Completion Rate"
                                value={`${data.length > 0 ? ((data[data.length - 1].visitors / data[0].visitors) * 100).toFixed(1) : 0}%`}
                                subtitle="Reached the end"
                            />
                            <Card
                                title="Biggest Drop-off"
                                value={data.reduce((max, step) => step.dropOff > max.dropOff ? step : max, { dropOff: 0 }).label || '-'}
                                subtitle="Needs optimization"
                                warning
                            />
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
