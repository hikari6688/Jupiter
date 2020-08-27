import React, { useEffect } from 'react';
import { RouterMaker } from './makeRoutes';
import { router } from '../store/router.store';
import { Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useHistory,useLocation } from 'react-router';
import nprogress from '../util/nprogress';
export const RouterHoc = observer(() => {
  const history = useHistory();
  const location=useLocation();
  useEffect(() => {
    nprogress.start();
    nprogress.done();
    //没有token 回登陆页面
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      history.replace('/login');
    }
    //如果没路由 拉取权限路由
    if (!router.routes || !router.routes.length) {
      router.getRoutes();
    }
  }, [location.pathname]);
  return (
    <Switch>{(router.routes && RouterMaker(router.routes)) || null}</Switch>
  );
});
