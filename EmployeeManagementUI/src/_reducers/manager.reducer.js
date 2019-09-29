import { managerConstants } from "../_constants";

export function manager(state = {}, action) {
  switch (action.type) {
    case managerConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case managerConstants.GETALL_SUCCESS:
      return {
        employees: action.employees
      };
    case managerConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case managerConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.id ? { ...employee, deleting: true } : employee
        )
      };
    case managerConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        employees: state.employees.filter(employee => employee.id !== action.id)
      };
    case managerConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(employee => {
          if (employee.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...employeeCopy } = employee;
            // return copy of user with 'deleteError:[error]' property
            return { ...employeeCopy, deleteError: action.error };
          }

          return employeeCopy;
        })
      };
    default:
      return state;
  }
}
