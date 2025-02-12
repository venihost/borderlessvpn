import { NativeEventEmitter, NativeModules } from 'react-native';
import { OdooApi } from '../../constants/odooapi2';

const { OpenVPNModule } = NativeModules;
const vpnEventEmitter = new NativeEventEmitter(OpenVPNModule);

class VPNService {
  constructor() {
    this.odooApi = new OdooApi();
    this.connectionState = null;
  }

  async initialize() {
    await this.odooApi.authenticate();
    this.setupEventListeners();
  }

  setupEventListeners() {
    vpnEventEmitter.addListener('vpnStateChanged', (state) => {
      this.connectionState = state;
    });
  }

  async getVpnConfig(serverId) {
    const params = {
      domain: [['id', '=', serverId]],
      fields: ['name', 'config_file', 'username', 'password']
    };
    
    const result = await this.odooApi.searchRead('vpn.server', params);
    return result[0];
  }

  async connect(serverId) {
    const serverConfig = await this.getVpnConfig(serverId);
    return await OpenVPNModule.connect(
      serverConfig.config_file,
      serverConfig.username,
      serverConfig.password
    );
  }

  async disconnect() {
    return await OpenVPNModule.disconnect();
  }

  async getStatus() {
    return await OpenVPNModule.getStatus();
  }
}

export const vpnService = new VPNService();
