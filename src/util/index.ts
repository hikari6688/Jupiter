import dayjs from 'dayjs';
import md5 from 'crypto-js/md5';
import { SEX } from '../config/dictionary';
/**
 * 格式化时间
 * @param {*} value
 * @param {*} type
 */
export function fomartTime(
  value: string | number,
  type = 'YYYY-MM-DD HH:mm:ss'
) {
  return value ? dayjs(Number(value)).format(type) : '';
}
// 性别
export function sexFormat(value: string | number) {
  return SEX[value] || '';
}
/**
 * 获取URL中的参数名及参数值的集合
 * @param {[string]} url [当该参数不为空的时候，则解析该url中的参数集合]
 * @return {[string]}       [参数集合]
 */
export function getQuery(url: string) {
  if (url.indexOf('?') === -1) return {};
  let query: any = {};
  let str = url.split('?')[1];
  let strs = str.split('&');
  for (let i = 0; i < strs.length; i++) {
    query[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
  }
  return query;
}
/**
 * 密码加密加盐
 * @param {*} password 要加密的密码
 * @param {*} cryptoKey 盐
 */
export function cryptoPassword(password: string, cryptoKey: string) {
  return md5(`${cryptoKey}-${password}`).toString();
}



