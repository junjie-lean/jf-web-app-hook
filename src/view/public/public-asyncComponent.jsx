/*
 * @Author: junjie.lean
 * @Date: 2021-04-21 12:50:32
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 17:48:04
 */

import React, { Component } from 'react';

/**
 * @description import()组件的方法实现,该方法用于进行动态代码切割
 */
export function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const components = await importComponent();
      const keys = Reflect.ownKeys(components);

      let component;
      keys
        .filter((key) => key !== '__esModule')
        .map((key) => {
          component = components[key];
        });
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
