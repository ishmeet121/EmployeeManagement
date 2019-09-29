import { managerConstants } from "../_constants";
import { managerService } from "../_services";
import { alertActions } from ".";
import { history } from "../_helpers";

export const managerActions = {
  login,
  logout,
  registerManager,
  getAllEmployee,
  _deleteEmployee
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    managerService.login(email, password).then(
      manager => {
        dispatch(success(manager));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(manager) {
    return { type: managerConstants.LOGIN_REQUEST, manager };
  }
  function success(manager) {
    return { type: managerConstants.LOGIN_SUCCESS, manager };
  }
  function failure(error) {
    return { type: managerConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  managerService.logout();
  return { type: managerConstants.LOGOUT };
}

function registerManager(manager) {
  return dispatch => {
    dispatch(request(manager));

    managerService.registerManager(manager).then(
      manager => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(manager) {
    return { type: managerConstants.REGISTER_REQUEST, manager };
  }
  function success(manager) {
    return { type: managerConstants.REGISTER_SUCCESS, manager };
  }
  function failure(error) {
    return { type: managerConstants.REGISTER_FAILURE, error };
  }
}

function getAllEmployee() {
  return dispatch => {
    dispatch(request());

    managerService
      .getAllEmployee()
      .then(
        employees => dispatch(success(employees)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return { type: managerConstants.GETALL_REQUEST };
  }
  function success(employees) {
    return { type: managerConstants.GETALL_SUCCESS, employees };
  }
  function failure(error) {
    return { type: managerConstants.GETALL_FAILURE, error };
  }
}

function _deleteEmployee(id) {
  return dispatch => {
    dispatch(request(id));

    managerService
      ._deleteEmployee(id)
      .then(
        manager => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) {
    return { type: managerConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: managerConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: managerConstants.DELETE_FAILURE, id, error };
  }
}
