export class BaseApiManager {
  async delete(url: string) {
    let session = localStorage.getItem("session");
    if (session) {
      session = JSON.parse(session).auth_token;
    }
    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: session || "",
      },
    };
    const finalURL = url;
    console.log("finalURL", finalURL);
    const response = await fetch(finalURL, requestOptions);
    const responseJSON = await response.json();
    console.log("responseJSON", responseJSON);
    return responseJSON;
  }

  async put(url: string, parameters: string) {
    let session = localStorage.getItem("session");
    if (session) {
      session = JSON.parse(session).auth_token;
    }
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: session || "",
      },
      body: parameters,
    };
    const finalURL = url;
    console.log("finalURL", finalURL);
    console.log("Data to be Posted in Server: ", parameters);
    const response = await fetch(finalURL, requestOptions);
    const responseJSON = await response.json();
    console.log("responseJSON", responseJSON);
    return responseJSON;
  }

  async putFormData(url: string, parameters: FormData) {
    let session = localStorage.getItem("session");
    if (session) {
      session = JSON.parse(session).auth_token;
    }
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        authorization: session || "",
      },
      body: parameters,
    };
    const finalURL = url;
    console.log("finalURL", finalURL);
    console.log("Data to be Posted in Server: ", parameters);
    const response = await fetch(finalURL, requestOptions);
    const responseJSON = await response.json();
    console.log("responseJSON", responseJSON);
    return responseJSON;
  }

  async postFormData(url: string, parameters: FormData) {
    let session = localStorage.getItem("session");
    if (session) {
      session = JSON.parse(session).auth_token;
    }
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        authorization: session || "",
      },
      body: parameters,
    };
    const finalURL = url;
    console.log("finalURL", finalURL);
    console.log("Data to be Posted in Server: ", parameters);

    const response = await fetch(finalURL, requestOptions);
    const responseJSON = await response.json();
    console.log("responseJSON", responseJSON);
    return responseJSON;
  }

  async post(url: string, parameters: string) {
    let session = localStorage.getItem("session");
    if (session) {
      session = JSON.parse(session).auth_token;
    }
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: session || "",
      },
      body: parameters,
    };
    const finalURL = url;
    console.log("requestOptions", requestOptions);
    console.log("finalURL", finalURL);
    console.log("Data to be Posted in Server: ", parameters);
    const response = await fetch(finalURL, requestOptions);
    const responseJSON = await response.json();
    console.log("responseJSON", responseJSON);
    return responseJSON;
  }

  async get(url: string) {
    let session = localStorage.getItem("session");
    if (session) {
      session = JSON.parse(session).auth_token;
    }
    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        authorization: session || "",
      },
    };
    const finalURL = url;
    console.log("finalURL", finalURL);
    const response = await fetch(finalURL, requestOptions);
    const responseJSON = await response.json();
    console.log("responseJSON", responseJSON);
    return responseJSON;
  }
}

export default BaseApiManager;
