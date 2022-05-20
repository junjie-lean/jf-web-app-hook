/*
 * @Author: junjie.lean
 * @Date: 2021-03-09 14:58:59
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-05-20 10:35:11
 */

import React, { Fragment as F } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { AsyncImportComponent } from "../public/public-asyncComponent";

const Loading = AsyncImportComponent(() =>
  import(
    /*webpackPerload: true,webpackChunkName :"loading" */ "../page/layout-loading"
  ),
);

const Home = AsyncImportComponent(() =>
  import(
    /* webpackPerfetch:true,webpackChunkName :"home" */ "../page/layout-home"
  ),
);

const State = AsyncImportComponent(() =>
  import(
    /* webpackPerfetch:true,webpackChunkName :"state" */ "@/view/page/layout-state"
  ),
);

/**
 * 路由组件,导入组件均采用按需加载的方式
 * @param props
 * @returns
 */
export function BaseRouter(props) {
  let baseHash = "";
  return (
    <Router>
      <Routes>
        <Route exact path={baseHash + "/"} element={<Home />} />
        <Route path={baseHash + "/loading"} element={<Loading />} />
        <Route path={baseHash + "/home"} element={<Home />} />
        <Route path={baseHash + "/state"} element={<State />} />
      </Routes>
    </Router>
  );
}

export default BaseRouter;
