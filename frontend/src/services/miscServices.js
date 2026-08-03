import API from './api';

export const messageService = {
  getChatHistory: async (requestId) => {
    const response = await API.get(`/messages/${requestId}`);
    return response.data;
  },

  sendMessage: async (messageData) => {
    const response = await API.post('/messages', messageData);
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await API.put(`/messages/${id}`);
    return response.data;
  },

  deleteMessage: async (id) => {
    const response = await API.delete(`/messages/${id}`);
    return response.data;
  }
};

export const ratingService = {
  postRating: async (ratingData) => {
    const response = await API.post('/ratings', ratingData);
    return response.data;
  },

  getUserRatings: async (userId) => {
    const response = await API.get(`/ratings/user/${userId}`);
    return response.data;
  },

  updateRating: async (id, ratingData) => {
    const response = await API.put(`/ratings/${id}`, ratingData);
    return response.data;
  },

  deleteRating: async (id) => {
    const response = await API.delete(`/ratings/${id}`);
    return response.data;
  }
};

export const adminService = {
  getUsers: async () => {
    const response = await API.get('/admin/users');
    return response.data;
  },

  getResources: async () => {
    const response = await API.get('/resources');
    return response.data.content || response.data;
  },

  suspendUser: async (userId) => {
    const response = await API.delete(`/admin/users/${userId}`);
    return response.data;
  },

  deletePost: async (postId) => {
    const response = await API.delete(`/resources/${postId}`);
    return response.data;
  },

  getStatistics: async () => {
    const response = await API.get('/admin/stats');
    return response.data;
  }
};
