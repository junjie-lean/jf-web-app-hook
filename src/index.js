/*
 * @Author: junjie.lean
 * @Date: 2020-01-09 14:17:37
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2022-07-25 15:54:49
 */

import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./view/public/public-provider";

document.title = "jvfe react hook";

ReactDOM.createRoot(document.getElementById("rtwl-app")).render(<App />);
