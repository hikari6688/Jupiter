const generalMenus = [
  {
    id: 15,
    parentId: 0,
    title: '首页',
    icon: 'el-icon-service',
    type: 1,
    isHide: false,
    permission: 'home',
    link: '',
    isBlank: false
  },
  {
    id: 40,
    parentId: 0,
    title: '医院信息管理',
    icon: 'el-icon-view',
    type: 1,
    isHide: false
  },
  {
    id: 55,
    parentId: 40,
    title: '医疗机构备案信息',
    icon: 'el-icon-view',
    type: 1,
    isHide: false,
    permission: 'hospital'
  },
  {
    id: 56,
    parentId: 40,
    title: '科目管理',
    icon: 'el-icon-view',
    type: 1,
    isHide: false,
    permission: 'subject'
  },
  {
    id: 41,
    parentId: 0,
    title: '科室管理',
    icon: 'el-icon-view',
    type: 1,
    isHide: false,
    permission: 'department'
  },{
    id: 42,
    parentId: 0,
    title: '医生管理',
    icon: 'el-icon-view',
    type: 1,
    isHide: false,
    permission: 'doctor'
  },{
    id: 43,
    parentId: 0,
    title: '排班信息管理',
    icon: 'el-icon-view',
    type: 1,
    isHide: false,
    permission: 'scheduling'
  },
  {
    id: 44,
    parentId: 0,
    title: '患者评价管理',
    icon: 'el-icon-view',
    type: 1,
    isHide: false,
    permission: 'patient'
  },
  {
    id: 1,
    parentId: 0, // 父级菜单ID
    title: '系统管理', // 菜单名称
    icon: 'el-icon-setting', // 图标
    permission: '', // 权限标识，注意并不一定和url对应,如果是按钮可在对应页面标识后再加上按钮标识，查询搜索：/search,新增：add,删除: /delete,修改：/update，其他可以根据实际情况添加
    type: 1, // 类型，1：路由，2：按钮
    isHide: false, // 是否在到导航中隐藏
    link: '', // 外部链接地址
    isBlank: false // 是否在新窗口打开外链，否则在iframe中打开
  },
  {
    id: 6,
    parentId: 1,
    title: '字典管理',
    icon: 'el-icon-edit-outline',
    isHide: false,
    permission: 'sys/dictionary',
    type: 1,
    link: '',
    isBlank: false
  },
  {
    id: 100,
    parentId: 6,
    title: '查询',
    permission: 'sys/dictionary/search'
  },{
    id: 101,
    parentId: 6,
    title: '新增',
    permission: 'sys/dictionary/add'
  },{
    id: 102,
    parentId: 6,
    title: '删除',
    permission: 'sys/dictionary/delete'
  },{
    id: 103,
    parentId: 6,
    title: '修改',
    permission: 'sys/dictionary/update'
  },
  {
    id: 7,
    parentId: 1,
    title: '登录日志',
    icon: 'el-icon-info',
    isHide: false,
    permission: 'sys/loginlog',
    type: 1,
    link: '',
    isBlank: false
  },
  {
    id: 104,
    parentId: 7,
    title: '查询',
    permission: 'sys/loginlog/search'
  },{
    id: 105,
    parentId: 7,
    title: '删除',
    permission: 'sys/loginlog/delete'
  },
  {
    id: 8,
    parentId: 1,
    title: '操作日志',
    icon: 'el-icon-info',
    isHide: false,
    permission: 'sys/actionlog',
    type: 1,
    link: '',
    isBlank: false
  },
  {
    id: 106,
    parentId: 8,
    title: '查询',
    permission: 'sys/actionlog/search'
  },{
    id: 107,
    parentId: 8,
    title: '删除',
    permission: 'sys/actionlog/delete'
  },
  {
    id: 9,
    parentId: 0,
    title: '系统监控',
    icon: 'el-icon-info',
    type: 1,
    isHide: false,
    permission: '',
    link: '',
    isBlank: false
  },
  {
    id: 10,
    parentId: 9,
    title: '数据监控',
    icon: 'el-icon-warning',
    type: 1,
    isHide: false,
    permission: 'monitor/data',
    link: 'http://127.0.0.1:8001/druid/login.html',
    isBlank: false
  },
  {
    id: 11,
    parentId: 9,
    title: '服务监控',
    icon: 'el-icon-view',
    type: 1,
    isHide: false,
    permission: 'monitor/service',
    link: 'http://127.0.0.1:8000/',
    isBlank: false
  },
  {
    id: 12,
    parentId: 0,
    title: '服务治理',
    icon: 'el-icon-service',
    type: 1,
    isHide: false,
    permission: '',
    link: '',
    isBlank: false
  },
  {
    id: 13,
    parentId: 12,
    title: '接口文档',
    icon: 'el-icon-view',
    type: 1,
    isHide: false,
    permission: 'service/doc',
    link: 'http://127.0.0.1:8500',
    isBlank: false
  },
  {
    id: 14,
    parentId: 12,
    title: '代码生成',
    icon: 'el-icon-view',
    type: 1,
    isHide: false,
    permission: 'service/code',
    link: 'http://127.0.0.1:8500',
    isBlank: false
  }
];
const superMenus = [...generalMenus,{
  id: 2,
  parentId: 1,
  title: '用户管理',
  icon: 'el-icon-service',
  type: 1,
  isHide: false,
  permission: 'sys/user',
  link: '',
  isBlank: false
},
{
  id: 3,
  parentId: 1,
  title: '机构管理',
  icon: 'el-icon-news',
  type: 1,
  isHide: false,
  permission: 'sys/org',
  link: '',
  isBlank: false
},
{
  id: 4,
  parentId: 1,
  title: '角色管理',
  icon: 'el-icon-view',
  type: 1,
  isHide: false,
  permission: 'sys/role',
  link: '',
  isBlank: false
},
{
  id: 5,
  parentId: 1,
  title: '菜单管理',
  icon: 'el-icon-menu',
  type: 1,
  isHide: false,
  permission: 'sys/menu',
  link: '',
  isBlank: false
  }];
const login = ({ body }) => {
    // 根据参数做验证
    return {
      code: 0,
      msg: '登录成功',
      data: {
        username: body.username,
        token: 11111111111,
        sex: 1,
        role: body.role
      }
    };
};
const menus = ({ query }) => {
  return {
    code: 0,
    msg: '登录成功',
    data: query.role === 'super' ? superMenus : generalMenus
  };
};
const list = {
  code: 0,
  msg: '',
  'data|10': [
    {
      id: '@increment',
      name: '@name',
      nickName: '@cname',
      deptName: '@ctitle',
      roleNames: '管理员',
      email: '@email',
      mobile: '@integer(11)',
      status: '启用'
    }
  ]
};
const info = {
  code: 0,
  msg: '',
  data: {
    id: '@id',
    name: '@cname',
    department: '中医内科',
    jibTitle: '主治医生',
    org: '互联网门诊',
    count: {
      sum: '@integer(0,10000)',
      score: '@float(0,5,0,2)',
      today: '@integer(0,200)',
      reservation: '@integer(0,200)'
    }
  }
};
module.exports = {
  'get|info': info,
  'post|login': login,
  'get|menus': menus,
  'get|list': list
};
