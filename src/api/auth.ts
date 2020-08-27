import { get, post } from '../util/request';
const prefix = '';
export default {
  login: (params) => post(`${prefix}/users/login`, params),
  getUserData:()=>get(`${prefix}/users/getLoginUserInfo`)
  // refreshToken: (params) => post(`${prefix}/sys/refresh_token`, params),
  // getMenus: () => get(`${prefix}/api-u/menus/me`)
};
