import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Video, 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  Zap,
  Activity,
  Check,
  ShieldCheck,
  Cpu,
  Scan,
  Target,
  BarChart3,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function LandingPage({ onLoginClick, onGetStartedClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between selection:bg-[#635BFF] selection:text-white font-sans relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs & Dot/Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(99,91,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,91,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-100/60 via-purple-50/40 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/3 -right-40 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-10 -left-40 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ================================================== */}
      {/* 2. LANDING PAGE HEADER */}
      {/* ================================================== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 transition-all shadow-xs">
        <div className="app-container">
          <div className="flex items-center justify-between h-20">
            
            {/* LEFT: Logo + Tagline */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
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

            {/* CENTER: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="hover:text-[#635BFF] transition-colors hover:scale-105 transform"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="hover:text-[#635BFF] transition-colors hover:scale-105 transform"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="hover:text-[#635BFF] transition-colors hover:scale-105 transform"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="hover:text-[#635BFF] transition-colors hover:scale-105 transform"
              >
                About
              </button>
            </nav>

            {/* RIGHT: Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-all"
              >
                Log In
              </button>
              <button
                onClick={onGetStartedClick}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#635BFF] to-[#4F46E5] hover:from-[#5349E0] hover:to-[#4338CA] text-white text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center space-x-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200/70 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-2xl px-5 py-5 space-y-4 shadow-xl">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block w-full text-left py-2 font-semibold text-slate-800">Home</button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 font-semibold text-slate-800">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 font-semibold text-slate-800">How It Works</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 font-semibold text-slate-800">About</button>
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
              <button onClick={onLoginClick} className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50">Log In</button>
              <button onClick={onGetStartedClick} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#635BFF] to-[#4F46E5] text-white font-semibold text-sm shadow-sm">Get Started →</button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN PUBLIC CONTENT */}
      <main className="flex-1 z-10">

        {/* ================================================== */}
        {/* 3 & 4 & 5. HERO SECTION & HERO VISUAL & LAYOUT */}
        {/* ================================================== */}
        <section className="py-12 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="app-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* DESKTOP LEFT (approx 55% -> 7 cols on 12-grid) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Small Badge */}
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-100 text-[#635BFF] text-xs font-bold tracking-wider uppercase shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#635BFF] animate-pulse" />
                  <span>✦ AI-POWERED PLACEMENT INTELLIGENCE</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                  MASTER YOUR <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#635BFF] via-[#4F46E5] to-[#3B82F6] bg-clip-text text-transparent">
                    PLACEMENT READINESS.
                  </span>
                </h1>

                {/* Supporting Text */}
                <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
                  Measure your technical capabilities and interview behavior with AI-powered evaluation engines designed to help you become placement ready.
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={onGetStartedClick}
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#635BFF] to-[#4F46E5] hover:from-[#5349E0] hover:to-[#4338CA] text-white text-sm sm:text-base font-bold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Start Free Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('features')}
                    className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm sm:text-base font-semibold border border-slate-200/90 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Explore Platform</span>
                  </button>
                </div>

                {/* Trust Statement */}
                <div className="pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No credit card required</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5 text-[#635BFF]" />
                    <span>AI-powered analysis</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    <span>Instant readiness score</span>
                  </span>
                </div>

              </div>

              {/* DESKTOP RIGHT (approx 45% -> 5 cols on 12-grid) HERO VISUAL */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                
                {/* Decorative background glow behind dashboard card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200/60 to-blue-200/60 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000" />
                
                {/* Main AI Dashboard White Glass Card */}
                <div className="relative rounded-3xl bg-white/95 border border-slate-200/90 p-6 sm:p-7 shadow-xl shadow-slate-200/60 backdrop-blur-xl space-y-6">
                  
                  {/* Card Header Strip */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                        PLACEMENT READINESS
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">Automated AI Diagnostic</h3>
                    </div>
                    <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>AI Evaluation Active</span>
                    </div>
                  </div>

                  {/* Primary Score Counter & Progress Bar */}
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-baseline space-x-1">
                          <span>83.5</span>
                          <span className="text-2xl font-bold text-[#635BFF]">%</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                          Composite Readiness Benchmark
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-[#635BFF] border border-indigo-100 text-xs font-extrabold uppercase">
                        Tier 2
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                      <div 
                        className="h-full bg-gradient-to-r from-[#635BFF] via-[#4F46E5] to-[#3B82F6] rounded-full shadow-xs transition-all duration-1000"
                        style={{ width: '83.5%' }}
                      />
                    </div>
                  </div>

                  {/* Sub-Metrics Breakdown Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    
                    {/* Technical Metric */}
                    <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 font-medium">Technical Skills</span>
                        <span className="text-[#635BFF] font-extrabold">85%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                        <div className="h-full bg-[#635BFF] rounded-full" style={{ width: '85%' }} />
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold">70% Weighting</div>
                    </div>

                    {/* Behavior Metric */}
                    <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 font-medium">Interview Behavior</span>
                        <span className="text-blue-600 font-extrabold">80%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '80%' }} />
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold">30% Weighting</div>
                    </div>

                  </div>

                  {/* Engine Split Footer */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-semibold">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#635BFF]" />
                      <span>70% Technical Engine</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>30% Behavioral Engine</span>
                    </span>
                  </div>

                </div>

                {/* Floating Card 1: Technical Analysis */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 border border-emerald-200/80 text-emerald-700 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-lg flex items-center space-x-2 backdrop-blur-md hidden sm:flex">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span>Technical Analysis Active</span>
                </div>

                {/* Floating Card 2: Posture Analysis */}
                <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 border border-indigo-100 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-lg flex items-center space-x-2 backdrop-blur-md">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-[#635BFF]">
                    <Activity className="w-3 h-3" />
                  </div>
                  <span>✓ Posture Analysis Active</span>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* 6. STATS SECTION */}
        {/* ================================================== */}
        <section className="py-8 border-y border-slate-200/80 bg-white/70 backdrop-blur-md">
          <div className="app-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#635BFF] to-blue-600">
                  15+
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  Skill Parameters
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-200 transition-all text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  17
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  YOLO26 Pose Keypoints
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#635BFF] to-cyan-600">
                  70 / 30
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  Weighted Score Engine
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  AI
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  Instant Feedback
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* 7. FEATURES SECTION */}
        {/* ================================================== */}
        <section id="features" className="py-20 sm:py-28 relative">
          <div className="app-container">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#635BFF]">
                DUAL-ENGINE EVALUATION
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                TWO AI ENGINES. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#635BFF] via-[#4F46E5] to-[#3B82F6] bg-clip-text text-transparent">
                  ONE PLACEMENT SCORE.
                </span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                PlacementMentor combines quantitative technical skill modeling with computer vision posture analysis to generate your definitive job readiness rating.
              </p>
            </div>

            {/* 2 Feature Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* CARD 1: Academic & Technical Engine */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/60 rounded-full blur-3xl group-hover:bg-indigo-100/60 transition-all" />
                
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#635BFF] shadow-xs">
                      <BrainCircuit className="w-7 h-7" />
                    </div>
                    <span className="text-4xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors">
                      01
                    </span>
                  </div>

                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#635BFF]">
                    PHASE 1 ENGINE
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-4">
                    ACADEMIC & TECHNICAL ENGINE
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Evaluates candidate performance across academic markers and technical competencies using calibrated Random Forest regression models.
                  </p>

                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Evaluates:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['CGPA', 'Aptitude', 'Data Structures & Algorithms', 'Programming', 'SQL', 'Domain Skills', 'Soft Skills'].map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center space-x-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#635BFF]" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative Technical Score Visualization */}
                <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-200/60 pb-2">
                    <span>Technical Evaluation Matrix</span>
                    <span className="text-[#635BFF]">Random Forest Model</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-medium">
                        <span>DSA & Algo</span>
                        <span className="text-slate-900 font-bold">88%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-[#635BFF] rounded-full" style={{ width: '88%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-medium">
                        <span>Programming</span>
                        <span className="text-slate-900 font-bold">90%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-[#635BFF] rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* CARD 2: Interview Behavior Engine */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/60 rounded-full blur-3xl group-hover:bg-blue-100/60 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
                      <Video className="w-7 h-7" />
                    </div>
                    <span className="text-4xl font-black text-blue-100 group-hover:text-blue-200 transition-colors">
                      02
                    </span>
                  </div>

                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                    PHASE 2 ENGINE
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-4">
                    INTERVIEW BEHAVIOR ENGINE
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Leverages YOLO26-Pose keypoint tracking to detect non-verbal cues, posture stability, and eye contact indicators during interview scenarios.
                  </p>

                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Analyzes:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Posture', 'Head Stability', 'Eye Focus', 'Shoulder Alignment', 'Gestures', 'Non-verbal behavior'].map((behavior, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center space-x-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>{behavior}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative Pose/Keypoint Visualization */}
                <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-200/60 pb-2">
                    <span>COCO Skeletal Tracking</span>
                    <span className="text-blue-600">17 Keypoint YOLO26</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-slate-900 font-semibold">Head Alignment: Optimal</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-100">
                      Confident State
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* 8. HOW IT WORKS */}
        {/* ================================================== */}
        <section id="how-it-works" className="py-20 sm:py-28 border-t border-slate-200/80 bg-slate-100/50 relative">
          <div className="app-container">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#635BFF]">
                SIMPLE WORKFLOW
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                HOW IT WORKS
              </h2>
              <p className="text-base text-slate-600">
                Get evaluated in three seamless steps to unlock your comprehensive placement readiness breakdown.
              </p>
            </div>

            {/* 3 Steps Connected */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
              
              {/* Step 1 */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-7 relative text-center space-y-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#635BFF] to-[#3B82F6] text-white font-black text-base flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
                  01
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg tracking-tight">
                  CREATE YOUR PROFILE
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your academic details, CGPA, programming skill levels, and domain proficiencies.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-7 relative text-center space-y-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-cyan-500 text-white font-black text-base flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                  02
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg tracking-tight">
                  RUN AI EVALUATION
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete technical assessment modeling and posture analysis via photo/video upload.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-7 relative text-center space-y-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-[#635BFF] text-white font-black text-base flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                  03
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg tracking-tight">
                  GET YOUR READINESS SCORE
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive a weighted placement readiness score (70:30 ratio) and personalized insights.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* 9. FINAL SCORE PREVIEW */}
        {/* ================================================== */}
        <section className="py-20 sm:py-28 relative">
          <div className="app-container">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#635BFF]">
                ACTIONABLE INSIGHTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                KNOW WHERE YOU STAND <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#635BFF] via-[#4F46E5] to-[#3B82F6] bg-clip-text text-transparent">
                  BEFORE THE INTERVIEW.
                </span>
              </h2>
              <p className="text-base text-slate-600">
                Preview of the interactive readiness dashboard generated upon completing your evaluation.
              </p>
            </div>

            {/* Mock Final Score Dashboard Card */}
            <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xl shadow-slate-200/60 relative overflow-hidden backdrop-blur-xl space-y-8">
              
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/80 rounded-full blur-3xl pointer-events-none" />

              {/* Score Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    COMPOSITE EVALUATION RESULT
                  </span>
                  <div className="flex items-baseline space-x-3 mt-1">
                    <span className="text-5xl font-black text-slate-900 tracking-tight">83.5%</span>
                    <span className="text-sm font-bold text-[#635BFF]">READINESS SCORE</span>
                  </div>
                </div>
                
                <div className="px-4 py-2 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#635BFF] text-xs font-extrabold uppercase">
                  Tier 2 — Highly Competitive
                </div>
              </div>

              {/* Dual Engine Progress Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Technical Skills</span>
                    <span className="text-[#635BFF] font-bold">85%</span>
                  </div>
                  <div className="h-2 bg-slate-200/70 rounded-full overflow-hidden">
                    <div className="h-full bg-[#635BFF] rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Interview Behavior</span>
                    <span className="text-blue-600 font-bold">80%</span>
                  </div>
                  <div className="h-2 bg-slate-200/70 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

              </div>

              {/* Key Insights Preview */}
              <div className="p-5 rounded-2xl bg-slate-50/60 border border-slate-100 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block">
                  AI Generated Action Insights:
                </span>
                <div className="space-y-2 text-xs font-medium">
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Strong technical foundation across DSA and programming concepts.</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Good interview posture and consistent shoulder symmetry.</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#635BFF]">
                    <ArrowRight className="w-4 h-4 text-[#635BFF] shrink-0" />
                    <span>Improve eye focus alignment during long answer explanations.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* 10. CTA SECTION */}
        {/* ================================================== */}
        <section className="py-20 sm:py-28 border-t border-slate-200/80 bg-gradient-to-b from-[#F8FAFC] via-indigo-50/40 to-[#F8FAFC] relative overflow-hidden">
          <div className="app-container text-center max-w-4xl mx-auto space-y-8 relative z-10">
            
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              READY TO KNOW YOUR <br />
              <span className="bg-gradient-to-r from-[#635BFF] via-[#4F46E5] to-[#3B82F6] bg-clip-text text-transparent">
                PLACEMENT READINESS?
              </span>
            </h2>

            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Evaluate your skills. Improve your interview presence. Walk into your next placement with confidence.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={onGetStartedClick}
                className="px-9 py-4 rounded-2xl bg-gradient-to-r from-[#635BFF] to-[#4F46E5] hover:from-[#5349E0] hover:to-[#4338CA] text-white text-base font-extrabold shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2.5"
              >
                <span>Start Your Free Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* ABOUT SECTION */}
        {/* ================================================== */}
        <section id="about" className="py-16 border-t border-slate-200/80 bg-white">
          <div className="app-container max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#635BFF]">
              ABOUT PLACEMENTMENTOR
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Built for Next-Generation Engineers & Job Seekers
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              PlacementMentor AI combines empirical machine learning skill evaluation with modern computer vision posture analytics to give candidates a holistic, objective placement readiness score before facing real interviews.
            </p>
          </div>
        </section>

      </main>

      {/* ================================================== */}
      {/* 11. FOOTER */}
      {/* ================================================== */}
      <footer className="bg-white border-t border-slate-200/80 py-12 text-xs text-slate-500 relative z-10">
        <div className="app-container flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* LEFT: Branding */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="font-extrabold text-base text-slate-900">
                Placement<span className="text-[#635BFF]">Mentor</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-semibold text-slate-600">AI Platform</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Dual-Engine Readiness Evaluator
            </p>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-xs text-slate-600">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#635BFF] transition-colors">
              Platform
            </button>
            <button onClick={() => scrollToSection('features')} className="hover:text-[#635BFF] transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#635BFF] transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#635BFF] transition-colors">
              About
            </button>
          </div>

          {/* RIGHT: Quick CTAs */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onLoginClick} 
              className="text-slate-700 hover:text-[#635BFF] font-semibold transition-colors"
            >
              Login
            </button>
            <button 
              onClick={onGetStartedClick} 
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#635BFF] to-[#4F46E5] text-white font-semibold shadow-xs hover:opacity-95 transition-opacity"
            >
              Get Started
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="app-container pt-8 mt-8 border-t border-slate-100 text-center text-slate-400 text-[11px]">
          © 2026 PlacementMentor AI. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
