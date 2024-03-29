/*
 * @Author: junjie.lean
 * @Date: 2020-03-17 09:52:08
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2023-07-01 12:36:01
 */

import React, { ReactElement, PropsWithChildren } from "react";
import zhCN from 'antd/locale/zh_CN';
import { BaseRouter } from "../router/router-index";
import { ProfilerMoniter } from "./public-profile";
import { ConfigProvider } from "antd";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "../../redux/index.reducer";
import { persistStore, persistReducer } from "redux-persist";
import storageLocal from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { PersistGate } from "redux-persist/integration/react";
import { SuspenseFun } from "./public-suspense";

/**
 * react-redux 状态守卫,在刷新浏览器的时候可以保持上次的redux状态
 * ```
 * <Provider store={store}>
 *    <PersistGate loading={null} persistor={persistor}>
 *      {props.children}
 *    </PersistGate>
 *  </Provider>
 * ```
 * @returns ReactElement
 */
export function ContextProvider(props): ReactElement {
  //redux同步机制
  //利用redux-persist持久化本地数据,使刷新页面后,redux状态值不丢失.
  const persistConfig = {
    key: "root", // sessionStorage中的唯一key,在微应用开发模式中需保持唯一
    storage: storageSession, //storage存储方式,建议采用sessionStorage
    // storage: storageLocal,
    // stateReconciler: hardSet, // 刷新后采用最新的状态,抛弃已存在的状态
    // stateReconciler: autoMergeLevel1, // 刷新后采用最新的状态,已存在的状态则合并
    stateReconciler: autoMergeLevel2, // 刷新后递归合并刷新的状态,已存在的状态则合并
    // blacklist: [], // 不缓存黑名单内部的key
    // whitelist: [], // 仅缓存白名单内的key
  };

  const myPersistReducer = persistReducer(persistConfig, reducers);

  //redux中间件处理.
  const middlewares = [thunk];
  const enhancers = applyMiddleware(...middlewares);
  const composedEnhancers = composeWithDevTools(...[enhancers]);

  //修改store生成方式
  const store = createStore(myPersistReducer, composedEnhancers);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
}

/**
 * @description 项目入口
 * 包含了antd的配置,性能监控器,redux状态守卫,路由,根组件等
 * !!!修改此组件需要慎重
 * ```tsx
 *  <ConfigProvider locale={zhCN}>
 *    <ProfilerMoniter id="react-app-moniter-root" open={false} callback={null}>
 *      <ContextProvider>
 *          ...
 *      </ContextProvider>
 *    </ProfilerMoniter>
 *  </ConfigProvider>
 * ```
 *
 */
export function App(props): ReactElement {
  return (
    <ConfigProvider locale={zhCN}>
      <ProfilerMoniter id="react-app-moniter-root" open={false} callback={null}>
        <ContextProvider>
          <SuspenseFun>
            <BaseRouter />
          </SuspenseFun>
        </ContextProvider>
      </ProfilerMoniter>
    </ConfigProvider>
  );
}
