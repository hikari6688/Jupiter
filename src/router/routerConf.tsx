import React, { useEffect } from 'react';
import { RouterMaker } from './routerMaker';
import { router } from '../store/router.store';
import { Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router';
import nprogress from '../util/nprogress';
import config from '../config/index';
export const RouterHoc = observer(() => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    nprogress.done();
    const token: string = localStorage.getItem(config.tokenKey);
    if (!token) history.replace('/login');
    if (!router.routes || !router.routes.length) {
      router.getRoutes();
    }
    return () => {
      nprogress.start();
    };
  }, [location.pathname]);
  return (
    <Switch>
      <React.Suspense fallback>
        {(router.routes && RouterMaker(router.routes)) || null}
      </React.Suspense>
    </Switch>
  );
});
