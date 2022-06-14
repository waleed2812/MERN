import BaseApiManager from "./BaseApiManager";
import { apiURL } from "./config";

export class APIManager {
  /* ---------------------------------- Auth ---------------------------------- */
  async register(params: string) {
    const obj = new BaseApiManager();
    const response = await obj.post(apiURL + "/register", params);
    return response;
  }

  async login(params: string) {
    const obj = new BaseApiManager();
    const response = await obj.post(apiURL + "/login", params);
    return response;
  }

  async logout() {
    const obj = new BaseApiManager();
    const response = await obj.delete(apiURL + "/logout");
    return response;
  }
}

export default APIManager;
