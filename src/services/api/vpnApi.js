import axios from 'axios';

const BASE_URL = 'https://borderlessvpn.venihost.com.ng/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
      'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const vpnApi = {
  // Server endpoints
  getServers: () => api.get('/servers'),
  getServerDetails: (serverId) => api.get(`/servers/${serverId}`),
    
  // Connection endpoints
  getConnectionStatus: () => api.get('/connection/status'),
  connect: (serverId) => api.post('/connection/connect', { serverId }),
  disconnect: () => api.post('/connection/disconnect'),
    
  // Speed test endpoints
  getSpeedTest: () => api.get('/speed/test'),
    
  // User endpoints
  getUserProfile: () => api.get('/user/profile'),
  updateUserProfile: (data) => api.put('/user/profile', data),
    
  // Settings endpoints
  getSettings: () => api.get('/settings'),
  updateSettings: (settings) => api.put('/settings', settings),
};