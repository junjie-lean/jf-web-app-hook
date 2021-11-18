/*
 * @Author: junjie.lean
 * @Date: 2020-07-28 17:05:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-18 10:55:07
 */

import React, { Suspense, ReactElement } from "react";
import "./../../style/index.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

/**
 * @description 动态引入降级解决方案
 */
export function SuspenseFun({ children }): ReactElement {
  return (
    <Suspense
      fallback={
        <div className="lean-public-suspense">
          {
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            ></Spin>
          }
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
