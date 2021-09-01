import React, { useContext, useState } from 'react';
import style from './index.module.scss';
import { commonStore } from '../../store/common.store';
import { Button, Dropdown, Menu, Badge, Select } from 'antd';
import { HEADER_HEIGHT } from '../../config/style';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SettingOutlined,
  LockOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import avatar from '../../assets/img/cat.png';
import { ThemeContext, LangContext } from '../../context/index';
import { ThemeEnum } from '../../config/enum';

const { Option } = Select;
export const Header = observer(() => {
  const { t, setLang, lang } = useContext(LangContext);
  const { theme, setTheme } = useContext(ThemeContext);
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
      <Menu.Item key="0">
        <SettingOutlined />
        系统设置
      </Menu.Item>
      <Menu.Item key="1">
        <LockOutlined />
        重置密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>
        <LogoutOutlined /> 退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={style.header} style={{ height: HEADER_HEIGHT }}>
      <div className={style.btn}>
        <Button type="primary" onClick={toggleCollapsed}>
          {React.createElement(
            commonStore.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
      </div>
      <div className={style.rightWrap}>
        <Select
          defaultValue={lang}
          onChange={(v) => {
            setLang(v);
          }}
          size="small"
          style={{ width: '100px', marginRight: '12px' }}
        >
          <Option value="zh">中文</Option>
          <Option value="en">English</Option>
          <Option value="jp">日本語</Option>
        </Select>
        <Select
          defaultValue={theme}
          onChange={(v) => {
            setTheme(v);
          }}
          size="small"
          style={{ marginRight: '12px' }}
        >
          <Option value="light">浅色</Option>
          <Option value="dark">深色</Option>
        </Select>
        <div className={style.message}>
          <Badge count={5} overflowCount={99}>
            <BellOutlined />
          </Badge>
        </div>
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <div className={style.avatar}>
            <img src={avatar} alt="" />
            <span>izumi</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
});
