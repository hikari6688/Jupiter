import React, { useContext } from 'react';
import { Header } from './Header/index';
import { Main } from './Main/index';
import { Sider } from './Sider/index';
import style from './baseLayout.module.scss';
import { ThemeContext } from '../context/index';
export const BaseLayout = () => {
  const theme = useContext(ThemeContext);
  return (
    <div className={style.baseLayout} data-theme={theme.theme}>
      <div className={`${style.left}`}>
        <Sider />
      </div>
      <div className={style.right}>
        <div className={style.headerWrap}>
          <Header />
        </div>
        <div className={style.mainWrap}>
          <Main />
        </div>
      </div>
    </div>
  );
};
