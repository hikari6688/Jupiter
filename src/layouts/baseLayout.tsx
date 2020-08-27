import React from 'react';
import { Header } from './Header/index';
import { Main } from './Main/index';
import { Sider } from './Sider/index';
import style from './baseLayout.module.scss'

export const BaseLayout = (props) => {
  return (
    <div className={ style.baseLayout }>
      <div className={ style.left }>
        <Sider />
      </div>
      <div className={ style.right }>
        <div className={ style.headerWrap }>
          <Header />
        </div>
        <div className={ style.mainWrap }>
          <Main />
        </div>
      </div>
    </div>
  );
};
