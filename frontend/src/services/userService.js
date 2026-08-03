import API from './api';

export const userService = {
  getProfile: async (id) => {
    const response = await API.get(`/users/${id}`);
    return response.data;
  },

  updateProfile: async (id, userData) => {
    const response = await API.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteAccount: async (id) => {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  },

  getUserResources: async (id) => {
    const response = await API.get(`/users/${id}/resources`);
    return response.data;
  },

  getUserSkills: async (id) => {
    const response = await API.get(`/users/${id}/skills`);
    return response.data;
  },

  getUserRatings: async (id) => {
    const response = await API.get(`/users/${id}/ratings`);
    return response.data;
  }
};
