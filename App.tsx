import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadSection from './components/UploadSection';
import ResultSection from './components/ResultSection';
import { analyzeTongueImage } from './services/geminiService';
import { TCMAnalysis, AnalysisStatus } from './types';
import { Loader2, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [analysisResult, setAnalysisResult] = useState<TCMAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<{base64: string, mimeType: string} | null>(null);

  const handleImageSelected = (base64: string, mimeType: string) => {
    setCurrentImage({ base64, mimeType });
    setAnalysisResult(null);
    setStatus(AnalysisStatus.IDLE);
    setErrorMsg(null);
  };

  const startAnalysis = async () => {
    if (!currentImage) return;

    setStatus(AnalysisStatus.ANALYZING);
    setErrorMsg(null);

    try {
      const result = await analyzeTongueImage(currentImage.base64, currentImage.mimeType);
      setAnalysisResult(result);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setStatus(AnalysisStatus.ERROR);
      setErrorMsg("分析失败，请稍后重试。可能图片不够清晰，或者服务暂时不可用。");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="space-y-8">
          
          {/* Introduction */}
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              探索你的身体语言
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              上传舌象照片，AI 将依据传统中医理论为您解析身体状况，提供个性化养生建议。
            </p>
          </div>

          {/* Upload Area */}
          <div className="max-w-xl mx-auto">
            <UploadSection 
              onImageSelected={handleImageSelected} 
              disabled={status === AnalysisStatus.ANALYZING}
            />
          </div>

          {/* Action Button */}
          {currentImage && status !== AnalysisStatus.SUCCESS && (
            <div className="flex justify-center animate-in fade-in duration-500">
              <button
                onClick={startAnalysis}
                disabled={status === AnalysisStatus.ANALYZING}
                className={`
                  relative overflow-hidden group
                  px-8 py-3.5 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all
                  ${status === AnalysisStatus.ANALYZING 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-tcm-700 to-tcm-600 text-white hover:-translate-y-0.5'
                  }
                `}
              >
                <div className="flex items-center gap-2 relative z-10">
                  {status === AnalysisStatus.ANALYZING ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>正在分析中 (Thinking)...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      <span>开始中医辨证</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          )}

          {/* Error Message */}
          {status === AnalysisStatus.ERROR && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-center max-w-xl mx-auto">
              {errorMsg}
            </div>
          )}

          {/* Results */}
          {status === AnalysisStatus.SUCCESS && analysisResult && (
             <ResultSection analysis={analysisResult} />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
