import { GoogleGenAI, Type } from "@google/genai";
import { TCMAnalysis } from "../types";

export const analyzeTongueImage = async (base64Image: string, mimeType: string): Promise<TCMAnalysis> => {
  // 每次调用时初始化以获取最新的 API KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const modelId = "gemini-3-pro-preview";
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image,
              },
            },
            {
              text: `你是一位资深的中医专家。请分析这张舌像照片，并根据中医理论提供详细解读。
              
              要求：
              1. 识别舌色、舌形、苔质、津液。
              2. 给出具体的中医辨证（体质或证型）。
              3. 提供具体的饮食建议、生活起居建议和食疗方。
              4. 所有描述请使用专业且通俗易懂的简体中文。
              
              请直接返回符合以下结构的 JSON：
              {
                "visualFeatures": { "color": "...", "shape": "...", "coating": "...", "moisture": "..." },
                "diagnosis": { "mainSyndrome": "...", "explanation": "..." },
                "recommendations": { "dietary": ["...", "..."], "lifestyle": ["...", "..."], "herbalIngredients": ["...", "..."] }
              }`,
            },
          ],
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            visualFeatures: {
              type: Type.OBJECT,
              properties: {
                color: { type: Type.STRING },
                shape: { type: Type.STRING },
                coating: { type: Type.STRING },
                moisture: { type: Type.STRING },
              },
              required: ["color", "shape", "coating", "moisture"],
            },
            diagnosis: {
              type: Type.OBJECT,
              properties: {
                mainSyndrome: { type: Type.STRING },
                explanation: { type: Type.STRING },
              },
              required: ["mainSyndrome", "explanation"],
            },
            recommendations: {
              type: Type.OBJECT,
              properties: {
                dietary: { type: Type.ARRAY, items: { type: Type.STRING } },
                lifestyle: { type: Type.ARRAY, items: { type: Type.STRING } },
                herbalIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["dietary", "lifestyle", "herbalIngredients"],
            },
          },
          required: ["visualFeatures", "diagnosis", "recommendations"],
        },
        thinkingConfig: { thinkingBudget: 1024 },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("未能从 Gemini 获取到分析结果");
    }

    return JSON.parse(text) as TCMAnalysis;
  } catch (error) {
    console.error("Gemini 舌象分析出错:", error);
    throw error;
  }
};