import React from 'react';
import { observer } from 'mobx-react';
import {RouterHoc } from '../../router/routerHoc'
import style from './index.module.scss'
export const Main = observer(() => {
  return (
    <div className={ style.main }>
      <RouterHoc/> 
    </div>
  );
});

