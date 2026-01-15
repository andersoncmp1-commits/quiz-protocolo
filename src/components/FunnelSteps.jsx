import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Shield, Play, Lock, ChevronRight, CloudRain, Sprout, Brain, TriangleAlert, Ghost, UserX, ThumbsDown, ShieldAlert, Scale, X } from 'lucide-react';
import crowdImage from '../assets/crowd_silhouettes.png';

const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
};



export const LandingStep = ({ step, onNext }) => {
    return (
        <div className="flex flex-col gap-4 text-center items-center">
            {/* Top Bar Decoration */}


            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="title-box flex flex-col items-center gap-2">
                    <h1 className="title-text">
                        PARA QUEM BUSCA CURAR SEUS
                    </h1>
                    <h1 className="title-text">
                        TRAUMAS DE INFÂNCIA
                    </h1>
                </div>

                <p className="subtitle mb-4 text-center mt-4 px-2"
                    dangerouslySetInnerHTML={{ __html: step.subtitle }}
                />

                <p className="subtitle text-sm text-center px-2 mb-6"
                    style={{ fontSize: '0.9rem', color: '#475569' }}
                    dangerouslySetInnerHTML={{ __html: step.offer }}
                />



                <p className="font-bold text-lg mb-4 text-slate-800"
                    dangerouslySetInnerHTML={{ __html: step.question }}
                />

                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                    {step.options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onNext({ gender: opt.value })}
                            className={`btn-gender ${opt.value}`}
                        >
                            <div className="btn-gender-icon">
                                <ChevronRight size={14} />
                            </div>
                            <span className="btn-gender-text">
                                {opt.label.split(' ')[0]}
                                <span style={{ marginLeft: '4px' }}>{opt.label.split(' ')[1]}</span>
                            </span>
                        </button>
                    ))}
                </div>

                {step.testimonials && step.testimonials.length > 0 && (
                <div className="w-full bg-blue-50/50 p-4 rounded-xl mb-4">
                    <p className="text-sm text-slate-500 mb-4 font-medium">Veja a <span className="text-blue-500 font-bold">opinião de quem já recebeu</span> seu protocolo de emergência emocional:</p>

                    <div className="flex flex-col gap-4">
                        {step.testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="stars">★★★★★</div>
                                <p className="testimonial-title">{t.title}</p>
                                <p className="testimonial-meta">{t.name}, {t.age} anos</p>
                                <p className="testimonial-text">"{t.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
                )}

            </motion.div>
        </div>
    );
};

