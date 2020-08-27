import React from 'react';
import { observer } from 'mobx-react';
import {RouterHoc } from '../../router/routerHoc'
import './index.less';
export const Main = observer(() => {
  return (
    <div className="main">
      <RouterHoc/> 
    </div>
  );
});

