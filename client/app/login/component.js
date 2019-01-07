import _ from 'underscore';
import urlParser from 'url-parse';
import DVUtils from 'shared/utils';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from './actions';

import './style.less';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = _.extend({
      email: DVUtils.EMPTY_STRING,
      password: DVUtils.EMPTY_STRING,
    }, props.user);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (_.isObject(nextProps.user) && !_.isEmpty(nextProps.user.id)) {
      const currentUrl = urlParser(window.location.href);
      window.location.href = currentUrl.query.redirect || DVUtils.SEARCH_PATH;
      return;
    }

    this.setState({ errorMessage: nextProps.errorMessage });
  }

  isValid() {
    return DVUtils.isEmailValid(this.state.email) && this.isPasswordValid();
  }

  isPasswordValid() {
    return !_.isEmpty(this.state.password);
  }

  handlePropertyChange(propertyName, event) {
    const updateToState = { errorMessage: DVUtils.EMPTY_STRING };
    updateToState[propertyName] = event.currentTarget.value;
    this.setState(updateToState);
  }

  handleSubmit() {
    if (!this.isValid()) {
      this.setState({ errorMessage: 'Please enter email and password' });
      return;
    }

    this.props.dispatch(login(this.state.email, this.state.password));
  }

  render() {
    return (
      <div className="login-container">
        <div className="error-message">{ this.state.errorMessage }</div>
        <h2 className="text-center">Log in</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={ this.state.email }
            onChange={ this.handlePropertyChange.bind(this, 'email') }
            data-valid={ DVUtils.isEmailValid(this.state.email) }
            required="required"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={ this.state.password }
            onChange={ this.handlePropertyChange.bind(this, 'password') }
            data-valid={ this.isPasswordValid() }
            required="required"
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={ this.handleSubmit }
            className="btn btn-primary btn-block"
          >
            Log in
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.loginReducer.user || {},
  errorMessage: state.loginReducer.errorMessage,
});

export default connect(mapStateToProps)(Login);
