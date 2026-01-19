import React, { useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon, X } from 'lucide-react';

interface UploadSectionProps {
  onImageSelected: (base64: string, mimeType: string, previewUrl: string) => void;
  disabled: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelected, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    // Basic validation
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      
      // Extract base64 data (remove data:image/xxx;base64, prefix)
      const base64Data = result.split(',')[1];
      onImageSelected(base64Data, file.type, result);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // We could notify parent to clear, but parent usually drives state based on analysis status
  };

  const triggerUpload = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={disabled}
      />

      {!preview ? (
        <div 
          onClick={triggerUpload}
          className={`
            border-2 border-dashed rounded-2xl p-8 sm:p-12 transition-all cursor-pointer text-center group
            ${disabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' : 'border-tcm-300 hover:border-tcm-500 hover:bg-tcm-50 bg-white'}
          `}
        >
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-tcm-100 text-tcm-600 group-hover:scale-110 transition-transform'}`}>
              <Camera size={32} />
            </div>
          </div>
          <h3 className="text-lg font-serif font-medium text-gray-900 mb-2">
            拍照或上传舌像
          </h3>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            请在自然光下拍摄，伸出舌头，放松，确保舌体清晰完整。
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-white border border-gray-200 text-gray-700 shadow-sm'}`}>
              <Upload size={16} /> 选择图片
            </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
          <img 
            src={preview} 
            alt="Tongue Preview" 
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          
          {!disabled && (
            <button 
              onClick={clearImage}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full text-gray-700 shadow-md backdrop-blur-sm transition-all"
              title="Remove image"
            >
              <X size={20} />
            </button>
          )}
          
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
            <ImageIcon size={14} />
            <span>待分析图像</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
