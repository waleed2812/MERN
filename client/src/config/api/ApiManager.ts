import BaseApiManager from "./BaseApiManager";
import { apiURL } from "./config";

export class APIManager {

  /* ---------------------------------- Auth ---------------------------------- */
  async register(params: string) {
    try {
      const obj = new BaseApiManager();
      const response = await obj.post(apiURL + '/user/register', params);
      return response;
    } catch (err: any) {
      return !!err?.response?.data ? err?.response?.data : err;
    }
  }

  async login(params: string) {
    try {
      const obj = new BaseApiManager();
      const response = await obj.post(apiURL + '/user/login', params);
      return response;
    } catch (err: any) {
      return !!err?.response?.data ? err?.response?.data : err;
    }
  }

  async logout() {
    try {
      const obj = new BaseApiManager();
      const response = await obj.delete(apiURL + '/user/logout');
      return response;
    } catch (err: any) {
      return !!err?.response?.data ? err?.response?.data : err;
    }
  }


}

export default APIManager;