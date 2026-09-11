import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, UserPlus, Mail, Lock, User, AlertTriangle, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function RegisterPage({ onSwitchToLogin, onBackToLanding }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      setSuccess(true);
      setTimeout(() => onSwitchToLogin(), 2000);
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

      {/* Main Register Box */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create an <span className="text-[#635BFF]">Account</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Start your placement and AI interview readiness journey
            </p>
          </div>

          {/* Success State */}
          {success ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-card text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Account Created Successfully!</h2>
              <p className="text-xs text-slate-500">Redirecting you to login...</p>
            </div>
          ) : (
            /* Register Form Card */
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card space-y-4">

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

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
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                      confirmPassword && confirmPassword !== password
                        ? 'border-rose-300 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-[#635BFF] focus:ring-indigo-100'
                    }`}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>

              {/* Back to Login Link */}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="w-full py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-2xs transition-all"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400" />
                <span>Already have an account? Sign In</span>
              </button>

            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} PlacementMentor AI. All rights reserved.
      </footer>

    </div>
  );
}
