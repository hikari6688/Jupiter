export interface ROUTER_MAP {
  title: string; //路由名[菜单展示]
  path: string; //路由地址
  name: string; //路由名[标识]
  redirect?: string; //重定向地址
  exact?: boolean; //路由匹配规则
  icon?: string; //菜单图标
  showMenu?: boolean; // 展示||隐藏 菜单
  component?: string; // 组件MAP_KEY
  children?: ROUTER_MAP[]; //子组件
}