export const TransitionStep = ({ step, onNext }) => {
    // Custom layout for the "social proof" transition (Step 2)
    if (step.id === 'transition_gender') {
        return (
            <motion.div
                variants={variants} initial="hidden" animate="visible" exit="exit"
                className="glass-card text-center flex flex-col items-center justify-center p-0 overflow-hidden"
                style={{ background: '#f0f9ff' }}
            >
                <div className="w-full relative">
                    <img
                        src={crowdImage}
                        alt="Pessoas curadas"
                        className="w-full h-auto object-cover"
                        style={{ maxHeight: '250px', width: '100%' }}
                    />
                </div>

                <div className="p-8 pb-10 flex flex-col items-center gap-2 w-full">
                    <h2 className="text-4xl font-black text-blue-600">
                        +21.358 pessoas
                    </h2>
                    <p className="text-lg text-slate-600 font-medium mb-6">
                        já curaram seus traumas de infância
                    </p>

                    <button
                        onClick={() => onNext({})}
                        className="btn-orange"
                    >
                        CONTINUAR
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={variants} initial="hidden" animate="visible" exit="exit"
            className="glass-card text-center flex flex-col items-center justify-center gap-6 py-8"
        >
            {/* Custom Title like "Perfeito!" */}
            {step.title && (
                <h2 className="text-3xl font-black text-blue-600 mb-2">{step.title}</h2>
            )}

            {/* Custom Image */}
            {step.image ? (
                <div className="w-full max-w-sm mx-auto mb-4 rounded-xl overflow-hidden">
                    <img
                        src={step.image}
                        alt="Transition visual"
                        className="w-full h-auto object-contain"
                    />
                </div>
            ) : (
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <Check size={32} />
                </div>
            )}

            <h2
                className="h2 font-normal text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: step.copy }}
            />

            {step.buttonText && (
                <button
                    onClick={() => onNext({})}
                    className="btn-orange"
                >
                    {step.buttonText}
                </button>
            )}
        </motion.div>
    );
};

export const InfoStep = ({ step, onNext }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Icon mapping
    const iconMap = {
        Ghost, UserX, ThumbsDown, ShieldAlert, Scale
    };

    // Specific Layout for Benefit Carousel (Question 11 Post-step)
    if (step.layout === 'benefit-carousel') {
        const [currentBenefitSlide, setCurrentBenefitSlide] = useState(0);
        
        // Icon mapping
        const benefitIconMap = {
            Rain: CloudRain, Sprout: Sprout, Brain: Brain
        };

        useEffect(() => {
            if(!step.slides || step.slides.length <= 1) return;
            const timer = setInterval(() => {
                setCurrentBenefitSlide((prev) => (prev + 1) % step.slides.length);
            }, 4000);
            return () => clearInterval(timer);
        }, [step.slides]);

        const slide = step.slides[currentBenefitSlide];
        const Icon = benefitIconMap[slide.icon] || Shield;

        return (
             <motion.div
                variants={variants} initial="hidden" animate="visible" exit="exit"
                className="flex flex-col items-center w-full max-w-md mx-auto"
            >
                <h2 
                    className="text-xl font-black text-center text-slate-900 mb-6 leading-tight"
                    dangerouslySetInnerHTML={{ __html: step.title }}
                />

                {step.image && (
                    <div className="step-image-container">
                        <img 
                            src={step.image} 
                            alt="Journey" 
                            className="w-full h-auto block"
                        />
                    </div>
                )}
                
                <p 
                    className="text-center text-slate-800 font-bold mb-6 text-[15px] leading-snug px-2"
                    dangerouslySetInnerHTML={{ __html: step.subtitle }}
                />

                {/* Benefit Carousel Card */}
                 <div className="relative w-full mb-8">
                     {/* Background Stack Effect */}
                    <div className="absolute top-4 left-4 right-4 bottom-[-10px] bg-white border border-slate-200 rounded-2xl shadow-sm z-0 opacity-60 scale-[0.95]" />

                    <div className="carousel-card z-10 relative bg-indigo-50/50 border-indigo-100 !min-h-[250px] !p-6 flex flex-col justify-center">
                         <motion.div
                            key={currentBenefitSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col h-full"
                         >
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className={`text-lg font-bold ${slide.color}`}>
                                    {slide.title}
                                </h3>
                            </div>

                            <ul className="space-y-3">
                                {slide.checks.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-700 font-medium leading-snug">
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                         </motion.div>
                    </div>

                    {/* Dots */}
                     <div className="absolute bottom-[-35px] left-0 right-0 flex justify-center items-center gap-2 z-20">
                         {step.slides.map((_, i) => {
                            return (
                                <button
                                    key={i}
                                    onClick={() => setCurrentBenefitSlide(i)}
                                    className={`rounded-full transition-all duration-300 ${i === currentBenefitSlide ? 'w-2 h-2 bg-orange-500' : 'w-1.5 h-1.5 bg-orange-200'}`}
                                />
                            );
                        })}
                     </div>
                 </div>

                 <div className="button-wrapper-info">
                    <button
                        onClick={() => onNext({})}
                        className="btn-orange"
                    >
                        {step.buttonText}
                    </button>
                </div>
            </motion.div>
        );
    }

    if (step.layout === 'news-impact') {
        const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
        
        useEffect(() => {
            if(!step.newsSlides || step.newsSlides.length <= 1) return;
            const timer = setInterval(() => {
                setCurrentNewsSlide((prev) => (prev + 1) % step.newsSlides.length);
            }, 3000);
            return () => clearInterval(timer);
        }, [step.newsSlides]);

        return (
            <motion.div
                variants={variants} initial="hidden" animate="visible" exit="exit"
                className="flex flex-col items-center w-full max-w-md mx-auto"
            >
                <h2 
                    className="text-xl font-black text-center text-slate-800 mb-6 leading-tight"
                    dangerouslySetInnerHTML={{ __html: step.title }}
                />

                {/* News Carousel */}
                 {step.newsSlides && (
                    <div className="relative w-full mb-6">
                        <div className="news-carousel-card relative z-10">
                             <motion.div
                                key={currentNewsSlide}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                             >
                                <img src={step.newsSlides[currentNewsSlide]} alt="News" className="w-full h-auto block" />
                             </motion.div>
                        </div>
                        
                        {/* Dots for News Carousel */}
                        <div className="flex justify-center gap-2 mb-2">
                             {(step.newsSlides.length > 1 ? step.newsSlides : [1, 2, 3]).map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`rounded-full transition-all duration-300 ${i === currentNewsSlide ? 'w-2 h-2 bg-orange-500' : 'w-1.5 h-1.5 bg-orange-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <p 
                    className="text-center text-slate-900 text-[15px] leading-snug mb-6 px-2"
                    dangerouslySetInnerHTML={{ __html: step.copy }}
                />

                {/* Grid of Impacts */}
                {step.gridItems && (
                     <div className="grid-impact-container mb-8">
                        {step.gridItems.map((item, i) => (
                            <div key={i} className={`grid-impact-item ${item.fullWidth ? 'grid-impact-full' : ''}`}>
                                <div className="text-yellow-500 text-lg">⚠️</div>
                                <p className="text-sm font-medium text-slate-700 leading-snug" dangerouslySetInnerHTML={{ __html: item.text }} />
                            </div>
                        ))}
                     </div>
                )}

                 <div className="button-wrapper-info">
                    <button
                        onClick={() => onNext({})}
                        className="btn-orange"
                    >
                        {step.buttonText}
                    </button>
                </div>
            </motion.div>
        );
    }

    if (step.carousel && step.slides) {
        useEffect(() => {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % step.slides.length);
            }, 4000); // 4 seconds per slide
            return () => clearInterval(timer);
        }, [step.slides.length]);

        const slide = step.slides[currentSlide];
        const Icon = iconMap[slide.icon] || Shield;

        return (
            <motion.div
                variants={variants} initial="hidden" animate="visible" exit="exit"
                className="flex flex-col items-center w-full max-w-md mx-auto"
            >
                <h2 
                    className="text-xl font-black text-center text-slate-800 mb-3 sm:mb-6 leading-tight"
                    dangerouslySetInnerHTML={{ __html: step.title }}
                />

                {step.image && (
                    <div className="step-image-container">
                        <img 
                            src={step.image} 
                            alt="Illustration" 
                            className="w-full h-auto block"
                        />
                    </div>
                )}

                <p 
                    className="text-center text-slate-900 font-bold mb-2 sm:mb-4 text-[14px] sm:text-[15px]"
                    dangerouslySetInnerHTML={{ __html: step.subtitle }}
                />

                {/* Carousel Card */}
                <div className="relative w-full mb-8">
                    {/* Background Stack Effect for "Next Card" feel */}
                    <div className="absolute top-4 left-4 right-4 bottom-[-10px] bg-white border border-slate-200 rounded-2xl shadow-sm z-0 opacity-60 scale-[0.95]" />
                    
                    <div className="carousel-card z-10 relative">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col h-full"
                        >
                            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                                <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                    {slide.id}
                                </div>
                                <h3 className={`text-xl font-extrabold ${slide.color} tracking-tight`}>
                                    {slide.title}
                                </h3>
                            </div>

                            <div className="flex-1 space-y-3 sm:space-y-5 text-left">
                                <div>
                                    <span className="font-extrabold text-slate-900 text-[15px] block mb-1">Ferida:</span>
                                    <p className="text-[15px] text-slate-600 leading-snug font-medium">
                                        {slide.wound}
                                    </p>
                                </div>

                                <div>
                                    <span className="font-extrabold text-slate-900 text-[15px] block mb-1.5">Consequências na vida adulta:</span>
                                    <ul className="space-y-2.5">
                                        {slide.consequences.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5 text-[14px] text-slate-600 font-medium leading-[1.3]">
                                                <span className="text-base">❌</span>
                                                <span className="text-slate-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Dots - Moved outside and styled to match image */}
                    <div className="absolute bottom-[-35px] left-0 right-0 flex justify-center items-center gap-2 z-20">
                        {step.slides.map((_, i) => {
                            const distance = Math.abs(currentSlide - i);
                            let sizeClass = "w-1.5 h-1.5";
                            let colorClass = "bg-orange-200";

                            if (i === currentSlide) {
                                sizeClass = "w-3 h-3";
                                colorClass = "bg-orange-500";
                            } else if (distance === 1) {
                                sizeClass = "w-2 h-2";
                            } else if (distance === 2) {
                                sizeClass = "w-1.5 h-1.5";
                            } else {
                                sizeClass = "w-1 h-1";
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`rounded-full transition-all duration-300 ${sizeClass} ${colorClass}`}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="button-wrapper-info">
                    <button
                        onClick={() => onNext({})}
                        className="btn-orange"
                    >
                        {step.buttonText}
                    </button>
                </div>
            </motion.div>
        );
    }

    // Default Info Step
    return (
        <motion.div
            variants={variants} initial="hidden" animate="visible" exit="exit"
            className="glass-card flex flex-col gap-6"
        >
            <div className="bg-indigo-50 p-4 rounded-full w-fit mx-auto text-indigo-500">
                <Shield size={32} />
            </div>
            <h2 className="h2 text-center">{step.title}</h2>
            <p className="subtitle text-center">{step.copy}</p>
            <button
                onClick={() => onNext({})}
                className="btn-orange"
            >
                {step.buttonText}
            </button>
        </motion.div>
    );
};

export const QuestionStep = ({ step, onNext }) => {
    const [selected, setSelected] = useState(step.multiSelect ? [] : null);

    const handleSelect = (val) => {
        if (step.multiSelect) {
            if (selected.includes(val)) {
                setSelected(selected.filter(v => v !== val));
            } else {
                setSelected([...selected, val]);
            }
        } else {
            setSelected(val);
            setTimeout(() => onNext({ [step.id]: val }), 300);
        }
    };

    const isSelected = (val) => step.multiSelect ? selected.includes(val) : selected === val;

    return (
        <motion.div
            variants={variants} initial="hidden" animate="visible" exit="exit"
            className="flex flex-col gap-6 w-full max-w-md mx-auto"
        >


            {/* Question as Quote */}
            <div className="relative text-center px-4 mb-4">
                <h2
                    className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight relative z-10"
                    dangerouslySetInnerHTML={{ __html: step.question }}
                />
            </div>

            {/* Subtitle below Question */}
            {step.subtitle && (
                <p 
                    className="text-center text-slate-600 text-lg font-medium mb-8"
                    dangerouslySetInnerHTML={{ __html: step.subtitle }}
                />
            )}

            <div className={
                step.layout === 'grid' ? "grid grid-cols-2 gap-4" :
                step.layout === 'pills' ? "pills-container" : 
                "flex flex-col gap-3"
            }>
                {step.options.map((opt, i) => {
                    const val = typeof opt === 'string' ? opt : opt.value;
                    const label = typeof opt === 'string' ? opt : opt.label;
                    const active = isSelected(val);

                    if (step.layout === 'grid') {
                        return (
                            <button
                                key={i}
                                onClick={() => handleSelect(val)}
                                className={`btn-gender ${active ? 'border-orange-500 bg-orange-50' : ''}`}
                                style={{ width: '100%', marginBottom: 0 }}
                            >
                                <div className="btn-gender-icon">
                                    <ChevronRight size={14} />
                                </div>
                                <span className="btn-gender-text font-medium text-slate-700 text-left">
                                    {label}
                                </span>
                            </button>
                        );
                    }

                    if (step.layout === 'list-gender') {
                         return (
                            <button
                                key={i}
                                onClick={() => handleSelect(val)}
                                className={`btn-gender w-full justify-center relative ${active ? 'border-orange-500 bg-orange-50' : ''}`}
                            >
                                <div className="absolute left-4 w-6 h-6 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm">
                                    <ChevronRight size={14} />
                                </div>
                                <span className="font-medium text-slate-700 text-lg">
                                    {label}
                                </span>
                            </button>
                        );
                    }
                    if (step.layout === 'list-icons') {
                         return (
                            <button
                                key={i}
                                onClick={() => handleSelect(val)}
                                className={`btn-list-light ${active ? 'active' : ''}`}
                            >
                                <div className="btn-list-light-icon">
                                    <ChevronRight size={14} />
                                </div>
                                <span className="btn-list-light-text">
                                    {label}
                                </span>
                            </button>
                        );
                    }
                    if (step.layout === 'list-checkbox') {
                        return (
                            <button
                                key={i}
                                onClick={() => handleSelect(val)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    gap: '16px',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: active ? '2px solid #f97316' : '2px solid #fed7aa',
                                    backgroundColor: active ? '#ffedd5' : '#ffffff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    marginBottom: '8px'
                                }}
                            >
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    minWidth: '24px',
                                    borderRadius: '4px',
                                    border: active ? '2px solid #f97316' : '2px solid #94a3b8',
                                    backgroundColor: active ? '#f97316' : '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {active && <Check size={16} color="#ffffff" strokeWidth={3} />}
                                </div>
                                <span style={{
                                    textAlign: 'left',
                                    fontWeight: 700,
                                    color: '#1e293b',
                                    fontSize: '18px',
                                    lineHeight: '1.4'
                                }}>
                                    {label}
                                </span>
                            </button>
                        );
                    }
                    if (step.layout === 'list-emoji') {
                         return (
                            <button
                                key={i}
                                onClick={() => handleSelect(val)}
                                className={`btn-list-light ${active ? 'active' : ''}`}
                            >
                                <span className="btn-list-light-text">
                                    {label}
                                </span>
                            </button>
                        );
                    }
                    if (step.layout === 'pills') {
                        return (
                            <button
                                key={i}
                                onClick={() => handleSelect(val)}
                                className={`btn-pill ${active ? 'active' : ''}`}
                            >
                                <div className="pill-checkbox">
                                    {active && <Check size={14} className="text-white" strokeWidth={4} />}
                                </div>
                                <span className="pill-label">{label}</span>
                            </button>
                        );
                    }

                    // Default List Layout (Updated to match Image)
                    const isCheckbox = step.multiSelect;

                    return (
                        <button
                            key={i}
                            onClick={() => handleSelect(val)}
                            className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all relative group text-left
                                ${active 
                                    ? 'bg-orange-100 border-orange-400 shadow-sm' 
                                    : 'bg-orange-50 border-orange-200 hover:border-orange-300'
                                }
                            `}
                        >
                            {isCheckbox ? (
                                // Checkbox Style
                                <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-colors border-2
                                    ${active 
                                        ? 'bg-orange-500 border-orange-500 text-white' 
                                        : 'bg-white border-orange-300 text-transparent'
                                    }
                                `}>
                                    <Check size={16} strokeWidth={3} />
                                </div>
                            ) : (
                                // Original Chevron Style (kept for single select if needed)
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors border
                                    ${active 
                                        ? 'bg-orange-500 border-orange-500 text-white' 
                                        : 'bg-white border-orange-100 text-orange-400 group-hover:border-orange-200'
                                    }
                                `}>
                                    <ChevronRight size={20} className={active ? "text-white" : "text-orange-400"} strokeWidth={3} />
                                </div>
                            )}
                            
                            <span className={`font-bold text-lg leading-snug ${active ? 'text-slate-900' : 'text-slate-700'}`}>
                                {label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {step.multiSelect && (
                <button
                    disabled={selected.length === 0}
                    onClick={() => onNext({ [step.id]: selected })}
                    className="btn-orange mt-4"
                >
                    CONTINUAR
                </button>
            )}
        </motion.div>
    );
};

export const AnalysisStep = ({ step, onNext }) => {
    const [progress, setProgress] = useState([0, 0, 0]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const animate = async () => {
            const animateBar = (index, duration) => {
                return new Promise(resolve => {
                    let start = 0;
                    const intervalTime = 20;
                    const steps = duration / intervalTime;
                    const increment = 100 / steps;
                    
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= 100) {
                            start = 100;
                            setProgress(prev => {
                                const newP = [...prev];
                                newP[index] = 100;
                                return newP;
                            });
                            clearInterval(timer);
                            resolve();
                        } else {
                            setProgress(prev => {
                                const newP = [...prev];
                                newP[index] = start;
                                return newP;
                            });
                        }
                    }, intervalTime);
                });
            };

            await animateBar(0, 3333);
            await animateBar(1, 3333);
            await animateBar(2, 3334);
            setIsComplete(true);
        };

        animate();
    }, []);

    const testimonials = [
        {
            title: "Eu fui uma criança adultizada",
            name: "Felipe Santos",
            age: 29,
            text: "Minha mãe sofria de depressão e meu pai era sempre ausente. Aos 10 anos, eu já cozinhava, limpava a casa e cuidava dos meus irmãos. Nunca tive a chance de ser criança. Isso me tornou uma pessoa muito rígida, incapaz de relaxar ou confiar nos outros. Quando iniciei o protocolo, percebi que carregava responsabilidades que nunca deveriam ter sido minhas. Devolver esse peso me deu liberdade para, finalmente, viver a minha própria vida."
        },
        {
            title: "Carreguei a culpa pelos erros dos meus pais",
            name: "Juliano Castro",
            age: 51,
            text: "Quando eu tinha 8 anos, minha mãe foi embora de casa. Meu pai me fez acreditar que foi culpa minha. Essa culpa me acompanhou por décadas, me fazendo sentir sempre insuficiente e incapaz. Com o diagnóstico, finalmente enxerguei que aquela criança não tinha culpa de nada. Consegui acolher minha versão pequena e machucada, e foi como libertar uma parte de mim que estava presa há anos. Hoje vivo muito mais leve."
        },
        {
            title: "Passei a vida reprimindo o que eu sentia",
            name: "Suzana Torres",
            age: 63,
            text: "Na minha casa, chorar era proibido. Sempre que eu mostrava tristeza, diziam que eu estava \"fazendo drama\". Então aprendi a engolir tudo: dor, raiva, solidão. O protocolo me mostrou que esconder minhas emoções só aumentava o vazio. Hoje não tenho medo de sentir, de chorar, de pedir ajuda. Pela primeira vez, sinto que minha voz importa."
        }
    ];

    if (isComplete) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ 
                    width: '100%', 
                    maxWidth: '500px', 
                    margin: '0 auto', 
                    padding: '24px',
                    backgroundColor: 'transparent'
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                        Seu diagnóstico revela:
                    </h2>
                    <div style={{ 
                        display: 'inline-block', 
                        backgroundColor: '#fef3c7', 
                        padding: '10px 20px', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <span style={{ 
                            color: '#dc2626', 
                            fontWeight: 800, 
                            fontSize: '16px', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            ⚠️ Seus traumas exigem atenção! ⚠️
                        </span>
                    </div>
                </div>

                {/* Three Metric Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
                    {[
                        { label: 'INTENSIDADE', label2: 'DO TRAUMA', val: 82 },
                        { label: 'IMPACTO NO', label2: 'COTIDIANO', val: 74 },
                        { label: 'RISCO PARA', label2: 'SAÚDE MENTAL', val: 87 },
                    ].map((item, i) => (
                        <div key={i} style={{ 
                            backgroundColor: '#ffffff', 
                            borderRadius: '16px', 
                            padding: '16px 8px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minHeight: '180px'
                        }}>
                            <p style={{ 
                                fontSize: '11px', 
                                fontWeight: 700, 
                                color: '#dc2626', 
                                textAlign: 'center',
                                lineHeight: '1.3',
                                marginBottom: '12px',
                                textTransform: 'uppercase'
                            }}>
                                {item.label}<br/>{item.label2}
                            </p>
                            <div style={{ 
                                flex: 1, 
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                width: '100%'
                            }}>
                                <div style={{ 
                                    width: '40px', 
                                    height: '80px', 
                                    backgroundColor: '#fecaca', 
                                    borderRadius: '8px 8px 0 0',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${item.val}%` }}
                                        transition={{ duration: 1.2, delay: 0.3 }}
                                        style={{ 
                                            position: 'absolute',
                                            bottom: 0,
                                            width: '100%',
                                            backgroundColor: '#dc2626',
                                            borderRadius: '6px 6px 0 0'
                                        }}
                                    />
                                </div>
                                <p style={{ 
                                    fontSize: '14px', 
                                    fontWeight: 700, 
                                    color: '#64748b',
                                    marginTop: '8px'
                                }}>
                                    {item.val}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Three Gradient Sliders */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
                    {[
                        { 
                            label: 'Nível de sobrecarga mental', 
                            val: 79, 
                            desc: 'O teste indica que você frequentemente antecipa o fracasso, decepção ou dificuldades.',
                            gradient: 'linear-gradient(to right, #22c55e, #eab308, #ef4444)'
                        },
                        { 
                            label: 'Qualidade das suas emoções', 
                            val: 28, 
                            desc: 'Parece que a fonte da sua infelicidade pode ser a dúvida sobre si mesmo e a alta frequência de emoções negativas.',
                            gradient: 'linear-gradient(to right, #ef4444, #eab308, #22c55e)'
                        },
                        { 
                            label: 'Índice de autossabotagem', 
                            val: 73, 
                            desc: 'Esse padrão muitas vezes esconde pensamentos autocríticos, dificultando tanto o início quanto a conclusão de tarefas importantes.',
                            gradient: 'linear-gradient(to right, #22c55e, #eab308, #ef4444)'
                        },
                    ].map((item, i) => (
                        <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6' }}>{item.label}</span>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#93c5fd' }}>{item.val}%</span>
                            </div>
                            <div style={{ 
                                position: 'relative', 
                                height: '12px', 
                                borderRadius: '9999px',
                                background: item.gradient,
                                marginBottom: '12px'
                            }}>
                                <motion.div 
                                    initial={{ left: '0%' }}
                                    animate={{ left: `calc(${item.val}% - 10px)` }}
                                    transition={{ duration: 1.2, delay: 0.5 }}
                                    style={{ 
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: '#ffffff',
                                        border: '4px solid #f97316',
                                        borderRadius: '50%',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}
                                />
                            </div>
                            <p style={{ 
                                fontSize: '13px', 
                                color: '#64748b', 
                                textAlign: 'center',
                                lineHeight: '1.5',
                                fontWeight: 500
                            }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', lineHeight: '1.3' }}>
                        <span style={{ color: '#3b82f6' }}>Comece agora</span> <span style={{ color: '#1e293b' }}>sua jornada de cura!</span>
                    </h3>
                    <p style={{ 
                        color: '#64748b', 
                        fontSize: '14px', 
                        marginBottom: '20px',
                        lineHeight: '1.6'
                    }}>
                        Clique em <span style={{ 
                            backgroundColor: '#fed7aa', 
                            color: '#ea580c', 
                            fontWeight: 700, 
                            padding: '2px 6px', 
                            borderRadius: '4px' 
                        }}>CURAR MEUS TRAUMAS</span> para colocar um ponto final no seu ciclo de dor e sofrimento.
                    </p>
                    
                    <button
                        onClick={() => onNext({})}
                        style={{
                            width: '100%',
                            backgroundColor: '#f97316',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '18px',
                            padding: '16px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 0 #c2410c',
                            transition: 'all 0.2s'
                        }}
                    >
                        CURAR MEUS TRAUMAS
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="w-full max-w-md mx-auto flex flex-col gap-6 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800">
                    Estamos <span className="text-blue-600 italic">analisando</span> as suas<br />respostas...
                </h2>
            </div>

            <div className="flex flex-col gap-4 px-2">
                <ProgressBar label="Identificando feridas emocionais" value={progress[0]} />
                <ProgressBar label="Finalizando diagnóstico" value={progress[1]} />
                <ProgressBar label="Personalizando protocolo terapêutico" value={progress[2]} />
            </div>

            <div className="flex flex-col gap-4 mt-4">
                {testimonials.map((t, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 * i }}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2"
                    >
                        <div className="flex text-orange-400 text-sm tracking-widest">★ ★ ★ ★ ★</div>
                        <h3 className="text-blue-600 font-bold text-base leading-tight">"{t.title}"</h3>
                        <p className="text-xs font-medium text-slate-500 mb-1">{t.name}, {t.age} anos</p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {t.text}
                        </p>
                    </motion.div>
                ))}
            </div>
            
            <div className="h-20"></div>
        </motion.div>
    );
};

const ProgressBar = ({ label, value }) => (
    <div style={{ width: '100%', marginBottom: '16px' }}>
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '8px' 
        }}>
            <span style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#60a5fa' 
            }}>{label}</span>
            <span style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#93c5fd' 
            }}>{Math.round(value)}%</span>
        </div>
        <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: '#fed7aa', 
            borderRadius: '9999px', 
            overflow: 'hidden' 
        }}>
            <motion.div 
                style={{ 
                    height: '100%', 
                    backgroundColor: '#f97316', 
                    borderRadius: '9999px',
                    width: `${value}%`
                }} 
                transition={{ duration: 0.1 }}
            />
        </div>
    </div>
);

