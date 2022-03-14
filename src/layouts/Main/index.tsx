import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { RouterHoc } from '../../router/routerConf';
import style from './index.module.scss';
import { ThemeContext } from '../../context/index';
export const Main = observer(() => {
  const theme = useContext(ThemeContext);
  useEffect(() => {
    console.log(theme.theme);
  }, [theme.theme]);
  return (
    <div className={style.main}>
      <RouterHoc />
    </div>
  );
});
