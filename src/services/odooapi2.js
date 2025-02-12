export const ODOO_BASE_URL = 'https://borderlessvpn.venihost.com.ng';

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
