import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AppLayout from './components/ui/AppLayout';
import OverviewDashboard from './components/OverviewDashboard';
import PlacementPredictor from './components/PlacementPredictor';
import InterviewStudio from './components/InterviewStudio';
import FinalReadinessDashboard from './components/FinalReadinessDashboard';
import { Loader2, BrainCircuit } from 'lucide-react';

function AuthenticatedApp() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'placement' | 'interview' | 'final'
  const [placementScore, setPlacementScore] = useState(null);
  const [behaviourScore, setBehaviourScore] = useState(null);

  const finalScore = placementScore !== null && behaviourScore !== null
    ? Math.round(((placementScore * 0.7) + (behaviourScore * 0.3)) * 10) / 10
    : placementScore !== null
    ? Math.round(placementScore * 0.7 * 10) / 10
    : null;

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview' && (
        <OverviewDashboard
          setActiveTab={setActiveTab}
          placementScore={placementScore}
          behaviourScore={behaviourScore}
          finalScore={finalScore}
        />
      )}

      {activeTab === 'placement' && (
        <PlacementPredictor
          onScoreCalculated={(score) => {
            setPlacementScore(score);
          }}
        />
      )}

      {activeTab === 'interview' && (
        <InterviewStudio
          onScoreCalculated={(score) => {
            setBehaviourScore(score);
          }}
        />
      )}

      {activeTab === 'final' && (
        <FinalReadinessDashboard
          placementScore={placementScore}
          behaviourScore={behaviourScore}
        />
      )}
    </AppLayout>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const [publicView, setPublicView] = useState('landing'); // 'landing' | 'login' | 'register'

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center space-y-4 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#635BFF] shadow-sm">
            <BrainCircuit className="w-7 h-7 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-base">PlacementMentor AI</h3>
            <div className="flex items-center justify-center space-x-2 text-[#635BFF] text-xs font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Initializing secure session...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unauthenticated — show landing, login, or register
  if (!user) {
    if (publicView === 'login') {
      return (
        <LoginPage
          onSwitchToRegister={() => setPublicView('register')}
          onBackToLanding={() => setPublicView('landing')}
        />
      );
    }
    if (publicView === 'register') {
      return (
        <RegisterPage
          onSwitchToLogin={() => setPublicView('login')}
          onBackToLanding={() => setPublicView('landing')}
        />
      );
    }
    return (
      <LandingPage
        onLoginClick={() => setPublicView('login')}
        onGetStartedClick={() => setPublicView('register')}
      />
    );
  }

  // Authenticated — show main application starting on Overview
  return <AuthenticatedApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
