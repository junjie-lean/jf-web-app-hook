/*
 * @Author: junjie.lean
 * @Date: 2021-11-15 12:31:36
 * @Last Modified by:   junjie.lean
 * @Last Modified time: 2021-11-15 12:31:36
 */

/**
 * @description axios 单后台请求方式封装
 */

import axios from 'axios';
import _ from 'lodash';

/**
 * 数据请求相关配置
 */
let axiosIns;
let opts = {};

/**
 * 请求数据服务
 * @param {String} method 请求的方法
 * @param {JSON} params 提交参数
 */
export const request = (
  method,
  params,
  success = () => {},
  fail = () => {},
  isBlob
) => {
  if (method) {
    let postData = {
      data: params || {},
      token: opts.token || '',
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (isBlob) {
      config.responseType = 'blob';
    }
    const ajaxObj = axiosIns.post(
      `/${method}`,
      `${JSON.stringify(postData)}`,
      config
    );
    ajaxObj
      .then((response) => {
        if (typeof success === 'function') {
          success(response.data);
        }
      })
      .catch((err) => {
        if (typeof fail === 'function') {
          fail({ code: err.code, msg: err.message });
        } else {
          console.log('request fail');
        }
      });
    return ajaxObj;
  } else {
    throw new Error('缺失参数‘Method’');
  }
};

/**
 * @description 设置数据服务配置
 * @param {String} dataService 数据服务地址
 */
export const setConfig = (dataService, token) => {
  dataService = dataService || '/';
  if (!_.endsWith(dataService, '/')) {
    dataService = dataService + '/';
  }
  axiosIns = axios.create({
    baseURL: dataService,
  });
};
