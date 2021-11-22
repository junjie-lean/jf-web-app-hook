/*
 * @Author: junjie.lean
 * @Date: 2020-07-28 17:05:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-22 09:15:52
 */

import React, { Profiler, PropsWithChildren, ReactElement } from "react";

const isDev = process.env.NODE_ENV == "development";

interface ProfilerMoniterProps {
  children: ReactElement;
  open: boolean;
  id: string;
  callback?: any;
}

/**
 * 组件性能分析器
 * Profiler 能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销。 
 * 它需要两个 prop ：
 * 一个是 id(string)，
 * 一个是当组件树中的组件“提交”更新的时候被React调用的回调函数 onRender(function)。
 */
export function ProfilerMoniter({
  children,
  open,
  id,
  callback,
}: PropsWithChildren<ProfilerMoniterProps>): ReactElement {
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
        `,
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
}
