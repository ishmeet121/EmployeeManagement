import config from "config";
import { authHeader } from "../_helpers";

export const managerService = {
  login,
  logout,
  registerManager,
  getAllEmployee,
  updateEmployee,
  _deleteEmployee
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${config.apiUrl}/manager/auth`, requestOptions)
    .then(handleResponse)
    .then(manager => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      sessionStorage.setItem("manager", JSON.stringify(manager));

      return manager;
    });
}

function logout() {
  // remove user from local storage to log user out
  sessionStorage.removeItem("manager");
}

function getAllEmployee() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  const manager = JSON.parse(sessionStorage.getItem("manager"));
  return fetch(
    `${config.apiUrl}/manager/getemp/${manager.id}`,
    requestOptions
  ).then(handleResponse);
}

function registerManager(manager) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(manager)
  };

  return fetch(`${config.apiUrl}/manager/register`, requestOptions).then(
    handleResponse
  );
}

function updateEmployee(employee) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(employee)
  };

  return fetch(
    `${config.apiUrl}/manager/updemp/${employee.id}`,
    requestOptions
  ).then(handleResponse);
}

function _deleteEmployee(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/manager/delemp/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
