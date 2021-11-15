/*
 * @Author: junjie.lean
 * @Date: 2021-03-09 14:58:59
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-04-22 09:59:00
 */

import React, { useEffect, useContext } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import asyncComponent from "./../public/public-asyncComponent";

const Loading = asyncComponent(() =>
  import(
    /*webpackPerload: true,webpackChunkName :"loading" */ "../page/layout-loading"
  )
);
const Home = asyncComponent(() =>
  import(
    /* webpackPerfetch:true,webpackChunkName :"home" */ "../page/layout-home.tsx"
  )
);

export default function RouterRelation(props) {
  let baseHash = "";
  return (
    <Router basename="/">
      <Switch>
        <Route exact path={baseHash + "/"} component={Loading} />
        <Route path={baseHash + "/loading"} component={Loading} />
        <Route path={baseHash + "/home"} render={() => <Home {...props} />} />
        {/* <Redirect to={baseHash + "/loading"} /> */}
      </Switch>
    </Router>
  );
}
