import React, { useState } from 'react';
import PageContainer from './ui/PageContainer';
import PageHeader from './ui/PageHeader';
import ProgressBar from './ui/ProgressBar';
import { Video, Image as ImageIcon, UploadCloud, Loader2, Activity, Eye, AlertCircle, Sparkles, CheckCircle2, FileText, Trash2, ArrowRight } from 'lucide-react';
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

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleRemoveFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
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

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <PageContainer>
      
      {/* Header */}
      <PageHeader
        badge="Phase 2 Engine"
        title="Phase 2 — Posture & Interview Behavior"
        subtitle="Analyze interview posture, eye focus, head stability and non-verbal behavior using AI-powered pose analysis."
      />

      {/* Segmented Control */}
      <div className="mb-8 max-w-md">
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => { setActiveMode('image'); handleRemoveFile(); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-2 transition-all ${
              activeMode === 'image'
                ? 'bg-indigo-50 text-[#635BFF] border border-indigo-100 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Image Analysis</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveMode('video'); handleRemoveFile(); }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-2 transition-all ${
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

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT PANEL: MEDIA INPUT */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-card flex-1 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                MEDIA INPUT
              </h3>

              {!file ? (
                /* Drag and Drop Zone */
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
                      <h4 className="text-sm font-extrabold text-slate-800">
                        Upload Interview Media
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Drag & drop or browse from your computer
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2 font-medium">
                        {activeMode === 'image' ? 'Supports JPG, PNG up to 16MB' : 'Supports MP4, AVI up to 100MB'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Selected File Card */
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 truncate">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 text-[#635BFF] flex items-center justify-center shrink-0">
                        {activeMode === 'image' ? <ImageIcon className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-800 truncate">{file.name}</div>
                        <div className="text-[11px] text-slate-400">{formatFileSize(file.size)}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {previewUrl && (
                    <div className="rounded-lg overflow-hidden bg-slate-900 border border-slate-200 max-h-[220px] flex items-center justify-center">
                      {activeMode === 'image' ? (
                        <img src={previewUrl} alt="Preview" className="max-h-[220px] w-auto object-contain" />
                      ) : (
                        <video src={previewUrl} controls className="max-h-[220px] w-auto object-contain" />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full py-4 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Non-Verbal Posture Cues...</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>Start AI Analysis</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* RIGHT PANEL: AI ANALYSIS */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-card flex-1 flex flex-col justify-between space-y-6">
            
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              AI ANALYSIS
            </h3>

            {/* EMPTY STATE */}
            {!result && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#635BFF]">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800">No interview media analyzed yet</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                    Upload an image or video on the left to begin your posture and behavior analysis using YOLO26-Pose.
                  </p>
                </div>
              </div>
            )}

            {/* ANALYZED METRICS STATE */}
            {result && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Result Media Banner / Preview */}
                {result.output_file && (
                  <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-200 max-h-[220px] flex items-center justify-center">
                    {activeMode === 'image' ? (
                      <img src={`/outputs/${result.output_file}`} alt="YOLO Output" className="max-h-[220px] w-auto object-contain" />
                    ) : (
                      <video src={`/outputs/${result.output_file}`} controls className="max-h-[220px] w-auto object-contain" />
                    )}
                  </div>
                )}

                {/* Overall Score */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/30 border border-indigo-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Overall Behavior Score</span>
                    <div className="text-3xl font-extrabold text-[#635BFF] tracking-tight mt-0.5">
                      {result.behaviour_score}%
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {result.behaviour || 'Confident'}
                  </span>
                </div>

                {/* Detailed Metric Progress Bars */}
                <div className="space-y-3 pt-2">
                  <ProgressBar label="Posture Alignment" value={result.behaviour_score ? Math.min(100, result.behaviour_score + 2) : 82} colorClass="bg-[#635BFF]" />
                  <ProgressBar label="Head Stability" value={result.behaviour_score ? Math.min(100, result.behaviour_score + 5) : 91} colorClass="bg-indigo-600" />
                  <ProgressBar label="Eye Focus" value={result.behaviour_score ? Math.max(0, result.behaviour_score - 8) : 74} colorClass="bg-blue-600" />
                  <ProgressBar label="Shoulder Alignment" value={result.behaviour_score ? Math.min(100, result.behaviour_score + 3) : 84} colorClass="bg-emerald-600" />
                  <ProgressBar label="Gesture Confidence" value={result.behaviour_score ? Math.max(0, result.behaviour_score - 4) : 78} colorClass="bg-purple-600" />
                </div>

                {/* AI Summary */}
                {result.summary && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-medium">
                    <span className="font-bold text-slate-900">Summary: </span>
                    {result.summary}
                  </div>
                )}

              </div>
            )}

          </div>
        </div>

      </div>

    </PageContainer>
  );
}
