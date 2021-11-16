/*
 * @Author: junjie.lean
 * @Date: 2020-07-28 17:05:12
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 16:50:38
 */

import React, { Suspense } from 'react';
import './../../style/index.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export function SuspenseFun({ children, skeleton }) {
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
