import { ROUTER_MAP } from '../router/router';

//判断item和item的children中是否存在路径为path的路由
function deepScan(item: ROUTER_MAP, path: string): boolean {
  if (item.path === path) {
    return true;
  }
  if (item.children && item.children.length) {
    return item.children.some((i) => {
      return deepScan(i, path);
    });
  }
}

//用于页面左侧菜单组件[判断当前路由和目录的匹配关系]
export const beneath = (routes: ROUTER_MAP[], path: string) => {
  return routes.filter((item) => {
    return deepScan(item, path);
  });
};

export const getRouteByPath = (
  routes: ROUTER_MAP[],
  path: string
): ROUTER_MAP => {
  // 根据当前path寻找路由route
  for (let item of routes) {
    if (item.path === path) {
      return item;
    }
    if (item.children) {
      const r = getRouteByPath(item.children, path);
      if (r) return r;
    }
  }
};

export function getDisplay(routes: ROUTER_MAP[]): ROUTER_MAP[] {
  //当前菜单下是否存在要显示的字菜单(比如路由的新增组件并不会出现在左侧的菜单上面)
  return routes.filter((item) => {
    return item.showMenu;
  });
}
