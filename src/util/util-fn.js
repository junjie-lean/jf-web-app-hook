/*
 * @Author: junjie.lean
 * @Date: 2021-11-15 12:31:36
 * @Last Modified by:   junjie.lean
 * @Last Modified time: 2021-11-15 12:31:36
 */

/**
 * @description 从url里取对应的get参数
 * @param { String } key
 * @return { String } key => value
 */
export const getQueryString = (key) => {
  const query = {};
  location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (query[k] = v));
  return query[key];
};

/**
 * @description 判断变量的数据类型
 * @param { Any } value
 * @return { String } any one of typeof(value)
 */
export const typeOfValue = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

/**
 * @description 使js解释器阻塞 {timer} 毫秒
 * @param { Number } timer
 * @return null
 */
export const sleep = (timer) => {
  const now = performance.now();
  while (performance.now() - now < timer) {}
};
