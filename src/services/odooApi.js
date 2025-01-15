import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

const BASE_URL = 'http://192.168.0.173:8017';
const DB_NAME = 'vpn';
const ADMIN_EMAIL = 'admin';
const ADMIN_PASSWORD = 'password';

export const jsonRpc = async (endpoint, params) => {
    const response = await axios.post(`${BASE_URL}${endpoint}`, {
        jsonrpc: '2.0',
        method: 'call',
        params: {
            ...params,
            db: DB_NAME,
            login: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        },
        id: Math.random().toString()
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.data.error) {
        throw new Error(response.data.error.data.message || 'Unknown error occurred');
    }

    return response.data;
};

export const setAuthToken = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};