import React from 'react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Header from 'common/header/component';
import Login from 'app/login/component';
import Search from 'app/search/component';
import Scoring from 'app/scoring/component';

import headerConfig from './config/header';
import './style.less';

const App = () => {
  return (
    <div className="page">
      <Header { ...headerConfig } />
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/search" component={ Search }/>
        <Route path="/score" component={ Scoring }/>
        <Redirect path="*" to="/search" />
      </Switch>
    </div>
  );
};

export default withRouter(connect()(App));
