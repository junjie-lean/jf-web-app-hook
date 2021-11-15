/*
 * @Author: junjie.lean
 * @Date: 2020-07-29 11:29:54
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2020-07-29 13:54:04
 */

/**
 * 错误边界捕获
 */
import React from "react";

export default class ErrorBoundary extends React.Component {
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
