import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { SIDEBAR_WIDTH } from '../../config/style';
import * as Icons from '@ant-design/icons';
import { commonStore } from '../../store/common.store';
import { router } from '../../store/router.store';
import { Title } from './Title/index';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import style from './index.module.scss';
import { beneath, getDisplay, getRouteByPath } from '../../util/router';
import { ROUTER_MAP } from '../../router/router';
const { SubMenu } = Menu;
const MenuItem = Menu.Item;

export const Sider = observer(() => {
  const makeMenuTree = function (menu: ROUTER_MAP[]) {
    if (!menu || !Array.isArray(menu) || !menu.length) {
      return null;
    }
    return menu.map((root) => {
      if (root.children) {
        const r = getDisplay(root.children);
        if (r && r.length) {
          return (
            <SubMenu
              key={root.path}
              title={
                <span>
                  {root.icon && React.createElement(Icons[root.icon])}
                  <span>{root.title}</span>
                </span>
              }
            >
              {makeMenuTree(r)}
            </SubMenu>
          );
        } else {
          return (
            <MenuItem key={root.name}>
              <Link to={root.path}>
                {root.icon && React.createElement(Icons[root.icon])}
                <span>{root.title}</span>
              </Link>
            </MenuItem>
          );
        }
      }
      return (
        <MenuItem key={root.name}>
          <Link to={root.path}>
            {root.icon && React.createElement(Icons[root.icon])}
            <span>{root.title}</span>
          </Link>
        </MenuItem>
      );
    });
  };

  const location = useLocation();
  const [opened, setOpened] = useState([]);
  const [active, setActive] = useState([]);
  const makeStatus = () => {
    if (router.routes.length) {
      const parent = beneath(router.routes, location.pathname)[0];
      const current = getRouteByPath(router.routes, location.pathname);
      parent&&setOpened([parent.path] || []);
      current&&setActive([current.name] || []);
    }
  };
  useEffect(() => {
    makeStatus();
  }, [router.routes]);

  useEffect(() => {
    if (commonStore.isCollapsed) {
      setOpened([]);
    } else {
      makeStatus();
    }
  }, [commonStore.isCollapsed]);

  const makeOpen = (e) => {
    setOpened(e);
  };
  const makeActive = (e) => {
    setActive(e);
  };

  return (
    <div
      className={style.side}
      style={{
        width: commonStore.isCollapsed ? SIDEBAR_WIDTH[1] : SIDEBAR_WIDTH[0],
      }}
    >
      <Title />

      <Menu
        onOpenChange={(e) => {
          makeOpen(e);
        }}
        onClick={(e) => {
          makeActive([e.key]);
        }}
        openKeys={commonStore.isCollapsed ? [] : opened}
        selectedKeys={active}
        mode="inline"
        theme="dark"
        inlineCollapsed={commonStore.isCollapsed}
      >
        {makeMenuTree(router.routes)}
      </Menu>
    </div>
  );
});
