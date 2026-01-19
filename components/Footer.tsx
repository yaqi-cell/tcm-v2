import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 text-sm">
          <AlertTriangle className="shrink-0 mt-0.5" size={18} />
          <div>
            <p className="font-semibold mb-1">免责声明 (Disclaimer)</p>
            <p className="opacity-90">
              本应用提供的分析结果基于人工智能模型，仅供健康参考，不能替代专业医生的诊断和治疗。
              如果您有身体不适，请务必前往正规医院就诊。
              <br/>
              The analysis provided by this AI is for reference only and does not constitute medical advice. 
              Please consult a qualified physician for any health concerns.
            </p>
          </div>
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">
          Powered by Gemini 3 Pro
        </p>
      </div>
    </footer>
  );
};

export default Footer;
