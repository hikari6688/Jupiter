import { toJS } from 'mobx';



function deepScan(item, path) {
  //扫描当前项是否能匹配到当前路由
  if (item.path === path) {
    return true;
  }
  if (item.children && item.children.length) {
    return item.children.some((i) => {
      return deepScan(i, path);
    });
  }
}

export const getMapByPath = (routes, path) => {
  //路由表父级第一层对象是否包含当前path的页面模块(用于在刷新时自动打开menu菜单)
  return routes.filter((item) => {
    return deepScan(item, path);
  });
};


export const getRouteByPath = (routes, path) => {
  // 根据当前path寻找路由对象
  for (let item of routes) {
    if (item.path === path) {
      return item;
    }
    if (item.children) {
      const r = getRouteByPath(item.children, path);
      if (r) {
        return r;
      }
    }
  }
};

export const scanRoute = (route, path) => {
  //扫描当前节点的子节点是否和当前path匹配
  if (route.children) {
    for (let item of route.children) {
      if (item.path === path) {
        return true;
      }
    }
  }
};

export const findParentByPath = (routes, path) => {
  //遍历路由表
  const matchSet = [];
  for (let item of routes) {
    const r = scanRoute(item, path);
    if (r) {
      // return item;
      matchSet.push(item);
      console.log(toJS([matchSet]));
      findParentByPath(routes, item.path);
    }
    if (!r && item.children) {
      findParentByPath(item.children, path);
    }
  }

  // //根据当前路径寻找父级节点
  // var parentRoute = {};
  // for (var item of routes) {
  //   if ((item.children && item, item.children.length)) {
  //     var r = item.children.filter((i) => {
  //       return (i.path = path);
  //     });
  //     if (r && r.length) {
  //       console.log(r);
  //       // parentRoute = r[0];
  //     }
  //   }
  // }
  // return parentRoute;
};

export const getMacthBypath = (p, c) => {
  //获取当前路由能匹配上的所有上级路由 p=>顶级父对象 c=>当前节点路由对象
  const currentPath = c.path; //当前路由的pathname
};


export function showedItem(routes) {
  //当前菜单下是否存在要显示的字菜单(比如路由的新增组件并不会出现在左侧的菜单上面)
  return routes.filter((item) => {
    return item.showMenu;
  });
}