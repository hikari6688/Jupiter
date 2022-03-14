import React, { useEffect } from 'react';
import { auth } from '../../store/auth.store';
export const AuthWrap = (props) => {
  const permission = props.auth;
  const authList = auth.authList;
  const hasAuth = authList.find((i) => {
    return i == permission;
  });
  return <div className="authGuard">{hasAuth ? props.children : ''}</div>;
};
