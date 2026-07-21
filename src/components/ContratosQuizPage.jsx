import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Compass,
  Eye,
  Feather,
  HeartHandshake,
  Lock,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Users
} from 'lucide-react';
import { CONTRATOS_QUIZ_DATA, calculateContratosResult } from '../data/contratosQuizData';
import { AnalyticsService } from '../services/analytics';
import './ContratosQuizPage.css';

const ICON_MAP = {
  HeartHandshake,
  Compass,
  ShieldAlert,
  Users,
  Sparkles
};

const CONTRACT_META = {
  aprovacao: { shortName: 'Aprovação', icon: HeartHandshake },
  autoridade_externa: { shortName: 'Autoridade', icon: Compass },
  sacrificio: { shortName: 'Sacrifício', icon: ShieldAlert },
  lealdade_familiar: { shortName: 'Lealdade', icon: Users },
  merecimento: { shortName: 'Merecimento', icon: Sparkles }
};

const ANALYSIS_STEPS = [
  'Mapeando seus padrões de resposta',
  'Cruzando limites, aprovação e sacrifício',
  'Lendo lealdade familiar e merecimento',
  'Preparando seu diagnóstico personalizado'
];

const MotionSection = motion.section;
const MotionButton = motion.button;
const MotionSpan = motion.span;

const screenVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

const optionVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + index * 0.055, duration: 0.3 }
  })
};

