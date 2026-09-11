import React, { useState } from 'react';
import { BrainCircuit, Video, Award, Sparkles, ArrowRight, CheckCircle2, ChevronRight, Menu, X } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Landing Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="app-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo + Tagline */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-[#635BFF] shadow-sm">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                    Placement<span className="text-[#635BFF]">Mentor</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                    AI Platform
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Dual-Engine Readiness Evaluator
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#635BFF] transition-colors">
                Home
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
            </nav>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 transition-all"
              >
                Log In
              </button>
              <button
                onClick={onGetStartedClick}
                className="px-5 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center space-x-1.5"
              >
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block w-full text-left py-2 font-semibold text-slate-700">Home</button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 font-semibold text-slate-700">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 font-semibold text-slate-700">How It Works</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 font-semibold text-slate-700">About</button>
            <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
              <button onClick={onLoginClick} className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold text-sm">Log In</button>
              <button onClick={onGetStartedClick} className="w-full py-2.5 rounded-xl bg-[#635BFF] text-white font-semibold text-sm">Get Started</button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">

        {/* 2. Hero Section */}
        <section className="py-16 sm:py-24 border-b border-slate-200/60 bg-gradient-to-b from-white via-indigo-50/20 to-transparent">
          <div className="app-container text-center max-w-4xl mx-auto space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#635BFF] text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-[#635BFF]" />
              <span>Dual-Engine Readiness Evaluator</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Master Your <span className="text-[#635BFF]">Placement Readiness</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              An advanced AI platform evaluating technical competencies and non-verbal interview behavior with precision machine learning models.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={onGetStartedClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold border border-slate-200 shadow-sm hover:shadow transition-all duration-150"
              >
                Learn More
              </button>
            </div>

            {/* Key Metrics Strip */}
            <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card">
                <div className="text-2xl font-extrabold text-[#635BFF]">15+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Skill Features Evaluated</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card">
                <div className="text-2xl font-extrabold text-indigo-600">17</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">YOLO26 Pose Keypoints</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card">
                <div className="text-2xl font-extrabold text-blue-600">70 / 30</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Weighted Score Engine</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-card">
                <div className="text-2xl font-extrabold text-emerald-600">Instant</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">AI Feedback & Tiering</div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Feature Cards Section */}
        <section id="features" className="py-16 sm:py-24 border-b border-slate-200/60">
          <div className="app-container">
            
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">Comprehensive Evaluation</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Two Specialized Engines. One Unified Score.
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                PlacementMentor combines quantitative skill modeling with computer vision posture analysis to give you a true job readiness index.
              </p>
            </div>

            {/* 3 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#635BFF] mb-6">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Phase 1</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Academic & Technical Skills</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Evaluates CGPA, programming proficiency in Python/Java/SQL, DSA, Full Stack, Cloud, and Aptitude using a Random Forest Regressor calibrated on 2,000+ benchmark profiles.
                  </p>
                </div>
                <ul className="space-y-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-700">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> <span>15 Skill Parameter Inputs</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> <span>Role Recommendation Output</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> <span>Weakness & Actionable Advice</span></li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-6">
                    <Video className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Phase 2</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Posture & Interview Behavior</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Uses YOLO26-Pose skeletal tracking to analyze head tilt, eye contact proxy, shoulder alignment, and hand movements from mock interview images or video recordings.
                  </p>
                </div>
                <ul className="space-y-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-700">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> <span>17 COCO Skeletal Keypoints</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> <span>Confident / Nervous / Distracted</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> <span>Image & Video Media Support</span></li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/40 p-8 rounded-2xl border-2 border-indigo-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">Final Engine</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Placement Readiness Score</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Combines Phase 1 score (70% weight) and Phase 2 interview posture score (30% weight) into an automated, interactive readiness index and tier classification.
                  </p>
                </div>
                <ul className="space-y-2 border-t border-indigo-100 pt-4 text-xs font-semibold text-slate-700">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" /> <span>Weighted Matrix Math</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" /> <span>Tier 1–5 Job Readiness Tiers</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" /> <span>Exportable PDF / Report</span></li>
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* 4. Visual 2-Phase Evaluation Process */}
        <section id="how-it-works" className="py-16 sm:py-24 border-b border-slate-200/60 bg-white">
          <div className="app-container">
            
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">Workflow</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                How The Evaluation Works
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Follow a streamlined 3-step process to receive your comprehensive placement readiness assessment.
              </p>
            </div>

            {/* Step Process Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
              
              {/* Step 1 */}
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 relative text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#635BFF] text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-sm">
                  1
                </div>
                <h4 className="font-bold text-slate-900 text-base">Phase 1: Input Skills</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Provide your CGPA, programming scores, and domain experience to compute your technical capability index.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 relative text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#635BFF] text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-sm">
                  2
                </div>
                <h4 className="font-bold text-slate-900 text-base">Phase 2: Posture Analysis</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Upload a photo or mock interview video. YOLO26-Pose tracks non-verbal cues and posture alignment.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 relative text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#635BFF] text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-sm">
                  3
                </div>
                <h4 className="font-bold text-slate-900 text-base">Composite Readiness</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Get your weighted score (70:30), job tier rating, key weakness areas, and actionable improvement recommendations.
                </p>
              </div>

            </div>

            {/* Bottom Callout */}
            <div className="mt-12 text-center">
              <button
                onClick={onGetStartedClick}
                className="px-8 py-3.5 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all inline-flex items-center space-x-2"
              >
                <span>Start Evaluation Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </section>

        {/* 5. About Section */}
        <section id="about" className="py-16 sm:py-20 border-b border-slate-200/60">
          <div className="app-container max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">About The Project</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Built for Engineering & Science Students
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              PlacementMentor AI bridges the gap between academic preparation and real-world placement expectations. By combining quantitative machine learning with posture analysis, candidates gain structured insights to land their dream job.
            </p>
          </div>
        </section>

      </main>

      {/* 6. Landing Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-xs text-slate-500">
        <div className="app-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-900">
              Placement<span className="text-[#635BFF]">Mentor</span> AI
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">Dual-Engine Readiness Platform</span>
          </div>
          <div className="text-slate-400">
            © {new Date().getFullYear()} PlacementMentor AI. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
