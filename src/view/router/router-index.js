/*
 * @Author: junjie.lean
 * @Date: 2021-03-09 14:58:59
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-18 17:27:29
 */

import React, { Fragment as F, ReactElement, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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

// const Home = lazy(() => import("@/view/page/layout-home"));
// const Loading = lazy(() => import("@/view/page/layout-loading"));
// const State = lazy(() => import("@/view/page/layout-state"));

/**
 * 路由组件,导入组件均采用按需加载的方式
 * @param props
 * @returns
 */
export function BaseRouter(props) {
  let baseHash = "";
  return (
    <F>
      <Switch>
        <Route exact path={baseHash + "/"} component={Loading} />
        <Route path={baseHash + "/loading"} component={Loading} />
        <Route
          path={baseHash + "/home"}
          render={(...renderProps) => <Home {...props} {...renderProps} />}
        />
        <Route path={baseHash + "/state"} component={State} />
        <Redirect to={baseHash + "/loading"} />
      </Switch>
    </F>
  );
}

export default BaseRouter;
