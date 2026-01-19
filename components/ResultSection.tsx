import React from 'react';
import { TCMAnalysis } from '../types';
import { CheckCircle2, Droplets, Palette, Search, Utensils, Zap, Sprout } from 'lucide-react';

interface ResultSectionProps {
  analysis: TCMAnalysis;
}

const ResultSection: React.FC<ResultSectionProps> = ({ analysis }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Visual Analysis Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <FeatureCard 
          icon={<Palette size={18} />} 
          title="舌色" 
          value={analysis.visualFeatures.color} 
          color="bg-red-50 text-red-700 border-red-100"
        />
        <FeatureCard 
          icon={<Search size={18} />} 
          title="舌形" 
          value={analysis.visualFeatures.shape}
          color="bg-orange-50 text-orange-700 border-orange-100"
        />
        <FeatureCard 
          icon={<Zap size={18} />} 
          title="苔质" 
          value={analysis.visualFeatures.coating}
          color="bg-yellow-50 text-yellow-700 border-yellow-100"
        />
        <FeatureCard 
          icon={<Droplets size={18} />} 
          title="津液" 
          value={analysis.visualFeatures.moisture}
          color="bg-blue-50 text-blue-700 border-blue-100"
        />
      </div>

      {/* Main Diagnosis */}
      <div className="bg-white rounded-2xl shadow-sm border border-tcm-200 overflow-hidden">
        <div className="bg-tcm-50 border-b border-tcm-100 px-6 py-4">
          <h3 className="text-tcm-800 font-serif text-lg font-bold flex items-center gap-2">
            <CheckCircle2 size={20} className="text-tcm-600" />
            辨证结果 (Diagnosis)
          </h3>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-tcm-600 text-white text-sm font-medium rounded-full mb-2">
              {analysis.diagnosis.mainSyndrome}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {analysis.diagnosis.explanation}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Diet & Herbs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-serif text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Utensils size={20} className="text-orange-500" />
            饮食调理 (Diet)
          </h3>
          <ul className="space-y-3">
            {analysis.recommendations.dietary.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
             <h4 className="font-serif text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
               <Sprout size={18} className="text-green-600" />
               推荐食疗 (Herbs)
             </h4>
             <div className="flex flex-wrap gap-2">
                {analysis.recommendations.herbalIngredients.map((herb, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-md text-xs font-medium">
                    {herb}
                  </span>
                ))}
             </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-serif text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ActivityIcon />
            起居建议 (Lifestyle)
          </h3>
          <ul className="space-y-3">
            {analysis.recommendations.lifestyle.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-tcm-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper components
const FeatureCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => (
  <div className={`p-4 rounded-xl border ${color} flex flex-col items-center text-center`}>
    <div className="mb-2 opacity-80">{icon}</div>
    <div className="text-xs font-medium opacity-70 mb-1">{title}</div>
    <div className="font-bold text-sm leading-tight">{value}</div>
  </div>
);

const ActivityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tcm-600">
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

export default ResultSection;
