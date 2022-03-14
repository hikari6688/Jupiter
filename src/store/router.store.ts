import { observable, action } from 'mobx';
import { ROUTER_MAP } from '../router/router';

class Router {
  @observable
  routes: ROUTER_MAP[] = [];

  @action
  getRoutes(): Promise<ROUTER_MAP[]> {
    return new Promise((resolve, reject) => {
      //发送请求
      const res: ROUTER_MAP[] = [
        {
          title: '系统设置',
          path: '/system',
          name: 'system',
          redirect: '/system/app',
          exact: false,
          icon: 'TwitterOutlined',
          children: [
            {
              title: '应用管理',
              path: '/system/app',
              name: 'app',
              icon: 'GitlabOutlined',
              component: 'App',
              showMenu: true,
            },
          ],
        },
        {
          title: '权限管理',
          path: '/auth',
          name: 'auth',
          exact: false,
          icon: 'RedditOutlined',
          children: [
            {
              title: '机构管理',
              exact: false,
              path: '/auth/org/list',
              name: 'org',
              showMenu: true,
              icon: 'GitlabOutlined',
              children: [
                {
                  title: '机构列表',
                  exact: true,
                  showMenu: false,
                  path: '/auth/org/list',
                  name: 'orgList',
                  icon: 'gitlaboutlined',
                  component: 'Org',
                },
                {
                  title: '添加机构',
                  exact: true,
                  showMenu: false,
                  path: '/auth/org/add',
                  name: 'orgAdd',
                  icon: 'gitlaboutlined',
                  component: 'OrgAdd',
                },
                {
                  title: '修改机构',
                  exact: true,
                  showMenu: false,
                  path: '/auth/org/update',
                  name: 'orgUpdate',
                  icon: 'gitlaboutlined',
                  component: 'OrgUpdate',
                },
              ],
            },
          ],
        },
      ];
      setTimeout(() => {
        this.setRoutes(res);
        resolve(res);
      }, 200);
    });
  }

  @action
  setRoutes(data: ROUTER_MAP[]): void {
    this.routes = data;
  }
}
export const router = new Router();
