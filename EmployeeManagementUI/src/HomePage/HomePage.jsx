import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { managerActions } from "../_actions";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getAllEmployee();
  }

  handleDeleteEmployee(id) {
    return e => this.props._deleteEmployee(id);
  }

  render() {
    const { manager, employees } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {manager.firstname}!</h1>

        <h3>Employee List:</h3>
        {manager.loading && <em>Loading Employees...</em>}
        {manager.error && (
          <span className="text-danger">ERROR: {manager.error}</span>
        )}
        {employees && (
          <ul>
            {employees.map((employee, index) => (
              <li key={employee.id}>
                {employee.firstname + " " + employee.lastname}
                {employee.deleting ? (
                  <em> - Deleting...</em>
                ) : employee.deleteError ? (
                  <span className="text-danger">
                    {" "}
                    - ERROR: {employee.deleteError}
                  </span>
                ) : (
                  <span>
                    {" "}
                    -{" "}
                    <a onClick={this.handleDeleteEmployee(employee.id)}>
                      Delete
                    </a>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapState(state) {
  const { manager } = state.authentication;
  const { employees } = state.manager;
  return { manager, employees };
}

const actionCreators = {
  getAllEmployee: managerActions.getAllEmployee,
  _deleteEmployee: managerActions._deleteEmployee
};

const connectedHomePage = connect(
  mapState,
  actionCreators
)(HomePage);
export { connectedHomePage as HomePage };
