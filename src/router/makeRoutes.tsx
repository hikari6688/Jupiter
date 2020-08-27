import { ComponentsMap } from './map';
import React, { useEffect } from 'react';
import { toJS } from 'mobx'
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';

export const RouterMaker = (_routes:Array<any>) => {
  const makeRoutes = (routes) => {
    return routes.map((i) => {
      if (i.children) {
        return makeRoutes(i.children);
      }
      return <Route key={i.name} path={i.path} exact={i.exact} component={ComponentsMap[i.component]} />;
    });
  };
  return makeRoutes(_routes);
};