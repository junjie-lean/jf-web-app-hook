/*
 * @Author: junjie.lean
 * @Date: 2022-01-26 13:49:05
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-01-27 09:19:50
 */

import React, { ReactElement, PropsWithoutRef } from "react";

/**
 * @interface 这是一个类型接口,是给typedoc组件参数的限制
 */
export interface TypeDocProps {
  /** e.g. name属性是必有属性,组件依赖此属性进行下一步计算 */
  name: string;
  readonly storage: string | number;
  /** e.g.  city属性不是必有属性,在四个城市里选一个 */
  city?: "成都" | "重庆" | "贵州" | "昆明";
  [key: string]: any;
}

/**
 * @description 测试组件
 * 这个组件用在指数大屏的仓储管理模块,当组件被调用时,可以计算大屏的渲染所需时间.
 * 另外,这个组件可以用服务端渲染的方式来做一个lazy load.
 *
 *  ```tsx
 *
 *      <TypeDoc {...SomeData} />
 *
 * ```
 *
 * @author junjie.lean
 * @vesion v1.0.0
 * @param  { props }  TypeDocProps
 * @return 返回一个React组件
 */
export function TypeDoc(props: PropsWithoutRef<TypeDocProps>): ReactElement {
  const fn = () => {};

  return <div>this is React Element</div>;
}
