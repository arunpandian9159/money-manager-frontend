import api from "./axios";

export const accountsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get("/accounts", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/accounts", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/accounts/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  },

  transfer: async (data) => {
    const response = await api.post("/accounts/transfer", data);
    return response.data;
  },

  getSummary: async () => {
    const response = await api.get("/accounts/summary");
    return response.data;
  },
};
