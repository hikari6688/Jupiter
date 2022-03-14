/*
 * @Author: Bwrong
 * @Github: https://github.com/BWrong
 * @Date: 2020-07-17 15:45:43
 * @LastEditors: Bwrong
 * @LastEditTime: 2020-08-24 11:33:47
 */

/**
 * 校验一般的字符
 * @param {*} hasCh 是否包含中文
 * @param {*} hasEn 是否包含英文
 * @param {*} hasNum 是否包含数字
 * @param {*} otherChar 需要包含的其他特殊字符
 */
export function validateNormalChar(value='', hasCh = true, hasEn = true, hasNum = true, otherChar = '') {
  const reg = new RegExp(`^[${hasCh ? '\\u4e00-\\u9fa5' : ''}${hasEn ? 'a-zA-Z' : ''}${hasNum ? '\\d' : ''}${otherChar}]*$`);
  return reg.test(value)
}
