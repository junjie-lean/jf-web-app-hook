/*
 * @Author: junjie.lean
 * @Date: 2020-03-17 09:52:08
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-03-09 16:49:30
 */

import React from "react";
import zhCN from "antd/lib/locale-provider/zh_CN";
import RouterRelation from "../router/router-index";
import ProfilerMoniter from "./public-profile";
import { ConfigProvider } from "antd";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./../../redux/index.reducer";
import { persistStore, persistReducer } from "redux-persist";
import storageLocal from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { PersistGate } from "redux-persist/integration/react";

const ContextProvider = (props) => {
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
};

export default function App(props) {

  return (
    <ConfigProvider locale={zhCN}>
      <ProfilerMoniter id="react-app-moniter-root" open={false}>
        <ContextProvider>
          <RouterRelation {...props} />
        </ContextProvider>
      </ProfilerMoniter>
    </ConfigProvider>
  );
}
