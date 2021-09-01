import React, { useContext } from 'react';
import style from './index.module.scss';
import { commonStore } from '../../store/common.store';
import { Button, Dropdown, Menu, Select } from 'antd';
import { HEADER_HEIGHT } from '../../config/style';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import avatar from '../../assets/img/cat.png';
import { ThemeContext, LangContext } from '../../context/index';
import { ThemeEnum } from '../../config/enum';
const { Option } = Select;

export const Header = observer(() => {
  const theme = useContext(ThemeContext);
  const { t, setLang, lang } = useContext(LangContext);
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
  const handleChange = (v) => {
    theme.setTheme(v);
  };
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
        {/* <div className={style.theme}>
          <Select
            size="middle"
            defaultValue={theme.theme}
            style={{ width: 80 }}
            onChange={handleChange}
          >
            <Option value={ThemeEnum.light}>浅色</Option>
            <Option value={ThemeEnum.dark}>深色</Option>
          </Select>
        </div> */}
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
