import { managerConstants } from "../_constants";

let manager = JSON.parse(sessionStorage.getItem("manager"));
const initialState = manager ? { loggedIn: true, manager: manager } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case managerConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        manager: action.manager
      };
    case managerConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        manager: action.manager
      };
    case managerConstants.LOGIN_FAILURE:
      return {};
    case managerConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
