import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { managerActions } from "../_actions";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      manager: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { manager } = this.state;
    this.setState({
      manager: {
        ...manager,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { manager } = this.state;
    if (
      manager.firstname &&
      manager.lastname &&
      manager.email &&
      manager.password
    ) {
      this.props.registerManager(manager);
    }
  }

  render() {
    const { registering } = this.props;
    const { manager, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" +
              (submitted && !manager.firstname ? " has-error" : "")
            }
          >
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={manager.firstname}
              onChange={this.handleChange}
            />
            {submitted && !manager.firstname && (
              <div className="help-block">First Name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !manager.lastname ? " has-error" : "")
            }
          >
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={manager.lastname}
              onChange={this.handleChange}
            />
            {submitted && !manager.lastname && (
              <div className="help-block">Last Name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !manager.email ? " has-error" : "")
            }
          >
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={manager.email}
              onChange={this.handleChange}
            />
            {submitted && !manager.email && (
              <div className="help-block">Email is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !manager.password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={manager.password}
              onChange={this.handleChange}
            />
            {submitted && !manager.password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  registerManager: managerActions.registerManager
};

const connectedRegisterPage = connect(
  mapState,
  actionCreators
)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
