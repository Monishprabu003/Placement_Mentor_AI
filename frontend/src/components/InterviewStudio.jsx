import React, { useState } from 'react';
import { Video, Image as ImageIcon, UploadCloud, Loader2, Activity, Eye, AlertCircle, Sparkles, CheckCircle2, FileVideo, ShieldCheck } from 'lucide-react';
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
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Mode Selector Tabs */}
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => { setActiveMode('image'); setFile(null); setResult(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                activeMode === 'image'
                  ? 'bg-indigo-50 text-[#635BFF] border border-indigo-100 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Image Analysis</span>
            </button>
            <button
              onClick={() => { setActiveMode('video'); setFile(null); setResult(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                activeMode === 'video'
                  ? 'bg-indigo-50 text-[#635BFF] border border-indigo-100 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Analysis</span>
            </button>
          </div>

          {/* Upload Dropzone */}
          <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/10 transition-all text-center relative overflow-hidden group cursor-pointer shadow-card">
            <input
              type="file"
              accept={activeMode === 'image' ? 'image/jpeg,image/png' : 'video/mp4,video/avi,video/quicktime'}
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full h-full"
            />
            
            <div className="flex flex-col items-center justify-center py-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 text-[#635BFF] group-hover:scale-105 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                {file ? file.name : `Drop your ${activeMode} here, or click to browse`}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                {activeMode === 'image'
                  ? 'Supports JPG, PNG up to 16MB'
                  : 'Supports MP4, AVI up to 100MB (Analyzes frames at 5 FPS)'}
              </p>
            </div>
          </div>

          {/* Media Preview Box */}
          {previewUrl && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Input Preview</div>
              {activeMode === 'image' ? (
                <img src={previewUrl} alt="Preview" className="w-full max-h-64 object-contain rounded-xl bg-slate-900" />
              ) : (
                <video src={previewUrl} controls className="w-full max-h-64 rounded-xl bg-slate-900" />
              )}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Analyze Action Button */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full py-4 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2.5 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Running YOLO26-Pose Analysis...</span>
              </>
            ) : (
              <>
                <Activity className="w-4 h-4" />
                <span>Start AI Posture & Behavior Analysis</span>
              </>
            )}
          </button>

        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          {result ? (
            <div className="space-y-6">
              
              {/* Primary Assessment Card */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-card space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Behavior Assessment
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getBadgeStyle(result.behaviour)}`}>
                    {result.behaviour}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs text-slate-500 font-medium">Confidence Score</span>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">
                      {Math.round((result.confidence_score || 0) * 100)}%
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs text-slate-500 font-medium">Posture Score</span>
                    <div className="text-2xl font-extrabold text-[#635BFF] mt-1">
                      {result.behaviour_score ? result.behaviour_score.toFixed(1) : '0.0'} / 100
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Summary:</strong> {result.summary}
                </div>
              </div>

              {/* Skeleton Visualizer */}
              {(result.processed_image_path || result.processed_video_path) && (
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#635BFF]" />
                    <span>YOLO26-Pose Skeleton Overlay</span>
                  </div>

                  {result.processed_image_path ? (
                    <img 
                      src={result.processed_image_path} 
                      alt="Processed Pose" 
                      className="w-full rounded-xl bg-slate-900 border border-slate-200" 
                    />
                  ) : (
                    <video 
                      src={result.processed_video_path} 
                      controls 
                      autoPlay 
                      loop 
                      className="w-full rounded-xl bg-slate-900 border border-slate-200" 
                    />
                  )}
                </div>
              )}

              {/* Features Breakdown */}
              {result.features && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Non-Verbal Feature Breakdown
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between">
                      <span className="text-slate-600">Head Tilt</span>
                      <strong className="text-slate-900">{result.features.head_tilt_angle.toFixed(1)}°</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between">
                      <span className="text-slate-600">Spine Alignment</span>
                      <strong className="text-slate-900">{result.features.spine_alignment_score.toFixed(1)}%</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between">
                      <span className="text-slate-600">Hand Movement</span>
                      <strong className="text-slate-900">{result.features.hand_movement_delta.toFixed(1)}%</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between">
                      <span className="text-slate-600">Eye Contact</span>
                      <strong className="text-slate-900">{result.features.eye_contact_proxy.toFixed(1)}%</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Distribution */}
              {result.behaviour_distribution && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Behavior Distribution Across Frames
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-emerald-700">Confident</span>
                        <span className="text-slate-900">{Math.round(result.behaviour_distribution.confident * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.round(result.behaviour_distribution.confident * 100)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-amber-700">Nervous</span>
                        <span className="text-slate-900">{Math.round(result.behaviour_distribution.nervous * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.round(result.behaviour_distribution.nervous * 100)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-rose-700">Distracted</span>
                        <span className="text-slate-900">{Math.round(result.behaviour_distribution.distracted * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${Math.round(result.behaviour_distribution.distracted * 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white p-10 rounded-2xl text-center border-2 border-dashed border-slate-200 shadow-card flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 text-blue-600">
                <Video className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">No Media Analyzed Yet</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Upload a mock interview image or video on the left to extract skeletal keypoints and non-verbal posture metrics.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
