/*
 * @Author: junjie.lean
 * @Date: 2020-03-11 14:19:41
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 16:52:21
 */
import React, { Fragment as F, PropsWithChildren, ReactElement } from 'react';

export function SVG(props: PropsWithChildren<any>): ReactElement {
  let style = props.style ? { ...props.style } : {};

  if (props.width) {
    style.width = props.width;
  }
  if (props.height) {
    style.height = props.height;
  }
  if (props.color) {
    style.color = props.color;
  }
  if (props.fill) {
    style.fill = props.fill;
  }

  let _className;
  if (props.className) {
    _className = `icon ${props.className}`;
  } else {
    _className = 'icon';
  }

  /**增加点击事件 */
  let clickHandle = () => {
    if (props.onClick) {
      return props.onClick;
    } else {
      return () => {};
    }
  };

  return (
    <F>
      <svg
        className={_className}
        aria-hidden="true"
        style={style}
        onClick={clickHandle}
      >
        <use xlinkHref={'#icon-' + props.type}>
          <title>{props.title || props.type}</title>
        </use>
      </svg>
    </F>
  );
}
