/*
 * @Author: junjie.lean
 * @Date: 2020-07-29 11:29:54
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 09:22:58
 */

/**
 * 错误边界捕获
 */
import React from 'react';

interface ErrorState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<any, ErrorState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>error happen</h1>;
    }

    return this.props.children;
  }
}
