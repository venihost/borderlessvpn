const ENV = {
  dev: {
    apiUrl: 'https://borderlessvpn.venihost.com.ng/api/v1',
    timeout: 10000,
  },
  staging: {
    apiUrl: 'https://borderlessvpn.venihost.com.ng/api/v1',
    timeout: 10000,
  },
  prod: {
    apiUrl: 'https://borderlessvpn.venihost.com.ng/api/v1',
    timeout: 10000,
  },
};

const getEnvironment = () => {
  return ENV.prod; // Set to production by default
};

export const apiConfig = {
  ...getEnvironment(),
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  },
  errorMessages: {
      network: 'Network error occurred',
      server: 'Server error occurred', 
      unauthorized: 'Unauthorized access',
      timeout: 'Request timeout',
  },
  endpoints: {
      auth: {
          login: '/auth/login',
          register: '/auth/register',
          logout: '/auth/logout',
          refresh: '/auth/refresh',
      },
      vpn: {
          servers: '/servers',
          connect: '/connection/connect',
          disconnect: '/connection/disconnect',
          status: '/connection/status',
      },
      user: {
          profile: '/user/profile',
          settings: '/user/settings',
      },
  },
};
