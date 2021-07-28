/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-08-24 11:31:16
 * @LastEditors: Bwrong
 * @LastEditTime: 2020-08-25 09:52:36
 */

import axios,{ CancelToken, AxiosResponse, AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';
import Cookie from 'js-cookie';
import appConfig from '../config';
import auth from '../api/auth';
const env = process.env;
const IS_PRODUCTION = env.NODE_ENV === 'production';
const baseURL = IS_PRODUCTION ? env.VUE_APP_API_HOST : env.VUE_APP_API_ROOT;
// HTTP状态码
export const HTTP_CODE = {
  400: '请求参数错误',
  401: '未授权, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  409: '请求发生冲突',
  410: '请求的资源已删除',
  413: '请求体过大，服务器无法处理',
  414: '请求url过长',
  415: '不支持的媒体类型',
  429: '请求次数超过限制',
  500: '服务器端内部错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网络错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
};
const PRE_TIME = 1800000; // 提前多久更新token,单位毫秒
let refreshDoing = false; // 刷新token加锁
let reqCache = new Map(); // 请求暂存列表，列表中的请求会被取消
const request:AxiosInstance = axios.create({
  timeout: 30000,
  baseURL,
  // responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});


// axios request拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
   // 设置cancelToken对象，阻止重复请求。当上个请求未完成时，相同的请求不会进行
  //  config.cancelToken = new axios.CancelToken((cancel) => _addRequest(reqCache, config, cancel));
   // 处理token
   const token = Cookie.get(appConfig.tokenKey);
   if (!token) return config;
   config.headers['Authorization'] = token;
  //  const tokenExpires = Cookie.get(appConfig.tokenExpiresKey);
   // token即将过期，刷新token
  //  if (Number(tokenExpires) - Date.now() < PRE_TIME && !(config as any).$noRefresh && !refreshDoing) {
  //    refreshDoing = true; // 加锁，防止重复刷新
  //    const refreshToken = Cookie.get(appConfig.refreshTokenKey);
  //    _handleRefreshToken(refreshToken).then(() => (refreshDoing = false));
  //  }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
// axios  respone拦截器，统一处理响应错误
request.interceptors.response.use(
  ({ config, data }:AxiosResponse) => {
    // 增加延迟，相同请求不得在短时间内重复发送
    _removeRequest(reqCache, config);
    if (data.code === 200 || data.code === 0) {
      return Promise.resolve(data.data || []);
    } else {
      const msg = data.message || data.msg;
      console.log(msg)
      return Promise.reject(data.msg);
    }
  },
  (error:AxiosError) => {
    if (axios.isCancel(error)) return Promise.reject(error)
    // 相同请求不得在短时间内重复发送
    _removeRequest(reqCache, error.config);
    if (error.response) {
      if (error.response.status === 401) {
        console.log('登录失效，请重新登录')
        // logout()
      } else {
        const tips = error.response.data.message || HTTP_CODE[error.response.status];
        console.log(tips)
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(new Error('请求超时, 请刷新重试'));
    }
  }
);
export default request;

/**
 * 刷新token
 * @param {string} refreshToken
 */
function _handleRefreshToken(refreshToken:string) {
  return new Promise((resolve, reject) => {
    // auth.refreshToken({ refresh_token: refreshToken })
    // .then((res:AxiosResponse) => {
    //   Cookie.set(appConfig.tokenKey, res.data.access_token);
    //   Cookie.set(appConfig.refreshTokenKey, res.data.refresh_token);
    //   Cookie.set(appConfig.tokenExpiresKey, Date.now() + res.data.expires_in * 1000);
    //   resolve();
    // }).catch(reject);
  });
}
/**
 * 添加请求到暂存列表
 * @param {object} reqList - 请求缓存列表
 * @param {object} config 当前请求配置
 * @param {function} cancel - 请求中断函数
 */
function _addRequest(reqList: Map<String, Boolean>, config:AxiosRequestConfig, cancel:Function) {
  const key = _generateKey(config);
  reqList.has(key) ? cancel('请求被取消,config:', config) : reqList.set(key, true);
}
/**
 * 从暂存列表删除请求，即释放拦截
 * @param {object} reqList 全部请求列表
 * @param {object} config 当前请求配置
 * @param {number} time 阻止时间
 */
function _removeRequest(reqList: Map<String, Boolean>, config:AxiosRequestConfig, time = 500) {
  const key = _generateKey(config);
  setTimeout(() => reqList.delete(key), time);
}
/**
 * 生成存储的key
 * @param {object} config
 */
function _generateKey({ method, url, params }:AxiosRequestConfig) {
  const paramsStr = JSON.stringify(params);
  return `${method}-${url}-${paramsStr}`;
}
