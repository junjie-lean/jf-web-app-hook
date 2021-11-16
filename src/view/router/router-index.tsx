/*
 * @Author: junjie.lean
 * @Date: 2021-03-09 14:58:59
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-16 17:33:05
 */

import React, { Fragment as F, ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { asyncComponent } from '../public/public-asyncComponent';

const Loading = asyncComponent(
  () =>
    import(
      /*webpackPerload: true,webpackChunkName :"loading" */ '../page/layout-loading'
    )
);

const Home = asyncComponent(
  () =>
    import(
      /* webpackPerfetch:true,webpackChunkName :"home" */ '../page/layout-home'
    )
);

/**
 * 路由组件,导入组件均采用按需加载的方式
 * @param props
 * @returns
 */
export function BaseRouter(props): ReactElement {
  let baseHash = '';
  return (
    <F>
      <Switch>
        <Route exact path={baseHash + '/'} component={Loading} />
        <Route path={baseHash + '/loading'} component={Loading} />
        <Route path={baseHash + '/home'} render={() => <Home {...props} />} />
        <Redirect to={baseHash + '/loading'} />
      </Switch>
    </F>
  );
}
