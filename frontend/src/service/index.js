import Interceptor from 'fetch-intercept'
import router from '../router'
import Config from '../config'

const baseURL = Config.BASE_API_URL;

export default {
  name: 'service',
  unregister: Interceptor.register({

    request: function (url, config) {

      if (config && config.bypassInterceptor)
        return [url, config];

      if (!config) {
        config = {
          headers: new Headers()
        }
      } else if (!config.headers) {
        config.headers = new Headers();
      }

      if (localStorage.token) {
        config.headers.append('Authorization', "Bearer " + localStorage.token);
      }

      if (config.method && config.method == 'POST') {
        config.headers.append('Content-Type', "application/json");
      }

      return [url, config];
    },
    requestError: function (error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },
    response: function (response) {
      if (response.status == 401) {
        logout();
      } else {
        return response;
      }

    },
    responseError: function (error) {
      return Promise.reject(error);
    }
  }),
  login: function (signinData) {
    return fetch(baseURL + 'User/auth', {
      method: 'POST',
      body: JSON.stringify(signinData)
    })
      .then(function (response) {
        if (response && response.status && response.status === 200) {
          return response.json();
        } else {
          return Promise.reject();
        }
      })
  },
  logout: function () {
    return fetch(baseURL + 'auth', {
      method: 'DELETE'
    })
      .then(function (response) {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        router.push("/pages/login");
        if (response && response.status && response.status === 200) {
          return response.json();
        } else {
          return Promise.reject();
        }
      })
  },
  register: function (signupData) {
    return fetch(baseURL + 'User', {
      method: 'POST',
      body: JSON.stringify(signupData)
    })
      .then(function (response) {
        if (response && response.status && response.status === 200) {
          return response.json();
        } else {
          return response.json().then(json => { return Promise.reject(json) });
        }
      })
  },
  getMe: function () {
    return fetch(baseURL + "User/me").then(function (response) {
      if (response && response.status && response.status === 200) {
        return response.json();
      } else {
        return Promise.reject();
      }
    });
  },
};