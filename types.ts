export interface TCMAnalysis {
  visualFeatures: {
    color: string;
    shape: string;
    coating: string;
    moisture: string;
  };
  diagnosis: {
    mainSyndrome: string;
    explanation: string;
  };
  recommendations: {
    dietary: string[];
    lifestyle: string[];
    herbalIngredients: string[]; // Common food-grade herbs
  };
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
