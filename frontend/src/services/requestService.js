import API from './api';

export const requestService = {
  createResourceRequest: async (data) => {
    const userStr = localStorage.getItem('user');
    let requesterId = null;
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        requesterId = u.id || u.userId;
      } catch (e) {}
    }
    const payload = { ...data, requesterId };
    const response = await API.post('/resource-requests', payload);
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
    const userStr = localStorage.getItem('user');
    let learnerId = null;
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        learnerId = u.id || u.userId;
      } catch (e) {}
    }
    const payload = { ...data, learnerId };
    const response = await API.post('/skill-requests', payload);
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

  getMyIncomingRequests: async (userId) => {
    const userStr = localStorage.getItem('user');
    let uId = userId;
    if (!uId && userStr) {
      try {
        const u = JSON.parse(userStr);
        uId = u.id || u.userId;
      } catch (e) {}
    }
    const response = await API.get(uId ? `/my-requests?userId=${uId}` : '/my-requests');
    return response.data;
  },

  getMySentRequests: async (userId) => {
    const userStr = localStorage.getItem('user');
    let uId = userId;
    if (!uId && userStr) {
      try {
        const u = JSON.parse(userStr);
        uId = u.id || u.userId;
      } catch (e) {}
    }
    const response = await API.get(uId ? `/my-sent-requests?userId=${uId}` : '/my-sent-requests');
    return response.data;
  }
};
