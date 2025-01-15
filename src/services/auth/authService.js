import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';
import { vpnApi, setAuthToken } from '../api/vpnApi';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await vpnApi.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      setAuthToken(token);
      
      return user;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await vpnApi.post('/auth/register', userData);
      const { token, user } = response.data;
      
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      setAuthToken(token);
      
      return user;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  logout: async () => {
    try {
      await vpnApi.post('/auth/logout');
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      setAuthToken(null);
    } catch (error) {
      throw new Error('Logout failed');
    }
  },

  checkAuthStatus: async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        setAuthToken(token);
        const user = await vpnApi.get('/user/profile');
        return user.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
};
