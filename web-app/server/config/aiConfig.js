// AI Service Configuration
export const aiConfig = {
  planswift: {
    apiKey: process.env.PLANSWIFT_API_KEY,
    endpoint: process.env.PLANSWIFT_ENDPOINT || 'https://api.planswift.com/v1/estimate',
  },
  costX: {
    apiKey: process.env.COSTX_API_KEY,
    endpoint: process.env.COSTX_ENDPOINT || 'https://api.costx.com/v2/boq',
  },
  cubit: {
    apiKey: process.env.CUBIT_API_KEY,
    endpoint: process.env.CUBIT_ENDPOINT || 'https://api.cubit.com/v3/takeoff',
  },
  localAI: {
    endpoint: process.env.LOCAL_AI_ENDPOINT || 'http://localhost:8000/process',
  }
};

export const getAIService = (serviceName) => {
  return aiConfig[serviceName] || aiConfig.localAI;
};