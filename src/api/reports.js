import api from "./axios";

export const reportsAPI = {
  getSummary: async (params = {}) => {
    const response = await api.get("/reports/summary", { params });
    return response.data;
  },

  getByCategory: async (params = {}) => {
    const response = await api.get("/reports/by-category", { params });
    return response.data;
  },

  getByDivision: async (params = {}) => {
    const response = await api.get("/reports/by-division", { params });
    return response.data;
  },

  getTrends: async (params = {}) => {
    const response = await api.get("/reports/trends", { params });
    return response.data;
  },
};
