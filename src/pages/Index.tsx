import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadPanel from '../components/UploadPanel';
import StepIndicator from '../components/StepIndicator';
import ResultsSummary from '../components/ResultsSummary';
import TestCard from '../components/TestCard';
import SpecialistSection from '../components/SpecialistSection';
import ActionsBar from '../components/ActionsBar';
import ManualEntryForm from '../components/ManualEntryForm';
import { demoResults, getRecommendedSpecialties } from '../data/demoResults';
import { Heart, Shield, Clock } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState('upload'); // 'upload', 'manual', 'results'
  const [results, setResults] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleDemoClick = () => {
    setResults(demoResults);
    setCurrentView('results');
    setCurrentStep(2);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleManualEntry = () => {
    setCurrentView('manual');
  };

  const handleManualSubmit = (entries) => {
    // For demo purposes, process manual entries and show demo results
    // In real app, this would process the manual entries
    setResults(demoResults);
    setCurrentView('results');
    setCurrentStep(2);
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleStartOver = () => {
    setResults([]);
    setCurrentView('upload');
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update step to 3 when results are shown
  useEffect(() => {
    if (currentView === 'results' && results.length > 0) {
      setCurrentStep(3);
    }
  }, [currentView, results.length]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step Indicator */}
        <div className="mb-12">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Upload/Home View */}
        {currentView === 'upload' && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-6">
                Understand your lab results{' '}
                <span className="text-primary">in plain English</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                See what your numbers mean and who to talk to next — in minutes, not hours of research.
              </p>
              
              {/* Trust Strip */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
                <div className="trust-badge">
                  <Shield className="w-4 h-4" />
                  Private by default
                </div>
                <div className="trust-badge">
                  <Heart className="w-4 h-4" />
                  Clear explanations
                </div>
                <div className="trust-badge">
                  <Clock className="w-4 h-4" />
                  No sign-up required
                </div>
              </div>
            </div>

            {/* Upload Panel */}
            <div className="mb-16">
              <UploadPanel 
                onDemoClick={handleDemoClick}
                onManualEntry={handleManualEntry}
              />
            </div>
          </>
        )}

        {/* Manual Entry Modal */}
        {currentView === 'manual' && (
          <ManualEntryForm
            onSubmit={handleManualSubmit}
            onCancel={() => setCurrentView('upload')}
          />
        )}

        {/* Results View */}
        {currentView === 'results' && results.length > 0 && (
          <div id="results-section" className="space-y-8 animate-fade-in">
            {/* Results Summary */}
            <ResultsSummary 
              results={results}
              timestamp={new Date().toLocaleString()}
            />

            {/* Test Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-poppins font-bold text-foreground text-center">
                Your Results Explained
              </h2>
              <div className="grid gap-6">
                {results.map((result) => (
                  <TestCard key={result.testId} {...result} />
                ))}
              </div>
            </div>

            {/* Specialist Section */}
            <div id="specialist-section">
              <SpecialistSection 
                recommendedSpecialties={getRecommendedSpecialties(results)}
              />
            </div>

            {/* Actions Bar */}
            <ActionsBar 
              results={results}
              onStartOver={handleStartOver}
            />
          </div>
        )}

        {/* Privacy Section (if no results) */}
        {currentView === 'upload' && (
          <div id="privacy" className="mt-24 text-center">
            <div className="bg-card border border-border rounded-radius-lg p-8 shadow-card max-w-2xl mx-auto">
              <h2 className="text-2xl font-poppins font-bold text-foreground mb-4">
                Your Privacy Matters
              </h2>
              <div className="text-left space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Demo Mode:</strong> All processing happens locally in your browser. 
                  No data is sent to our servers during demo mode.
                </p>
                <p>
                  <strong className="text-foreground">File Upload:</strong> Files are processed temporarily and deleted immediately. 
                  We never store your health information.
                </p>
                <p>
                  <strong className="text-foreground">No Account Required:</strong> Use LabLens without creating an account 
                  or providing personal information.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border text-sm text-muted-foreground">
                Questions? Contact us at{' '}
                <a href="mailto:privacy@lablens.demo" className="text-primary hover:text-primary-hover">
                  privacy@lablens.demo
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
