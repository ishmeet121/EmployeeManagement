import { managerConstants } from "../_constants";

export function registration(state = {}, action) {
  switch (action.type) {
    case managerConstants.REGISTER_REQUEST:
      return { registering: true };
    case managerConstants.REGISTER_SUCCESS:
      return {};
    case managerConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}
