export const ODOO_CONFIG = {
  HOST: 'http://192.168.0.252',
  PORT: '8017',
  DATABASE: 'vpn',
  USERNAME: 'admin', // Your admin username
  PASSWORD: 'password', // Your admin password
  JSONRPC_PATH: '/jsonrpc',
};
export class OdooApi {
  constructor(config = ODOO_CONFIG) {
    this.host = config.HOST;
    this.port = config.PORT;
    this.db = config.DATABASE;
    this.username = config.USERNAME;
    this.password = config.PASSWORD;
    this.uid = null;
    this.baseURL = `${this.host}:${this.port}`;
  }

  async authenticate() {
    try {
      const response = await fetch(`${this.baseURL}${ODOO_CONFIG.JSONRPC_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'common',
            method: 'authenticate',
            args: [this.db, this.username, this.password, {}],
          },
          id: Math.floor(Math.random() * 1000000),
        }),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      
      this.uid = result.result;
      return this.uid;
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  async searchRead(model, params) {
    try {
      const response = await fetch(`${this.baseURL}${ODOO_CONFIG.JSONRPC_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'object',
            method: 'execute_kw',
            args: [
              this.db,
              this.uid,
              this.password,
              model,
              'search_read',
              [params.domain || []],
              {
                fields: params.fields || [],
                offset: params.offset || 0,
                limit: params.limit || false,
                order: params.order || '',
              },
            ],
          },
          id: Math.floor(Math.random() * 1000000),
        }),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.result;
    } catch (error) {
      throw new Error(`Search_read failed: ${error.message}`);
    }
  }

  async create(model, values) {
    try {
      const response = await fetch(`${this.baseURL}${ODOO_CONFIG.JSONRPC_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'object',
            method: 'execute_kw',
            args: [this.db, this.uid, this.password, model, 'create', [values]],
          },
          id: Math.floor(Math.random() * 1000000),
        }),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.result;
    } catch (error) {
      throw new Error(`Create failed: ${error.message}`);
    }
  }

  async write(model, id, values) {
    try {
      const response = await fetch(`${this.baseURL}${ODOO_CONFIG.JSONRPC_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'object',
            method: 'execute_kw',
            args: [this.db, this.uid, this.password, model, 'write', [[id], values]],
          },
          id: Math.floor(Math.random() * 1000000),
        }),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.result;
    } catch (error) {
      throw new Error(`Write failed: ${error.message}`);
    }
  }
}

export const odooApi = new OdooApi(ODOO_CONFIG);