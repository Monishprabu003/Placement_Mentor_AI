import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, LogIn, Mail, Lock, AlertTriangle, Loader2, ArrowRight, UserPlus } from 'lucide-react';

export default function LoginPage({ onSwitchToRegister, onBackToLanding }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Header */}
      <header className="py-6 border-b border-slate-200/80 bg-white">
        <div className="app-container flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={onBackToLanding}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#3B82F6] p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/35 transition-all">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-[#635BFF] group-hover:text-[#4F46E5] transition-colors">
                <BrainCircuit className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  Placement<span className="text-[#635BFF]">Mentor</span>
                </span>
                <span className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md bg-indigo-50 text-[#635BFF] border border-indigo-100/80">
                  AI PLATFORM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Dual-Engine Readiness Evaluator
              </p>
            </div>
          </div>

          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ← Back to Home
            </button>
          )}
        </div>
      </header>

      {/* Main Login Box */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sign In to <span className="text-[#635BFF]">PlacementMentor</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Enter your credentials to access your readiness dashboard
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card space-y-5">

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Please contact support or register a new account."); }} className="text-[11px] font-semibold text-[#635BFF] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center space-x-3 pt-2">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">New to PlacementMentor?</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Register Link */}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="w-full py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-2xs transition-all"
            >
              <UserPlus className="w-4 h-4 text-[#635BFF]" />
              <span>Create an Account</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

          </form>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} PlacementMentor AI. All rights reserved.
      </footer>

    </div>
  );
}
