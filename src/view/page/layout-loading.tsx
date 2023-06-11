/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:00:34
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-10-18 08:55:35
 */

import React, { useEffect, ReactElement } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
/**
 * @description react loading文件,可以在该文件做入口处理,比如鉴权,初始化菜单等等.
 * @param props
 * @returns
 */
export function Loading(props): ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      //   navigate("/home");
    }, 2000);
  }, []);
  3;

  useEffect(() => {
    const target = document.querySelector("#target");

    target.addEventListener("input", () => {
      console.log('いんpd',target.innerHTML);
    });
  }, []);

  return (
    <>
      <div className="lean-mask">
        <div>
          <span contentEditable id="target">
            RTFC
          </span>
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
