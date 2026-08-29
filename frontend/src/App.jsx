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
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-between">
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
      <footer className="glass-panel border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-white">Placement<span className="text-gradient">Mentor</span> AI</span>
            <span>– Powered by Random Forest & YOLO26-Pose</span>
          </div>
          <div>© {new Date().getFullYear()} PlacementMentorAI. All rights reserved.</div>
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
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-[2px] shadow-2xl shadow-indigo-500/40">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <BrainCircuit className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Initializing PlacementMentorAI...</span>
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
