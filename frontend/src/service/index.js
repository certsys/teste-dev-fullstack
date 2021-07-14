import Interceptor from 'fetch-intercept'
import router from '../router'
import Config from '../config'

const baseURL = Config.BASE_API_URL;

const logout = function () {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
  router.push("/pages/login");
};

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
  logout: logout,
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
  getProperties: function (filter) {
    return fetch(baseURL + 'Property/getProperties/', {
      method: 'POST',
      body: JSON.stringify(filter)
    })
      .then(function (response) {
        if (response && response.status && response.status === 200) {
          return response.json();
        } else {
          return response.json().then(json => { return Promise.reject(json) });
        }
      })
  },
  searchCep: function (cep) {
    return fetch("https://viacep.com.br/ws/"+cep+"/json/", {
      method: 'GET',
      bypassInterceptor: true
    })
      .then(function (response) {
        if (response && response.status && response.status === 200) {
          return response.json();
        } else {
          return response.json().then(json => { return Promise.reject(json) });
        }
      });
  },
  registerProperty: function (propertyData) {
    return fetch(baseURL + 'Property/', {
      method: 'POST',
      body: JSON.stringify(propertyData)
    })
      .then(function (response) {
        if (response && response.status && response.status === 200) {
          return response.json();
        } else {
          return response.json().then(json => { return Promise.reject(json) });
        }
      })
  },
  editProperty: function (updateData) {
    return fetch(baseURL + 'Property/edit', {
      method: 'POST',
      body: JSON.stringify(updateData)
    })
      .then(function (response) {
        if (response && response.status && response.status === 200) {
          return response.json();
        } else {
          return response.json().then(json => { return Promise.reject(json) });
        }
      })
  },
  deleteProperty: function (propertyId) {
    return fetch(baseURL + 'Property/' + propertyId, {
      method: 'DELETE'
    }).then(function (response) {
      if (response && response.status && response.status === 200) {
        return response.json();
      } else {
        return response.json().then(json => { return Promise.reject(json) });
      }
    })
  },
  getUsers: function (filter) {
    return fetch(baseURL + 'User/getUsers/', {
      method: 'POST',
      body: JSON.stringify(filter)
    })
      .then(function (response) {
        if (response && response.status && response.status === 200) {
          return response.json();
        } else {
          return response.json().then(json => { return Promise.reject(json) });
        }
      })
  },
};