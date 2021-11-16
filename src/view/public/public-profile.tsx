/*
 * @Author: junjie.lean
 * @Date: 2020-07-28 17:05:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2020-08-07 11:09:36
 */

/**
 * 组件性能分析
 * props :
 *    id (string) 必填
 *    callback (function) 选填
 */

import React, { Profiler } from "react";

const isDev = process.env.NODE_ENV == "development";

export default ({ children, open, id, callback }) => {
  if (id == null) {
    throw new Error("调用性能分析组件 'public-profile' 必须添加id属性!");
  }

  if (!isDev) {
    console.warn("生产环境已禁用性能分析组件");
  }

  if (!callback) {
    callback = (id, phase, actualDuration) => {
      console.log(
        `
        组件id:${id},
        渲染方式:${phase == "update" ? "更新" : "挂载"},
        渲染耗时:${Math.round(actualDuration * 1000)}μs
        `
      );
    };
  }
  return isDev && open ? (
    <Profiler id={id} onRender={callback}>
      {children}
    </Profiler>
  ) : (
    children
  );
};
