import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import DVUtils from 'shared/utils';

import { getCustomerScore } from './actions';

import './style.less';

class Scoring extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: DVUtils.EMPTY_STRING,
      address: DVUtils.EMPTY_STRING,
      postalCode: DVUtils.EMPTY_STRING,
      accountNumber: DVUtils.EMPTY_STRING,
      contactName: DVUtils.EMPTY_STRING,
    };

    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleGetScore = this.handleGetScore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      score: nextProps.score,
      errorMessage: nextProps.errorMessage,
    });
  }

  isValid() {
    return !_.isEmpty(this.state.name)
      && !_.isEmpty(this.state.address)
      && !_.isEmpty(this.state.postalCode)
      && !_.isEmpty(this.state.accountNumber)
      && !_.isEmpty(this.state.contactName);
  }

  handleGetScore() {
    if (!this.isValid()) {
      this.setState({ errorMessage: 'Please enter required fields' });
      return;
    }

    this.props.dispatch(getCustomerScore(_.omit(this.state, 'score', 'errorMessage')));
  }

  handlePropertyChange(event) {
    if (_.isEmpty(event.currentTarget.name)) {
      return;
    }

    const updateToState = { errorMessage: DVUtils.EMPTY_STRING };

    updateToState[event.currentTarget.name] = event.currentTarget.value;
    this.setState(updateToState);
  }

  render() {
    return (
      <div className="scoring-container">
        <div className="error-message">{ this.state.errorMessage }</div>
        <div className="form-group">
          <label className="control-label" htmlFor="name">
            Customer Name
            <input
              className="form-control"
              name="name"
              onChange={ this.handlePropertyChange }
              placeholder="Microsoft"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="address">
            House number and street
            <input className="form-control" name="address" onChange={ this.handlePropertyChange } />
          </label>
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="postalCode">
            Postal Code
            <input className="form-control" name="postalCode" onChange={ this.handlePropertyChange } />
          </label>
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="accountNumber">
            Reconciliation Account in GL
            <input className="form-control" name="accountNumber" onChange={ this.handlePropertyChange } />
          </label>
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="contactName">
            Contact name
            <input
              className="form-control"
              name="contactName"
              onChange={ this.handlePropertyChange }
              placeholder="Bill Gates"
            />
          </label>
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={ this.handleGetScore }>Get score</button>
          <label className="control-label score" htmlFor="score">
            Score:&nbsp;
            { this.state.score || DVUtils.EMPTY_STRING }
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  score: state.scoringReducer.score,
  errorMessage: state.scoringReducer.errorMessage,
});

export default connect(mapStateToProps)(Scoring);