export default function ContratosQuizPage() {
  const [stage, setStage] = useState('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [analyzingStep, setAnalyzingStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const advanceTimerRef = useRef(null);

  const questions = CONTRATOS_QUIZ_DATA.questions;
  const introCopy = CONTRATOS_QUIZ_DATA.intro;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const results = calculateContratosResult(answers);

  useEffect(() => {
    const previousTitle = document.title;
    document.body.classList.add('contratos-page');
    document.title = 'Contratos Invisíveis | Diagnóstico Emocional';
    try {
      AnalyticsService.trackStep('contratos_intro');
    } catch (error) {
      console.error(error);
    }

    return () => {
      document.body.classList.remove('contratos-page');
      document.title = previousTitle;
      if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (stage !== 'analyzing') return undefined;

    const timers = [
      window.setTimeout(() => setAnalyzingStep(1), 1400),
      window.setTimeout(() => setAnalyzingStep(2), 2800),
      window.setTimeout(() => setAnalyzingStep(3), 4200),
      window.setTimeout(() => {
        setStage('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 5800)
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [stage]);

  const startQuiz = () => {
    setStage('question');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId, points) => {
    if (isTransitioning) return;

    setAnswers((previous) => ({ ...previous, [questionId]: points }));
    setIsTransitioning(true);

    advanceTimerRef.current = window.setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((previous) => previous + 1);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setAnalyzingStep(0);
        setStage('analyzing');
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 420);
  };

  const handleBack = () => {
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    setIsTransitioning(false);

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((previous) => previous - 1);
    } else {
      setStage('intro');
    }
  };

  const handleCTAClick = () => {
    try {
      const utmParams = AnalyticsService.getUTMParams() || {};
      const checkoutUrl = new URL(CONTRATOS_QUIZ_DATA.cta.redirectUrl);
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value) checkoutUrl.searchParams.append(key, value);
      });
      window.location.href = checkoutUrl.toString();
    } catch {
      window.location.href = CONTRATOS_QUIZ_DATA.cta.redirectUrl;
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setAnalyzingStep(0);
    setStage('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`contratos-app contratos-stage-${stage}`}>
      <div className="contratos-ambient" aria-hidden="true">
        <span className="ambient-orb ambient-orb-one" />
        <span className="ambient-orb ambient-orb-two" />
        <span className="ambient-grid" />
      </div>

      <header className="contratos-topbar">
        <button
          type="button"
          className="contratos-brand"
          onClick={stage === 'intro' ? undefined : handleRestart}
          aria-label={stage === 'intro' ? 'Contratos Invisíveis' : 'Voltar ao início'}
          disabled={stage === 'intro'}
        >
          <span className="brand-mark"><Feather size={18} /></span>
          <span className="brand-copy">
            <strong>Contratos Invisíveis</strong>
            <small>Diagnóstico emocional</small>
          </span>
        </button>

        {stage === 'question' && (
          <button type="button" className="contratos-back-button" onClick={handleBack}>
            <ChevronLeft size={17} />
            <span>Voltar</span>
          </button>
        )}

        {stage === 'result' && (
          <span className="result-ready-badge"><CheckCircle2 size={15} /> Diagnóstico pronto</span>
        )}
      </header>

      <main className="contratos-main">
        <AnimatePresence mode="wait">
          {stage === 'intro' && (
            <MotionSection
              key="intro"
              className="contratos-intro"
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="contratos-hero">
                <div className="hero-content">
                  <span className="contratos-eyebrow"><Eye size={15} /> Avaliação de padrões inconscientes</span>
                  <h1>
                    Descubra qual <em>contrato invisível</em> governa a sua vida
                  </h1>
                  <div className="hero-intro-copy">
                    <p>{introCopy[0]}</p>
                    <p>{introCopy[1]}</p>
                  </div>

                  <button type="button" className="contratos-primary-button" onClick={startQuiz}>
                    <span>Descobrir meu contrato</span>
                    <span className="button-icon"><ArrowRight size={20} /></span>
                  </button>

                  <div className="hero-trust-row" aria-label="Informações sobre o diagnóstico">
                    <span><Clock3 size={15} /> Leva 2 minutos</span>
                    <span><Lock size={14} /> Respostas privadas</span>
                  </div>
                </div>

                <div className="hero-visual" aria-hidden="true">
                  <div className="visual-halo halo-one" />
                  <div className="visual-halo halo-two" />
                  <div className="visual-center">
                    <span className="visual-spark"><Sparkles size={22} /></span>
                    <strong>O que guia<br />suas escolhas?</strong>
                  </div>
                  {Object.entries(CONTRACT_META).map(([id, item], index) => {
                    const Icon = item.icon;
                    return (
                      <div key={id} className={`orbit-card orbit-card-${index + 1}`}>
                        <Icon size={16} />
                        <span>{item.shortName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="contratos-context-card">
                <div className="context-main-copy">
                  <span className="context-icon"><HeartHandshake size={21} /></span>
                  <div>
                    <strong>Como esses acordos agem</strong>
                    <p>{introCopy[2]}</p>
                  </div>
                </div>
                <div className="context-outcome">
                  <Sparkles size={20} />
                  <div>
                    <strong>O que você vai descobrir</strong>
                    <p>{introCopy[4]}</p>
                  </div>
                </div>
              </div>

              <div className="contratos-discovery-strip">
                <span className="strip-label">Ao final, você vai enxergar</span>
                <div className="discovery-grid">
                  <article>
                    <span className="discovery-number">01</span>
                    <div>
                      <h2>A origem</h2>
                      <p>Onde esse acordo emocional pode ter começado.</p>
                    </div>
                  </article>
                  <article>
                    <span className="discovery-number">02</span>
                    <div>
                      <h2>O impacto</h2>
                      <p>Como ele aparece silenciosamente no seu dia a dia.</p>
                    </div>
                  </article>
                  <article>
                    <span className="discovery-number">03</span>
                    <div>
                      <h2>O próximo passo</h2>
                      <p>Por onde começar a construir escolhas mais livres.</p>
                    </div>
                  </article>
                </div>
              </div>

              <div className="contratos-answer-note">
                <span className="note-icon"><Brain size={20} /></span>
                <div>
                  <strong>Como responder</strong>
                  <p>{introCopy[3]}</p>
                </div>
                <Check size={18} className="note-check" />
              </div>

              <div className="contratos-mobile-cta">
                <button type="button" className="contratos-primary-button" onClick={startQuiz}>
                  <span>Começar diagnóstico gratuito</span>
                  <span className="button-icon"><ArrowRight size={20} /></span>
                </button>
              </div>
            </MotionSection>
          )}

          {stage === 'question' && (
            <MotionSection
              key={`question-${currentQuestionIndex}`}
              className="contratos-question-screen"
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="question-progress-block">
                <div className="progress-copy">
                  <span>Seu mapa emocional</span>
                  <strong>{progress}% concluído</strong>
                </div>
                <div
                  className="question-progress-track"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <MotionSpan
                    initial={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                </div>
                <div className="progress-dots" aria-hidden="true">
                  {questions.map((question, index) => (
                    <span
                      key={question.id}
                      className={index < currentQuestionIndex ? 'done' : index === currentQuestionIndex ? 'current' : ''}
                    />
                  ))}
                </div>
              </div>

              <div className="question-shell">
                <aside className="question-index-card" aria-hidden="true">
                  <span>pergunta</span>
                  <strong>{String(currentQuestionIndex + 1).padStart(2, '0')}</strong>
                  <small>de {String(questions.length).padStart(2, '0')}</small>
                </aside>

                <div className="question-content">
                  <span className="question-topic">
                    {CONTRACT_META[currentQuestion.contractId].shortName}
                  </span>
                  <h1>{currentQuestion.question}</h1>
                  <p className="question-instruction">Escolha a alternativa que mais se aproxima da sua realidade:</p>

                  <div className="contratos-options">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = answers[currentQuestion.id] === option.points;
                      return (
                        <MotionButton
                          type="button"
                          key={option.letter}
                          custom={index}
                          variants={optionVariants}
                          initial="hidden"
                          animate="visible"
                          className={`contratos-option ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => handleSelectOption(currentQuestion.id, option.points)}
                          aria-pressed={isSelected}
                          disabled={isTransitioning}
                        >
                          <span className="option-letter">{isSelected ? <Check size={18} /> : option.letter}</span>
                          <span className="option-label">{option.label}</span>
                          <ArrowRight size={18} className="option-arrow" />
                        </MotionButton>
                      );
                    })}
                  </div>

                  <div className="question-footer-note">
                    <ShieldCheck size={15} />
                    <span>Sua resposta é confidencial e avança automaticamente.</span>
                  </div>
                </div>
              </div>
            </MotionSection>
          )}

          {stage === 'analyzing' && (
            <MotionSection
              key="analyzing"
              className="contratos-analyzing"
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-live="polite"
            >
              <div className="analysis-orb">
                <span className="analysis-ring ring-one" />
                <span className="analysis-ring ring-two" />
                <span className="analysis-core"><Brain size={34} /></span>
              </div>

              <span className="contratos-eyebrow"><Sparkles size={15} /> Leitura em andamento</span>
              <h1>Conectando os pontos da sua história</h1>
              <p className="analysis-current">{ANALYSIS_STEPS[analyzingStep]}...</p>

              <div className="analysis-list">
                {ANALYSIS_STEPS.map((step, index) => (
                  <div key={step} className={index <= analyzingStep ? 'is-complete' : ''}>
                    <span>{index < analyzingStep ? <Check size={15} /> : index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <p className="analysis-safe"><Lock size={13} /> Seus dados não ficam armazenados.</p>
            </MotionSection>
          )}

          {stage === 'result' && (
            <MotionSection
              key="result"
              className="contratos-result"
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="result-hero">
                <div className="result-hero-copy">
                  <span className="contratos-eyebrow light"><Sparkles size={15} /> Seu mapa foi revelado</span>
                  <h1>Agora você consegue dar nome ao que antes parecia invisível.</h1>
                  <p>{results.generalTitle}</p>
                </div>

                <div
                  className="score-ring"
                  style={{ '--score-angle': `${Math.round((results.totalScore / 20) * 360)}deg` }}
                  aria-label={`Pontuação geral: ${results.totalScore} de 20`}
                >
                  <div>
                    <strong>{results.totalScore}</strong>
                    <span>de 20</span>
                  </div>
                </div>
              </div>

              <div className="result-section-heading">
                <div>
                  <span>Seu resultado principal</span>
                  <h2>{results.dominantContracts.length > 1 ? 'Contratos mais ativos' : 'Contrato mais ativo'}</h2>
                </div>
                <span className="result-count"><Star size={15} /> {results.dominantContracts.length} destaque{results.dominantContracts.length > 1 ? 's' : ''}</span>
              </div>

              <div className="dominant-contracts">
                {results.dominantContracts.map((contract, index) => {
                  const ContractIcon = ICON_MAP[contract.icon] || Sparkles;
                  return (
                    <article
                      key={contract.id}
                      className="dominant-contract-card"
                      style={{ '--contract-color': contract.color }}
                    >
                      <div className="contract-card-topline" />
                      <div className="contract-card-header">
                        <span className="contract-icon"><ContractIcon size={25} /></span>
                        <div>
                          <small>{results.dominantContracts.length > 1 ? `Destaque ${index + 1}` : 'Padrão predominante'}</small>
                          <h3>{contract.name}</h3>
                        </div>
                      </div>

                      <blockquote>{contract.quote}</blockquote>

                      <div className="contract-paragraphs">
                        {contract.paragraphs.map((paragraph, paragraphIndex) => (
                          <p
                            key={paragraph}
                            className={paragraphIndex === contract.paragraphs.length - 1 ? 'contract-next-step' : ''}
                          >
                            {paragraphIndex === contract.paragraphs.length - 1 && <Sparkles size={16} />}
                            <span>{paragraph}</span>
                          </p>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="breakdown-card">
                <div className="breakdown-header">
                  <div>
                    <span><BarChart3 size={16} /> Visão completa</span>
                    <h2>Intensidade dos 5 contratos</h2>
                  </div>
                  <small>Escala de 0 a 4</small>
                </div>

                <div className="breakdown-list">
                  {Object.entries(CONTRATOS_QUIZ_DATA.contracts).map(([contractId, contract]) => {
                    const score = results.contractScores[contractId] || 0;
                    const percentage = Math.round((score / 4) * 100);
                    const isDominant = results.dominantContracts.some((item) => item.id === contractId);
                    const ContractIcon = ICON_MAP[contract.icon] || Sparkles;

                    return (
                      <div
                        key={contractId}
                        className={`breakdown-item ${isDominant ? 'is-dominant' : ''}`}
                        style={{ '--contract-color': contract.color }}
                      >
                        <span className="breakdown-icon"><ContractIcon size={17} /></span>
                        <div className="breakdown-content">
                          <div className="breakdown-label">
                            <strong>{CONTRACT_META[contractId].shortName}</strong>
                            <span>{score}/4</span>
                          </div>
                          <div className="breakdown-track">
                            <MotionSpan
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.75, delay: 0.12 }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="contratos-cta-card">
                <div className="cta-decoration" aria-hidden="true"><Sparkles size={120} /></div>
                <span className="cta-kicker"><ShieldCheck size={15} /> Seu próximo passo</span>
                <h2>Você não precisa continuar obedecendo a acordos que nunca escolheu.</h2>
                <p>
                  No <strong>Descongelar</strong>, você aprende a reconhecer esses padrões e a construir
                  escolhas com mais segurança, autonomia e leveza.
                </p>
                <button type="button" className="contratos-cta-button" onClick={handleCTAClick}>
                  <span>Quero conhecer o Descongelar</span>
                  <ArrowRight size={20} />
                </button>
                <span className="cta-safe"><Lock size={13} /> Inscrição segura • acesso imediato</span>
              </div>

              <p className="result-disclaimer">
                Este resultado é uma ferramenta de autoconhecimento e não substitui acompanhamento profissional.
              </p>

              <button type="button" className="contratos-restart" onClick={handleRestart}>
                <RotateCcw size={15} /> Refazer o diagnóstico
              </button>
            </MotionSection>
          )}
        </AnimatePresence>
      </main>

      {stage !== 'result' && (
        <footer className="contratos-footer">
          <span>10 perguntas</span>
          <i />
          <span>resultado imediato</span>
          <i />
          <span>100% confidencial</span>
        </footer>
      )}
    </div>
  );
}
