import { Platform } from 'react-native';
import { vpnApi } from '../api/vpnApi';
import { CONNECTION_STATES } from '../../utils/constants';

export const vpnService = {
  currentState: CONNECTION_STATES.DISCONNECTED,
  selectedServer: null,

  initialize: async () => {
    try {
      const status = await vpnApi.getConnectionStatus();
      vpnService.currentState = status.state;
      vpnService.selectedServer = status.server;
      return status;
    } catch (error) {
      throw new Error('VPN initialization failed');
    }
  },

  connect: async (server) => {
    try {
      vpnService.currentState = CONNECTION_STATES.CONNECTING;
      await vpnApi.connect(server.id);
      vpnService.currentState = CONNECTION_STATES.CONNECTED;
      vpnService.selectedServer = server;
      return true;
    } catch (error) {
      vpnService.currentState = CONNECTION_STATES.DISCONNECTED;
      throw new Error('VPN connection failed');
    }
  },

  disconnect: async () => {
    try {
      vpnService.currentState = CONNECTION_STATES.DISCONNECTING;
      await vpnApi.disconnect();
      vpnService.currentState = CONNECTION_STATES.DISCONNECTED;
      vpnService.selectedServer = null;
      return true;
    } catch (error) {
      throw new Error('VPN disconnection failed');
    }
  },

  getSpeedTest: async () => {
    try {
      const speedTest = await vpnApi.getSpeedTest();
      return speedTest.data;
    } catch (error) {
      throw new Error('Speed test failed');
    }
  },

  getConnectionInfo: () => {
    return {
      state: vpnService.currentState,
      server: vpnService.selectedServer,
      platform: Platform.OS,
    };
  },
};
