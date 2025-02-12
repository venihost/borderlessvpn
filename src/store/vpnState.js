import { create } from 'zustand';
import { vpnService } from '../services/vpn/openVpnService';

export const useVpnStore = create((set) => ({
  isConnected: false,
  currentServer: null,
  connectionState: null,
  
  connect: async (serverId) => {
    try {
      await vpnService.connect(serverId);
      set({ isConnected: true, currentServer: serverId });
    } catch (error) {
      throw error;
    }
  },
  
  disconnect: async () => {
    try {
      await vpnService.disconnect();
      set({ isConnected: false, currentServer: null });
    } catch (error) {
      throw error;
    }
  },
  
  updateState: (state) => {
    set({ connectionState: state });
  }
}));