export const LeadCaptureStep = ({ step, onNext }) => {
    const [whatsapp, setWhatsapp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (whatsapp) {
            onNext({ whatsapp });
        }
    };

    return (
        <motion.div
            variants={variants} initial="hidden" animate="visible"
            className="glass-card flex flex-col gap-6 pt-12 relative"
        >
            {/* Top Progress Bar Decoration */}
            <div className="absolute top-0 left-0 w-full flex justify-center pt-6">
                <div className="w-[85%] h-2 bg-orange-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[92%] rounded-full" />
                </div>
            </div>

            <div className="text-center px-2">
                <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
                    Insira seu Whatsapp para <span className="text-blue-600">receber seu diagnóstico com protocolo de emergência emocional!</span>
                </h2>
                <p className="text-slate-600 text-lg">
                    Enviaremos uma cópia direto no seu Whatsapp.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="tel"
                    required
                    className="w-full p-4 rounded-xl border border-slate-300 text-slate-600 placeholder:text-slate-400 placeholder:italic focus:outline-none focus:border-blue-500 text-lg shadow-inner bg-white"
                    placeholder="Digite aqui seu Whatsapp..."
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                />
                
                <button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_rgb(194,65,12)] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wide"
                >
                    CONTINUAR
                </button>
            </form>

            <div className="flex justify-center items-start gap-2 mt-2 opacity-90 px-4">
                 <Lock size={14} className="text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" />
                 <p className="text-xs text-slate-500 italic text-left leading-tight">
                    Respeitamos sua privacidade e estamos comprometidos em proteger seus dados pessoais.
                </p>
            </div>
        </motion.div>
    );
};

