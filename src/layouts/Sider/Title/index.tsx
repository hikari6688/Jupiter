import React from 'react';
import { HEADER_HEIGHT } from '../../../config/style';
import style from './index.module.scss'
import { observer } from 'mobx-react'
import icon from '../../../assets/img/logo192.png'
import { commonStore } from '../../../store/common.store'
export const Title = observer(() => {
  return <div className={ style.title } style={{ height: HEADER_HEIGHT }}> 
    <div className={ style.icon }>
      <img src={ icon } alt=""/>
    </div>
    <div className={ style.text } style={{ display:commonStore.isCollapsed?'none':'' }}>
      <span>React</span>
    </div>

   </div>;
});
