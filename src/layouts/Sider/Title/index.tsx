import React, { useContext } from 'react';
import { HEADER_HEIGHT } from '../../../config/style';
import { APPICON, APPNAME } from '../../../config/app';
import style from './index.module.scss';
import { observer } from 'mobx-react';
import { commonStore } from '../../../store/common.store';
import { LangContext } from '../../../context/index';
export const Title = observer(() => {
  const { t } = useContext(LangContext);
  return (
    <div className={style.title} style={{ height: HEADER_HEIGHT }}>
      <div className={style.icon}>
        <img src={APPICON} alt="" />
      </div>
      <div
        className={style.text}
        style={{ display: commonStore.isCollapsed ? 'none' : '' }}
      >
        <span>{t('title')}</span>
      </div>
    </div>
  );
});
