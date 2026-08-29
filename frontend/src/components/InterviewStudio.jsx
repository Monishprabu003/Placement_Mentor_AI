import React, { useState } from 'react';
import { Video, Image as ImageIcon, UploadCloud, Loader2, Activity, Eye, ShieldAlert, Sparkles, CheckCircle2, Play, RefreshCw } from 'lucide-react';
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
      if (onScoreCalculated && data.behaviour_score) {
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
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Nervous':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Distracted':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Video className="w-4 h-4 text-cyan-400" />
          <span>Phase 2 Evaluation</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          AI Interview Behavior & Posture Studio
        </h2>
        <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base">
          Upload mock interview images or recorded video clips. <span className="text-cyan-400 font-semibold">YOLO26-Pose</span> extracts 17 keypoints to evaluate head tilt, spine alignment, hand movement, and shoulder tension.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Mode Selector Tabs */}
          <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => { setActiveMode('image'); setFile(null); setResult(null); }}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                activeMode === 'image'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Image Analysis (JPG/PNG)</span>
            </button>
            <button
              onClick={() => { setActiveMode('video'); setFile(null); setResult(null); }}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                activeMode === 'video'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Analysis (MP4/AVI)</span>
            </button>
          </div>

          {/* Dropzone */}
          <div className="glass-panel p-8 rounded-3xl border-2 border-dashed border-slate-800 hover:border-cyan-500/40 transition-all text-center relative overflow-hidden group">
            <input
              type="file"
              accept={activeMode === 'image' ? 'image/jpeg,image/png' : 'video/mp4,video/avi,video/quicktime'}
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />
            
            <div className="flex flex-col items-center justify-center relative z-10 py-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                {file ? file.name : `Drop your ${activeMode} file here or click to browse`}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs">
                {activeMode === 'image'
                  ? 'Supports JPG, PNG up to 16MB'
                  : 'Supports MP4, AVI up to 100MB (Analyzes frames at 5 FPS)'}
              </p>
            </div>
          </div>

          {/* Media Preview Box */}
          {previewUrl && (
            <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">Input Preview</div>
              {activeMode === 'image' ? (
                <img src={previewUrl} alt="Preview" className="w-full max-h-64 object-contain rounded-xl bg-slate-950" />
              ) : (
                <video src={previewUrl} controls className="w-full max-h-64 rounded-xl bg-slate-950" />
              )}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Analyze Action Button */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-base shadow-xl shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-cyan-300" />
                <span>Running YOLO26 Pose Keypoint Detection...</span>
              </>
            ) : (
              <>
                <Activity className="w-5 h-5 text-cyan-300" />
                <span>Start AI Posture & Behavior Analysis</span>
              </>
            )}
          </button>

        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          {result ? (
            <div className="space-y-6">
              
              {/* Primary Assessment Badge */}
              <div className="glass-panel p-6 rounded-3xl border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">Behavior Assessment</span>
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${getBadgeStyle(result.behaviour)}`}>
                    {result.behaviour}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 my-2">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs text-slate-400 font-medium">Confidence Score</span>
                    <div className="text-2xl font-extrabold text-white mt-1">
                      {Math.round((result.confidence_score || 0) * 100)}%
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs text-slate-400 font-medium">Posture Score</span>
                    <div className="text-2xl font-extrabold text-cyan-400 mt-1">
                      {result.behaviour_score ? result.behaviour_score.toFixed(1) : '0.0'} / 100
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800 leading-relaxed">
                  <strong className="text-cyan-400 font-mono">Summary:</strong> {result.summary}
                </p>
              </div>

              {/* Processed Media Visualizer */}
              {result.processed_image_path || result.processed_video_path ? (
                <div className="glass-panel p-4 rounded-3xl border border-slate-800 space-y-3">
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>YOLO26-Pose Skeleton Overlay</span>
                  </div>

                  {result.processed_image_path ? (
                    <img src={result.processed_image_path} alt="Processed Pose" className="w-full rounded-2xl bg-slate-950 border border-slate-800" />
                  ) : (
                    <video src={result.processed_video_path} controls autoPlay loop className="w-full rounded-2xl bg-slate-950 border border-slate-800" />
                  )}
                </div>
              ) : null}

              {/* Image Features Breakdown */}
              {result.features && (
                <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase">Non-Verbal Feature Metrics</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Head Tilt</span>
                      <strong className="text-white">{result.features.head_tilt_angle.toFixed(1)}°</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Spine Alignment</span>
                      <strong className="text-white">{result.features.spine_alignment_score.toFixed(1)}%</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Hand Movement</span>
                      <strong className="text-white">{result.features.hand_movement_delta.toFixed(1)}%</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Eye Contact</span>
                      <strong className="text-white">{result.features.eye_contact_proxy.toFixed(1)}%</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Distribution Breakdown */}
              {result.behaviour_distribution && (
                <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase">Behavior Distribution Across Frames</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-emerald-400">Confident</span>
                        <span className="text-white">{Math.round(result.behaviour_distribution.confident * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.round(result.behaviour_distribution.confident * 100)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-amber-400">Nervous</span>
                        <span className="text-white">{Math.round(result.behaviour_distribution.nervous * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.round(result.behaviour_distribution.nervous * 100)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-rose-400">Distracted</span>
                        <span className="text-white">{Math.round(result.behaviour_distribution.distracted * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${Math.round(result.behaviour_distribution.distracted * 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl text-center border-dashed border-slate-800 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
                <Video className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Media Analyzed Yet</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Upload a mock interview image or video on the left to extract posture metrics and non-verbal signals.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
