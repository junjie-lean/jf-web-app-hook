/*
 * @Author: junjie.lean
 * @Date: 2021-03-09 14:58:59
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2023-07-01 12:32:33
 */

import React, { createRef } from "react";
import {
  Routes,
  Route,
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "@/view/page/layout-home";
import Loading from "@/view/page/layout-loading";
import State from "@/view/page/layout-state";
import Transition from "@/view/page/layout-transition";
import NotFound from "@/view/page/layout-404";
import SSE from "@/view/page/layout-sse";

/**
 * 路由组件,导入组件均采用按需加载的方式
 * @param props
 * @returns
 */
export function BaseRouter(props) {
  const routerConfig = [
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/home",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/loading",
      element: <Loading />,
      errorElement: <NotFound />,
    },
    {
      path: "/state",
      element: <State />,
      errorElement: <NotFound />,
    },
    {
      path: "/sse",
      element: <SSE />,
      errorElement: <NotFound />,
    },
    {
      path: "/transition",
      element: <Transition />,
      errorElement: <NotFound />,
      children: [
        {
          path: "a",
          element: <div>A</div>,
        },
        {
          path: "b",
          element: <div>B</div>,
        },
        {
          path: "c",
          element: <div>C</div>,
        },
      ],
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <div>no match</div>,
    },
  ];

  //   const Router = createBrowserRouter(routerConfig);

  return (
    <>
      {/* <RouterProvider fallbackElement={<NotFound />}> */}
      <Router>
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="alert" timeout={1300}>
            <Routes>
              {routerConfig.map((item) => {
                return (
                  <Route {...item} key={item.path}>
                    {item.children
                      ? item.children.map((children) => (
                          <Route {...children} key={children.path} />
                        ))
                      : null}
                  </Route>
                );
              })}
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Router>
      {/* </RouterProvider> */}
    </>
  );
}

export default BaseRouter;
