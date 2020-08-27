import React from 'react';
import { HEADER_HEIGHT } from '../../../config/style';
import './index.less'
import { observer } from 'mobx-react'
import icon from '../../../assets/img/logo192.png'
import { commonStore } from '../../../store/common.store'
export const Title = observer(() => {
  return <div className='title' style={{ height: HEADER_HEIGHT }}> 
    <div className='icon'>
      <img src={ icon } alt=""/>
    </div>
    <div className='text' style={{ display:commonStore.isCollapsed?'none':'' }}>
      <span>React</span>
    </div>

   </div>;
});
