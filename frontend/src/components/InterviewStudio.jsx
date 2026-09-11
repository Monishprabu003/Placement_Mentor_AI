import React, { useState } from 'react';
import { Video, Image as ImageIcon, UploadCloud, Loader2, Activity, Eye, AlertCircle, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function InterviewStudio({ onScoreCalculated }) {
  const { authHeaders } = useAuth();
  const [activeMode, setActiveMode] = useState('image'); // 'image' | 'video'
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setResult(null);
    setError(null);

    // Create local object URL for preview
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image or video file first.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    const endpoint = activeMode === 'image' ? '/analyze-image' : '/analyze-video';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          ...authHeaders(),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to analyze media');
      }

      setResult(data);
      if (onScoreCalculated && data.behaviour_score !== undefined) {
        onScoreCalculated(data.behaviour_score);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getBadgeStyle = (behaviour) => {
    switch (behaviour) {
      case 'Confident':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Nervous':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Distracted':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div className="py-8">
      <div className="app-container">
        
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-slate-200">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-2">
            <Video className="w-3.5 h-3.5 text-blue-600" />
            <span>Phase 2 Evaluation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Interview Posture & Non-Verbal Studio
          </h2>
          <p className="mt-1 text-slate-600 text-sm max-w-2xl">
            Upload mock interview recordings. <span className="font-semibold text-slate-800">YOLO26-Pose</span> tracks 17 skeletal keypoints to analyze posture alignment, head stability, and eye focus.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mb-8 max-w-md">
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => { setActiveMode('image'); setFile(null); setPreviewUrl(null); setResult(null); setError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
                activeMode === 'image'
                  ? 'bg-indigo-50 text-[#635BFF] border border-indigo-100 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Image Analysis</span>
            </button>
            <button
              onClick={() => { setActiveMode('video'); setFile(null); setPreviewUrl(null); setResult(null); setError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
                activeMode === 'video'
                  ? 'bg-indigo-50 text-[#635BFF] border border-indigo-100 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Analysis</span>
            </button>
          </div>
        </div>

        {/* Desktop 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Upload Area */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-card space-y-6 flex-1 flex flex-col justify-between">
              
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 border-b border-slate-100 pb-2">
                  Upload Interview Media ({activeMode === 'image' ? 'JPG/PNG' : 'MP4/AVI'})
                </h3>

                {/* Drag & Drop Upload Zone */}
                <div className="border-2 border-dashed border-slate-200 hover:border-[#635BFF] hover:bg-indigo-50/10 transition-all rounded-2xl p-8 text-center relative cursor-pointer group">
                  <input
                    type="file"
                    accept={activeMode === 'image' ? 'image/jpeg,image/png' : 'video/mp4,video/avi,video/quicktime'}
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full h-full"
                  />
                  
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#635BFF] group-hover:scale-105 transition-transform">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {file ? file.name : `Drag & drop ${activeMode} here, or click to browse`}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {activeMode === 'image' ? 'Supports JPG, PNG up to 16MB' : 'Supports MP4, AVI up to 100MB (5 FPS analysis)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="w-full py-4 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Non-Verbal Posture Keypoints...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    <span>Start AI Posture & Behavior Analysis</span>
                  </>
                )}
              </button>

            </div>
          </div>

          {/* RIGHT COLUMN: Analysis Result Area */}
          <div className="lg:col-span-6 space-y-6 flex flex-col">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-card flex-1 flex flex-col justify-between space-y-6">
              
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
                Analysis & Media Preview Panel
              </h3>

              {/* Preview Media Box */}
              {previewUrl ? (
                <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative max-h-[260px] flex items-center justify-center">
                  {activeMode === 'image' ? (
                    <img src={previewUrl} alt="Preview" className="max-h-[260px] w-auto object-contain" />
                  ) : (
                    <video src={previewUrl} controls className="max-h-[260px] w-auto object-contain" />
                  )}
                </div>
              ) : (
                <div className="h-[200px] rounded-xl border border-slate-200/80 bg-slate-50 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Sparkles className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-xs font-semibold text-slate-500">No media selected yet</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Media preview will appear here once uploaded</span>
                </div>
              )}

              {/* Result Details */}
              {result ? (
                <div className="space-y-5 animate-fade-in pt-2">
                  
                  {/* Top Score Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/30 border border-indigo-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Behavioral Score</span>
                      <div className="text-3xl font-extrabold text-[#635BFF] tracking-tight mt-0.5">
                        {result.behaviour_score}%
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${getBadgeStyle(result.behaviour)}`}>
                      {result.behaviour || 'Analyzed'}
                    </span>
                  </div>

                  {/* Feature Breakdown Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-slate-400 font-semibold text-[11px]">Head Tilt Angle</span>
                      <div className="font-bold text-slate-800 text-sm">
                        {result.features?.head_tilt !== undefined ? `${result.features.head_tilt}°` : result.head_tilt || 'Normal'}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-slate-400 font-semibold text-[11px]">Spine Alignment</span>
                      <div className="font-bold text-slate-800 text-sm">
                        {result.features?.spine_alignment !== undefined ? `${result.features.spine_alignment}°` : 'Upright'}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-slate-400 font-semibold text-[11px]">Eye Contact Proxy</span>
                      <div className="font-bold text-slate-800 text-sm">
                        {result.features?.eye_contact_proxy || result.eye_contact || 'Maintained'}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-slate-400 font-semibold text-[11px]">Shoulder Tension</span>
                      <div className="font-bold text-slate-800 text-sm">
                        {result.features?.shoulder_tension || 'Relaxed'}
                      </div>
                    </div>
                  </div>

                  {/* Summary Callout */}
                  {result.summary && (
                    <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 leading-relaxed font-medium">
                      <span className="font-bold">AI Assessment: </span>
                      {result.summary}
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-xs text-slate-400 text-center py-4">
                  Select an image or video on the left to inspect detailed posture keypoints.
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
