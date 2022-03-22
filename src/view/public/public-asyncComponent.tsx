/*
 * @Author: junjie.lean
 * @Date: 2021-04-21 12:50:32
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-03-22 15:21:44
 */

import React, { Component } from "react";

interface Props {
  [key: string]: any;
}

interface State {
  component: any;
}

/**
 * @description import()组件的方法实现,该方法用于进行动态代码切割
 * @description preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
 * @description preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
 * @description preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
 * @description 浏览器支持程度不同。
 */
export function AsyncImportComponent(importComponent) {
  class AsyncComponent extends Component<Props, State> {
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
