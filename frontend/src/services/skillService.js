import API from './api';

export const skillService = {
  getAll: async (params) => {
    const response = await API.get('/skills', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await API.get(`/skills/${id}`);
    return response.data;
  },

  create: async (skillData) => {
    const response = await API.post('/skills', skillData);
    return response.data;
  },

  update: async (id, skillData) => {
    const response = await API.put(`/skills/${id}`, skillData);
    return response.data;
  },

  delete: async (id) => {
    const response = await API.delete(`/skills/${id}`);
    return response.data;
  },

  search: async (query) => {
    const response = await API.get('/skills/search', { params: { q: query } });
    return response.data;
  }
};
