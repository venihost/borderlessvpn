// export const ODOO_BASE_URL = 'http://192.168.0.176:8017';
export const ODOO_BASE_URL = 'http://192.168.0.159:8017';

export const API_ENDPOINTS = {
  REGISTER: '/api/v1/vpn/register',
  LOGIN: '/api/v1/vpn/login',
  PROFILE: '/api/v1/vpn/profile',
  SERVERS: '/api/v1/vpn/servers',
};

export const apiRequest = async (endpoint, method = 'POST', data = null) => {
  const response = await fetch(`${ODOO_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data ? new URLSearchParams(data).toString() : null,
  });

  const responseText = await response.text();
  try {
    return JSON.parse(responseText);
  } catch {
    if (responseText.includes('success')) {
      return { success: true };
    }
    throw new Error(responseText || 'Server error');
  }
};