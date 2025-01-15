import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#4F46E5',
    secondary: '#6B7280',
    success: '#4CAF50',
    warning: '#FFC107',
    danger: '#EF4444',
    info: '#3B82F6',
    
    background: {
      primary: '#FFFFFF',
      secondary: '#F3F4F6',
      gradient: ['#1a237e', '#0d47a1'],
    },
    
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      inverse: '#FFFFFF',
    },
    
    border: {
      primary: '#E5E7EB',
      secondary: '#D1D5DB',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
    },
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: Platform.select({
    ios: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    },
    android: {
      sm: {
        elevation: 2,
      },
      md: {
        elevation: 5,
      },
    },
  }),
};
