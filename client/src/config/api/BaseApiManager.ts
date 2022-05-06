export class BaseApiManager {
  async delete(url: string) {
    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    };

    const finalURL = url;
    console.log("finalURL", finalURL);
    try {
      return await fetch(finalURL, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        });
    } catch (error) {
      console.error("BaseAPI Manager Post Method Exception: ", error);
      return error;
    }
  }

  async put(url: string, parameters: string) {
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: parameters,
    };

    const finalURL = url;
    console.log("finalURL", finalURL);
    console.log("Data to be Posted in Server: ", parameters);
    try {
      return await fetch(finalURL, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        });
    } catch (error) {
      console.error("BaseAPI Manager Post Method Exception: ", error);
      return error;
    }
  }

  async putFormData(url: string, parameters: FormData) {
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      body: parameters,
    };

    const finalURL = url;
    console.log("finalURL", finalURL);
    console.log("Data to be Posted in Server: ", parameters);
    try {
      return await fetch(finalURL, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        });
    } catch (error) {
      console.error("BaseAPI Manager Post Method Exception: ", error);
      return error;
    }
  }

  async postFormData(url: string, parameters: FormData) {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      body: parameters,
    };

    const finalURL = url;
    console.log("finalURL", finalURL);
    console.log("Data to be Posted in Server: ", parameters);
    try {
      return await fetch(finalURL, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        });
    } catch (error) {
      console.error("BaseAPI Manager Post Method Exception: ", error);
      return error;
    }
  }

  async post(url: string, parameters: string) {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: parameters,
    };

    const finalURL = url;
    console.log("finalURL", finalURL);
    console.log("Data to be Posted in Server: ", parameters);
    try {
      return await fetch(finalURL, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        });
    } catch (error) {
      console.error("BaseAPI Manager Post Method Exception: ", error);
      return error;
    }
  }

  async get(url: string) {
    const requestOptions: RequestInit = {
      method: "get",
      headers: { Accept: "application/json" },
      credentials: "include",
    };
    const finalURL = url;
    console.log("finalURL", finalURL);
    try {
      return await fetch(finalURL, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        });
    } catch (error) {
      console.error("BaseAPI Manager Get Method Exception: ", error);
      return error;
    }
  }
}

export default BaseApiManager;