import API from './api';

export const requestService = {
  createResourceRequest: async (data) => {
    const response = await API.post('/resource-requests', data);
    return response.data;
  },

  getResourceRequest: async (id) => {
    const response = await API.get(`/resource-requests/${id}`);
    return response.data;
  },

  updateResourceRequestStatus: async (id, status) => {
    const response = await API.put(`/resource-requests/${id}`, { status });
    return response.data;
  },

  cancelResourceRequest: async (id) => {
    const response = await API.delete(`/resource-requests/${id}`);
    return response.data;
  },

  createSkillRequest: async (data) => {
    const response = await API.post('/skill-requests', data);
    return response.data;
  },

  getSkillRequest: async (id) => {
    const response = await API.get(`/skill-requests/${id}`);
    return response.data;
  },

  updateSkillRequestStatus: async (id, status) => {
    const response = await API.put(`/skill-requests/${id}`, { status });
    return response.data;
  },

  cancelSkillRequest: async (id) => {
    const response = await API.delete(`/skill-requests/${id}`);
    return response.data;
  },

  getMyIncomingRequests: async () => {
    const response = await API.get('/my-requests');
    return response.data;
  },

  getMySentRequests: async () => {
    const response = await API.get('/my-sent-requests');
    return response.data;
  }
};
