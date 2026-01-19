import React from 'react';
import { Activity, Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-tcm-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-tcm-500 p-2 rounded-lg text-white">
            <Leaf size={24} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-gray-900 tracking-wide">
              AI 中医舌诊
            </h1>
            <p className="text-xs text-gray-500">Traditional TCM Tongue Analysis</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-sm text-tcm-700 font-medium">
          <Activity size={16} />
          <span>Professional AI Analysis</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
