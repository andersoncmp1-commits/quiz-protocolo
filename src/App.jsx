import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { steps } from './data/quiz';
import { AnalyticsService } from './services/analytics';
import {
  LandingStep,
  TransitionStep,
  InfoStep,
  QuestionStep,
  AnalysisStep,
  LeadCaptureStep,
  SalesStep,
  CarouselStep
} from './components/FunnelSteps';
// Lazy load Dashboard since it's an admin-only feature
const Dashboard = React.lazy(() => import('./components/Dashboard'));

import { ChevronLeft } from 'lucide-react'; // Add import

function QuizFlow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]); // Track history for back navigation
  const [quizSteps, setQuizSteps] = useState(steps); // State for ordered steps

  // Load custom order from localStorage
  useEffect(() => {
    // Sync state with imported steps on mount/update (Critical for HMR and development)
    const saved = localStorage.getItem('quiz_order');
    if (saved) {
      try {
        const savedIds = JSON.parse(saved);
        const reordered = savedIds.map(id => steps.find(s => s.id === id)).filter(Boolean);
        const others = steps.filter(s => !savedIds.includes(s.id));
        setQuizSteps([...reordered, ...others]);
      } catch (e) {
        console.error(e);
        setQuizSteps(steps); 
      }
    } else {
        setQuizSteps(steps);
    }
  }, [steps]); // Add steps as dependency

  const currentStep = quizSteps[currentIndex] || steps[0];

  // Track initial load of the landing page
  useEffect(() => {
    // Only track if it's the first render of the landing page
    if (currentIndex === 0 && quizSteps.length > 0) {
      AnalyticsService.trackStep(quizSteps[0].id);
    }
  }, [quizSteps]);

  const handleNext = (data) => {
    const newAnswers = { ...answers, ...data };
    setAnswers(newAnswers);

    let nextIndex = currentIndex + 1;

    // Skip logic checks
    while (
      nextIndex < quizSteps.length &&
      quizSteps[nextIndex].condition &&
      !quizSteps[nextIndex].condition(newAnswers)
    ) {
      // Logic to skip steps
      nextIndex++;
    }

    if (nextIndex < quizSteps.length) {
      setHistory([...history, currentIndex]); // Save current step to history
      setCurrentIndex(nextIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Track the new step
      AnalyticsService.trackStep(quizSteps[nextIndex].id);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevIndex = history[history.length - 1];
      setHistory(history.slice(0, -1)); // Remove last step from history
      setCurrentIndex(prevIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate total steps (excluding analysis, lead, sales)
  // We want finding the index of 'analysis' to know where the quiz effectively ends for progress bar purposes
  const quizEndIndex = quizSteps.findIndex(s => s.type === 'analysis');
  const totalQuizSteps = quizEndIndex !== -1 ? quizEndIndex : quizSteps.length;

  // Calculate relative progress based on current index
  // +1 because we want to show some progress even at step 0 (e.g. 1/14) or at least uniform progression
  const progress = Math.min(100, Math.round(((currentIndex + 1) / totalQuizSteps) * 100));

  const renderStep = () => {
    if (!currentStep) return null;

    switch (currentStep.type) {
      case 'landing':
        return <LandingStep key={currentStep.id} step={currentStep} onNext={handleNext} />;
      case 'transition':
        return <TransitionStep key={currentStep.id} step={currentStep} onNext={handleNext} />;
      case 'info':
        return <InfoStep key={currentStep.id} step={currentStep} onNext={handleNext} />;
      case 'question':
        return <QuestionStep key={currentStep.id} step={currentStep} onNext={handleNext} />;
      case 'carousel':
        return <CarouselStep key={currentStep.id} step={currentStep} onNext={handleNext} />;
      case 'analysis':
        return <AnalysisStep key={currentStep.id} step={currentStep} onNext={handleNext} />;
      case 'lead':
        return <LeadCaptureStep key={currentStep.id} step={currentStep} onNext={handleNext} />;
      case 'sales':
        return <SalesStep key={currentStep.id} step={currentStep} />;
      default:
        return <div key="unknown">Unknown step type</div>;
    }
  };

  return (
    <div className="relative w-full min-h-screen pb-32">
      {/* Background Elements */}
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 relative">
        {/* Back Button */}
        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            className="absolute top-6 left-0 p-2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Progress Bar (Always visible during flow until analysis) */}
        {currentStep && ['landing', 'transition', 'info', 'question'].includes(currentStep.type) && (
          <div className="mb-4">
            <div className="progress-container">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            {currentStep.type === 'question' && (() => {
              const questionSteps = quizSteps.filter(s => s.type === 'question');
              const currentQIndex = questionSteps.findIndex(s => s.id === currentStep.id);
              if (currentQIndex !== -1) {
                return (
                  <p className="text-center font-bold text-slate-800 mt-6 mb-2 text-sm tracking-wide">
                    {currentStep.section ? (
                         <span dangerouslySetInnerHTML={{ __html: currentStep.section }} />
                    ) : (
                        <span className="text-orange-500">
                          {currentQIndex + 1} / {questionSteps.length}
                        </span>
                    )}
                  </p>
                );
              }
              return null;
            })()}
          </div>
        )}

        {renderStep()}
      </div>


    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizFlow />} />
        <Route path="/admin" element={
          <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen">Carregando...</div>}>
            <Dashboard />
          </React.Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
