/*
 * @Author: junjie.lean
 * @Date: 2021-04-21 12:50:32
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-04-21 12:53:15
 */

import React, { Component } from "react";

/**
 *
 * @description import()组件的方法实现,该方法用于进行动态代码切割
 * @example  asyncComponent(()=>  import("/some/path/of/component"))
 */
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component,
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
