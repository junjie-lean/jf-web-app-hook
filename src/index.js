/*
 * @Author: junjie.lean
 * @Date: 2020-01-09 14:17:37
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-10-17 16:02:26
 */

import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./view/public/public-provider";

document.title = "react";

ReactDOM.createRoot(document.getElementById("rtwl-app")).render(<App />);
