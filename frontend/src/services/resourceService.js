import API from './api';

export const resourceService = {
  getAll: async (params) => {
    const response = await API.get('/resources', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await API.get(`/resources/${id}`);
    return response.data;
  },

  create: async (resourceData) => {
    const response = await API.post('/resources', resourceData);
    return response.data;
  },

  update: async (id, resourceData) => {
    const response = await API.put(`/resources/${id}`, resourceData);
    return response.data;
  },

  delete: async (id) => {
    const response = await API.delete(`/resources/${id}`);
    return response.data;
  },

  search: async (query) => {
    const response = await API.get('/resources/search', { params: { q: query } });
    return response.data;
  }
};