export const SalesStep = ({ step }) => {
    const handleBuy = () => {
        // Redirect to checkout or payment page
        window.open('https://pay.hotmart.com/F103782328T?off=tu28utsc', '_blank');
    };

    return (
        <motion.div 
            variants={variants} 
            initial="hidden" 
            animate="visible" 
            style={{ 
                width: '100%', 
                maxWidth: '600px', 
                margin: '0 auto',
                padding: '0 16px'
            }}
        >
            {/* 1. HEADLINE */}
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '40px',
                padding: '20px'
            }}>
                <h1 style={{ 
                    fontSize: '28px', 
                    fontWeight: 800, 
                    color: '#1e293b',
                    lineHeight: '1.3',
                    marginBottom: '16px'
                }}>
                    O seu <span style={{ color: '#f97316' }}>protocolo de emergência emocional</span> está pronto!
                </h1>
                <p style={{ 
                    fontSize: '16px', 
                    color: '#64748b',
                    lineHeight: '1.6'
                }}>
                    Resgate sua criança interior, saia da crise e retome o comando da sua vida adulta com segurança e gentileza.
                </p>
            </div>

            {/* 2. COMPARISON SECTION */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px',
                marginBottom: '40px'
            }}>
                {/* SEM O SOS */}
                <div style={{ 
                    backgroundColor: '#fef2f2', 
                    borderRadius: '16px', 
                    padding: '20px',
                    border: '2px solid #fecaca'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        marginBottom: '16px'
                    }}>
                        <span style={{ fontSize: '24px' }}>🔴</span>
                        <span style={{ fontWeight: 700, color: '#dc2626', fontSize: '14px' }}>SEM O SOS</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            'Explosões emocionais desproporcionais',
                            'Medo constante de abandono',
                            'Autossabotagem e procrastinação',
                            'Criança ferida trava sua vida'
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                <span style={{ color: '#dc2626' }}>✗</span>
                                <span style={{ fontSize: '12px', color: '#7f1d1d', lineHeight: '1.4' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COM O SOS */}
                <div style={{ 
                    backgroundColor: '#f0fdf4', 
                    borderRadius: '16px', 
                    padding: '20px',
                    border: '2px solid #bbf7d0'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        marginBottom: '16px'
                    }}>
                        <span style={{ fontSize: '24px' }}>🟢</span>
                        <span style={{ fontWeight: 700, color: '#16a34a', fontSize: '14px' }}>COM O SOS</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            'Regula emoções em minutos',
                            'Adulta Saudável no comando',
                            'Acessa a Criança Dourada',
                            'Segurança para impor limites'
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                <span style={{ color: '#16a34a' }}>✓</span>
                                <span style={{ fontSize: '12px', color: '#14532d', lineHeight: '1.4' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. PRODUCT PRESENTATION */}
            <div style={{ 
                backgroundColor: '#1e3a8a', 
                borderRadius: '20px', 
                padding: '24px',
                marginBottom: '40px',
                textAlign: 'center'
            }}>
                <h2 style={{ 
                    fontSize: '18px', 
                    fontWeight: 700, 
                    color: '#ffffff',
                    marginBottom: '16px'
                }}>
                    O QUE VOCÊ VAI RECEBER NO<br/>
                    <span style={{ color: '#fbbf24', fontSize: '22px' }}>SOS CRIANÇA INTERIOR</span>
                </h2>
                <p style={{ 
                    fontSize: '14px', 
                    color: '#bfdbfe',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                }}>
                    Um passo a passo seguro, guiado pela Dra. Neusa Tamaio, para acolher suas feridas sem se perder na dor.
                </p>
                
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px',
                    textAlign: 'left'
                }}>
                    {[
                        '✅ Acesso Imediato às 9 Aulas em Áudio/Vídeo',
                        '✅ Material de Apoio em PDF',
                        '✅ Protocolos de Segurança Emocional'
                    ].map((item, i) => (
                        <div key={i} style={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)', 
                            padding: '12px 16px', 
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '14px',
                            fontWeight: 600
                        }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. PRICING */}
            <div style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '20px', 
                padding: '32px 24px',
                marginBottom: '40px',
                textAlign: 'center',
                border: '3px solid #f97316',
                boxShadow: '0 10px 40px rgba(249, 115, 22, 0.2)'
            }}>
                <div style={{ 
                    backgroundColor: '#fef3c7', 
                    color: '#92400e', 
                    padding: '8px 16px', 
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'inline-block',
                    marginBottom: '16px'
                }}>
                    🔥 OFERTA ESPECIAL POR TEMPO LIMITADO
                </div>
                
                <p style={{ 
                    color: '#94a3b8', 
                    fontSize: '16px',
                    textDecoration: 'line-through',
                    marginBottom: '8px'
                }}>
                    De R$ 197,00
                </p>
                
                <p style={{ marginBottom: '4px', color: '#64748b', fontSize: '14px' }}>Por apenas</p>
                
                <p style={{ 
                    fontSize: '48px', 
                    fontWeight: 800, 
                    color: '#16a34a',
                    marginBottom: '24px'
                }}>
                    R$ 99<span style={{ fontSize: '24px' }}>,00</span>
                </p>
                
                <button
                    onClick={handleBuy}
                    style={{
                        width: '100%',
                        backgroundColor: '#f97316',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '16px',
                        padding: '20px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 0 #c2410c',
                        marginBottom: '12px'
                    }}
                >
                    QUERO RESGATAR MINHA CRIANÇA AGORA
                </button>
                
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Acesso imediato e vitalício
                </p>
            </div>

            {/* 6. WHO IS IT FOR */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 700, 
                    color: '#1e293b',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    Para Quem é Este Protocolo?
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                        'Para você que sente que sua reação é "infantil" diante de problemas sérios.',
                        'Para você que trava na hora de trabalhar ou ganhar dinheiro porque se sente insegura.',
                        'Para você que quer cuidar de si mesma, mas não sabe por onde começar sem reviver traumas dolorosos.'
                    ].map((item, i) => (
                        <div key={i} style={{ 
                            backgroundColor: '#ffffff', 
                            padding: '16px', 
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px'
                        }}>
                            <span style={{ fontSize: '20px' }}>🙋‍♀️</span>
                            <span style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 7. HOW IT WORKS */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 700, 
                    color: '#1e293b',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    Como Funciona?
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        { num: '1', title: 'Assista à Aula do Kit Emocional', desc: 'Se estabilize e sinta a segurança voltar ao corpo.' },
                        { num: '2', title: 'Faça as Práticas Guiadas', desc: 'Apenas ouça a voz da Dra. Neusa e deixe ela conduzir sua criança ao parquinho.' },
                        { num: '3', title: 'Aplique a Atualização', desc: 'Gaste apenas 10 minutos por dia cuidando da criança para ter 23h50 de vida adulta funcional.' }
                    ].map((step, i) => (
                        <div key={i} style={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: '16px',
                            backgroundColor: '#f8fafc',
                            padding: '16px',
                            borderRadius: '12px'
                        }}>
                            <div style={{ 
                                width: '40px', 
                                height: '40px', 
                                backgroundColor: '#3b82f6',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                fontWeight: 700,
                                flexShrink: 0
                            }}>
                                {step.num}
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{step.title}</p>
                                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 8. BONUS */}
            <div style={{ 
                backgroundColor: '#fef3c7', 
                borderRadius: '16px', 
                padding: '24px',
                marginBottom: '40px',
                border: '2px dashed #f59e0b'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '32px' }}>🎁</span>
                    <span style={{ fontWeight: 700, color: '#92400e', fontSize: '18px' }}>BÔNUS EXCLUSIVO</span>
                </div>
                <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                    O KIT DE EMERGÊNCIA (AULA 2)
                </h4>
                <p style={{ fontSize: '14px', color: '#78350f', lineHeight: '1.5' }}>
                    Você terá em mãos um protocolo validado para usar sempre que sentir angústia, tontura ou gatilhos fortes. É o seu "botão de pânico" para voltar à paz.
                </p>
            </div>

            {/* 9. SOCIAL PROOF + GUARANTEE */}
            <div style={{ marginBottom: '40px' }}>
                {/* Testimonial */}
                <div style={{ 
                    backgroundColor: '#ffffff', 
                    padding: '20px', 
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '20px'
                }}>
                    <div style={{ color: '#f97316', marginBottom: '8px' }}>⭐⭐⭐⭐⭐</div>
                    <p style={{ fontSize: '14px', color: '#475569', fontStyle: 'italic', marginBottom: '8px', lineHeight: '1.5' }}>
                        "A técnica do parquinho mudou meu dia. Senti que finalmente minha criança não estava mais sozinha."
                    </p>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>– Aluna SOS</p>
                </div>

                {/* Guarantee */}
                <div style={{ 
                    backgroundColor: '#f0fdf4', 
                    padding: '20px', 
                    borderRadius: '16px',
                    border: '2px solid #86efac',
                    textAlign: 'center'
                }}>
                    <span style={{ fontSize: '40px' }}>🛡️</span>
                    <h4 style={{ fontWeight: 700, color: '#166534', marginBottom: '8px' }}>GARANTIA DE 7 DIAS</h4>
                    <p style={{ fontSize: '13px', color: '#15803d', lineHeight: '1.5' }}>
                        Entre, assista às aulas, faça o exercício do Parquinho. Se você não sentir a diferença na sua segurança emocional, devolvemos 100% do seu dinheiro. Sem perguntas.
                    </p>
                </div>
            </div>

            {/* 10. FINAL CTA */}
            <div style={{ 
                backgroundColor: '#1e293b', 
                borderRadius: '20px', 
                padding: '32px 24px',
                textAlign: 'center'
            }}>
                <p style={{ 
                    fontSize: '16px', 
                    color: '#fbbf24',
                    fontWeight: 600,
                    marginBottom: '16px',
                    lineHeight: '1.5'
                }}>
                    ⚠️ Você não precisa carregar essa dor sozinha.
                </p>
                <p style={{ 
                    fontSize: '14px', 
                    color: '#cbd5e1',
                    marginBottom: '24px',
                    lineHeight: '1.5'
                }}>
                    Sua criança interior está esperando um adulto saudável para dar a mão a ela. Esse adulto é você.
                </p>
                
                <button
                    onClick={handleBuy}
                    style={{
                        width: '100%',
                        backgroundColor: '#22c55e',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '16px',
                        padding: '20px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 0 #15803d',
                        marginBottom: '12px'
                    }}
                >
                    QUERO COMEÇAR AGORA
                </button>
                
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Acesso imediato e vitalício.
                </p>
            </div>
        </motion.div>
    );
};
export const CarouselStep = ({ step, onNext }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            icon: CloudRain,
            color: "text-blue-500",
            title: "Vulnerabilidade Emocional",
            items: [
                "Baixa autoestima e amor-próprio",
                "Cicatrizes de relacionamentos passados",
                "Incapacidade de acolher os próprios sentimentos"
            ]
        },
        {
            icon: Sprout,
            color: "text-green-600",
            title: "Sensação de Vida Estagnada",
            items: [
                "Indecisão sobre o caminho profissional a seguir",
                "Sentimento de estar preso em uma rotina que não traz realização",
                "Medo de arriscar e sair da zona de conforto"
            ]
        },
        {
            icon: Brain,
            color: "text-pink-500",
            title: "Exaustão Mental",
            items: [
                "Estresse excessivo causado pelo trabalho e vida pessoal",
                "Pensamentos acelerados que causam ansiedade",
                "Dificuldade em lidar com emoções negativas"
            ]
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            variants={variants} initial="hidden" animate="visible" exit="exit"
            className="flex flex-col items-center w-full max-w-md mx-auto pt-2"
        >
            {/* Top Progress Bar */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-orange-500 rounded-full w-2/3" />
            </div>

            {/* Header */}
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
                Estamos na <span className="text-blue-600">reta final...</span>
            </h2>

            {/* Main Illustration */}
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 shadow-md bg-black">
                <img 
                    src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop" 
                    alt="Jornada Interior" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                />
            </div>

            {/* Sub-header */}
            <p className="text-center text-slate-900 font-bold mb-5 text-[15px] leading-tight px-4">
                O seu <span className="text-orange-500">protocolo vai ajudar você</span> com:
            </p>

            {/* Carousel Card */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm relative overflow-hidden min-h-[220px] flex flex-col justify-center">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                >
                    {/* Card Title */}
                    <div className="flex items-center gap-3 mb-1">
                        {React.createElement(slides[currentSlide].icon, { 
                            size: 28,
                            className: `${slides[currentSlide].color}` 
                        })}
                        <h3 className={`font-bold text-lg leading-tight ${slides[currentSlide].color}`}>
                            {slides[currentSlide].title}
                        </h3>
                    </div>

                    {/* Check List */}
                    <ul className="flex flex-col gap-3">
                        {slides[currentSlide].items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm font-medium leading-snug">
                                <div className="mt-0.5 flex-shrink-0">
                                    <div className="w-5 h-5 bg-green-400 rounded flex items-center justify-center shadow-sm shadow-green-200">
                                        <Check size={14} className="text-white" strokeWidth={3} />
                                    </div>
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 mb-8">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`transition-all duration-300 rounded-full ${
                            currentSlide === idx 
                                ? 'w-2.5 h-2.5 bg-orange-500' 
                                : 'w-1.5 h-1.5 bg-orange-200 hover:bg-orange-300'
                        }`}
                    />
                ))}
            </div>

            {/* Continue Button */}
            <button
                onClick={() => onNext({})}
                className="btn-orange w-full shadow-lg shadow-orange-500/20 py-4 text-lg"
            >
                CONTINUAR
            </button>
        </motion.div>
    );
};
