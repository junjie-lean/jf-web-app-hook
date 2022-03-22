/*
 * @Author: junjie.lean
 * @Date: 2021-11-17 09:43:56
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-03-22 15:27:53
 */

import React, { ClassicComponent } from "react";

export interface StateDemoProps {
  [key: string]: any;
}

/**
 * @description 测试的类组件
 */
export class StateDemo extends React.Component<StateDemoProps, any> {
  render(): React.ReactElement {
    return (
      <>
        <div>
          <h3>How to define the class component</h3>
        </div>
      </>
    );
  }
}

export default StateDemo;
