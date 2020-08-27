import React from 'react';
import { Header } from './Header/index';
import { Main } from './Main/index';
import { Sider } from './Sider/index';
import './baseLayout.less';

export const BaseLayout = (props) => {
  return (
    <div className="baseLayout">
      <div className="left">
        <Sider />
      </div>
      <div className="right">
        <div className="headerWrap">
          <Header />
        </div>
        <div className="mainWrap">
          <Main />
        </div>
      </div>
    </div>
  );
};
