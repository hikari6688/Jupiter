/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-08-24 11:31:29
 * @LastEditors: Bwrong
 * @LastEditTime: 2020-08-24 15:19:34
 */
export const setSession = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key,value)
};
export const getSession = (key: string) => {
  let value = localStorage.getItem(key)||''
  return value.match(/^[{[]/) ? JSON.parse(value) : value;
};
export const removeSession = (key: string) => localStorage.removeItem(key);
export const clearSession = () => localStorage.clear();
export const keySession = (index: number) => localStorage.key(index);
