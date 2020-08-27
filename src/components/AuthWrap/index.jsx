import React, { useEffect } from 'react';
import { auth } from '../../store/auth.store';
export const AuthWrap = (props) => {
  const permission = props.auth;
  const authList = auth.authList;
  const checkAuth = authList.some((i) => {
    return i == permission;
  });
  return (
    <div
      className="authGuard"
      style={{ display: checkAuth ? 'block' : 'none' }}
    >
      {props.children}
    </div>
  );
};
