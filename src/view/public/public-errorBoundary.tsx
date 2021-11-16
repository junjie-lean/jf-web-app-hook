/*
 * @Author: junjie.lean
 * @Date: 2020-07-29 11:29:54
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 16:53:36
 */

/**
 * 错误边界捕获
 */
import React, { PropsWithChildren, ReactElement } from 'react';

/**
 * @interface
 */
interface ErrorState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<any, ErrorState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>error happen</h1>;
    }

    return this.props.children;
  }
}
