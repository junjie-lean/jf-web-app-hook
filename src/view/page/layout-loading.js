/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:00:34
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-04-27 14:07:57
 */

import ReactLoading from "react-loading";
import React, { useEffect } from "react";
import css from "link-style";
export default function Loading(props) {
  useEffect(() => {
    setTimeout(() => {
      props.history.push("/home");
    }, 2000);

  }, []);

  return (
    <>
      <div
        style={css.position("fixed").bg("#282c34").t(0).l(0).r(0).b(0).end}
        className="lean-mask"
      >
        <div style={css.margin("100px 100px").end}>
          <span style={css.color("#fff").margin("0 0 30px").end}></span>
          <br />
          <br />
          <br />
          <br />
          <br />

          <ReactLoading type={"bars"} color="#c0c0c0" />
        </div>
        <div style={css.position("fixed").b(20).r(60).end}>
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
