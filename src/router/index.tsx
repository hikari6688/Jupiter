import React from 'react';
import { BaseLayout } from '../layouts/baseLayout';
import Login from '../views/login/index';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

export const RouterMap = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={BaseLayout} />
      </Switch>
    </Router>
  );
};
