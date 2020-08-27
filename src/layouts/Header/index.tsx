import React from 'react';
import style from './index.module.scss'
import { commonStore } from '../../store/common.store';
import { Button, Dropdown, Menu } from 'antd';
import { HEADER_HEIGHT } from '../../config/style'
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import avatar from '../../assets/img/cat.png';
export const Header = observer(() => {
  const history = useHistory();
  const toggleCollapsed = () => {
    commonStore.setCollapsed();
  };
  const logout = () => {
    setTimeout(() => {
      history.push('/login');
    }, 1000);
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">查看消息</Menu.Item>
      <Menu.Item key="1">重置密码</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={ style.header } style={{ height:HEADER_HEIGHT }}>
      <div className={  style.btn }>
        <Button type="primary" onClick={toggleCollapsed}>
          {React.createElement(commonStore.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
      </div>
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <div className={  style.avatar }>
          <img src={avatar} alt="" />
        </div>
      </Dropdown>
    </div>
  );
});
