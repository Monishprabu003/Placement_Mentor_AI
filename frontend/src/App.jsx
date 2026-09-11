import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PlacementPredictor from './components/PlacementPredictor';
import InterviewStudio from './components/InterviewStudio';
import FinalReadinessDashboard from './components/FinalReadinessDashboard';
import { Loader2, BrainCircuit } from 'lucide-react';

function AuthenticatedApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [placementScore, setPlacementScore] = useState(null);
  const [behaviourScore, setBehaviourScore] = useState(null);

  const finalScore = placementScore && behaviourScore
    ? Math.round(((placementScore * 0.7) + (behaviourScore * 0.3)) * 10) / 10
    : placementScore
    ? Math.round(placementScore * 0.7 * 10) / 10
    : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="pb-16">
          {activeTab === 'dashboard' && (
            <HeroSection
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
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-900">
              Placement<span className="text-[#635BFF]">Mentor</span> AI
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">Dual-Engine ML (Random Forest + YOLO26-Pose)</span>
          </div>
          <div className="text-slate-400">
            © {new Date().getFullYear()} PlacementMentor AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Show loading spinner while checking token on mount
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center space-y-4 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#635BFF] shadow-sm">
            <BrainCircuit className="w-7 h-7 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-base">PlacementMentor AI</h3>
            <div className="flex items-center justify-center space-x-2 text-slate-500 text-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#635BFF]" />
              <span>Initializing secure session...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated — show login or register
  if (!user) {
    if (authMode === 'register') {
      return <RegisterPage onSwitchToLogin={() => setAuthMode('login')} />;
    }
    return <LoginPage onSwitchToRegister={() => setAuthMode('register')} />;
  }

  // Authenticated — show main app
  return <AuthenticatedApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
