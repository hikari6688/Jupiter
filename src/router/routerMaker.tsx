import { ComponentsMap } from './map';
import React from 'react';
import { Route } from 'react-router-dom';
import { ROUTER_MAP } from './router';
export const RouterMaker = (routes: ROUTER_MAP[]): React.Component => {
  const makeRoutes = (routes: ROUTER_MAP[]) => {
    return routes.map((i) => {
      const { children, name, path, exact, component } = i;
      if (children && children.length) {
        return makeRoutes(children);
      }
      return (
        <Route
          key={name}
          path={path}
          exact={exact}
          component={ComponentsMap[component]}
        />
      );
    });
  };
  return makeRoutes(routes);
};
