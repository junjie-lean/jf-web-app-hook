/*
 * @Author: junjie.lean
 * @Date: 2021-11-17 09:43:56
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-18 10:38:18
 */

import React, { ClassicComponent } from "react";

export interface StateDemoProps {}

/**
 * @description 测试的类组件
 */
export class StateDemo extends React.Component<StateDemoProps, any> {
  render(): React.ReactElement {
    return (
      <>
        <div>
          <h3>how to define a class compnent</h3>
        </div>
      </>
    );
  }
}

export default StateDemo;
