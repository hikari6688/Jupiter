import React from 'react';
import { HEADER_HEIGHT } from '../../../config/style';
import { APPICON, APPNAME } from '../../../config/app';
import style from './index.module.scss';
import { observer } from 'mobx-react';
import { commonStore } from '../../../store/common.store';
export const Title = observer(() => {
  return (
    <div className={style.title} style={{ height: HEADER_HEIGHT }}>
      <div className={style.icon}>
        <img src={APPICON} alt="" />
      </div>
      <div
        className={style.text}
        style={{ display: commonStore.isCollapsed ? 'none' : '' }}
      >
        <span>{APPNAME}</span>
      </div>
    </div>
  );
});
