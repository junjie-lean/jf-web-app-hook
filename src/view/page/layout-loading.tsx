/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:00:34
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-01-26 11:20:40
 */

import React, { useEffect, ReactElement } from "react";
import ReactLoading from "react-loading";
// import css from "link-style";

/**
 * @description react loading文件,可以在该文件做入口处理,比如鉴权,初始化菜单等等.
 * @param props
 * @returns
 */
export function Loading(props): ReactElement {
  useEffect(() => {
    setTimeout(() => {
      props.history.push("/home");
    }, 2000);
  }, []);

  return (
    <>
      <div className="lean-mask">
        <div>
          <span></span>
          <br />
          <br />

          <ReactLoading type={"bars"} color="#c0c0c0" />
        </div>
        <div>
          <ReactLoading
            type={"bubbles"}
            color="#fff"
            width="35px"
            height="35px"
          />
        </div>
      </div>
    </>
  );
}

/**
 *  @description 默认导出是为了动态引入做代码切割
 */
export default Loading;
