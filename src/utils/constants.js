export const THEME = {
    colors: {
      primary: '#4F46E5',
      secondary: '#6B7280',
      success: '#4CAF50',
      warning: '#FFC107',
      danger: '#EF4444',
      background: '#F3F4F6',
      white: '#FFFFFF',
      text: {
        primary: '#111827',
        secondary: '#6B7280',
      },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
  };
  
  export const VPN_PROTOCOLS = {
    UDP: 'UDP',
    TCP: 'TCP',
    IKEV2: 'IKEv2',
    OPENVPN: 'OpenVPN',
  };
  
  export const SERVER_REGIONS = {
    AMERICAS: 'Americas',
    EUROPE: 'Europe',
    ASIA_PACIFIC: 'Asia Pacific',
  };
  
  export const CONNECTION_STATES = {
    DISCONNECTED: 'disconnected',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTING: 'disconnecting',
  };
  
  export const STORAGE_KEYS = {
    AUTH_TOKEN: '@auth_token',
    USER_PREFERENCES: '@user_preferences',
    SELECTED_SERVER: '@selected_server',
    ONBOARDING_COMPLETED: '@onboarding_completed',
  };
  