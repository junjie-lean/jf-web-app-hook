/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:00:34
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 17:34:46
 */

import React, { useEffect, ReactElement } from 'react';
import ReactLoading from 'react-loading';
import css from 'link-style';



/**
 * react loading文件,可以在该文件做入口处理,比如鉴权,初始化菜单等等.
 * @param props 
 * @returns 
 */
export function Loading(props): ReactElement {
  useEffect(() => {
    setTimeout(() => {
      props.history.push('/home');
    }, 2000);
  }, []);

  return (
    <>
      <div
        style={css.position('fixed').bg('#282c34').t(0).l(0).r(0).b(0).end}
        className="lean-mask"
      >
        <div style={css.margin('100px 100px').end}>
          <span style={css.color('#fff').margin('0 0 30px').end}></span>
          <br />
          <br />

          <ReactLoading type={'bars'} color="#c0c0c0" />
        </div>
        <div style={css.position('fixed').b(20).r(60).end}>
          <ReactLoading
            type={'bubbles'}
            color="#fff"
            width="35px"
            height="35px"
          />
        </div>
      </div>
    </>
  );
}
