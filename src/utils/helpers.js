import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const getLoadColor = (load) => {
  if (load < 50) return '#4CAF50';
  if (load < 80) return '#FFC107';
  return '#F44336';
};

export const formatSpeed = (speed) => {
  if (speed >= 1000) {
    return `${(speed / 1000).toFixed(1)} Gbps`;
  }
  return `${speed.toFixed(1)} Mbps`;
};

export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height >= 812 || width >= 812)
  );
};

export const getStatusBarHeight = () => {
  return Platform.select({
    ios: isIphoneX() ? 44 : 20,
    android: 24,
    default: 0,
  });
};
