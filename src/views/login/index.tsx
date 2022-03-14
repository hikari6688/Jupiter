import React from 'react';
import { Button } from 'antd';
import { router } from '../../store/router.store';
import { useHistory } from 'react-router';
import config from '../../config/index';
const Login = () => {
  const history = useHistory();
  const login = () => {
    router
      .getRoutes()
      .then((r) => {
        localStorage.setItem(config.tokenKey, 'THISISTHETOKENKEY');
        history.push('/system/app');
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Button onClick={login}>登陆</Button>
    </div>
  );
};
export default Login; 