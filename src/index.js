/*
 * @Author: junjie.lean
 * @Date: 2020-01-09 14:17:37
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-15 18:16:33
 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/public/public-provider';
// import svgs from "!!raw-loader!./media/svg/symbol-defs.svg";
// document.querySelector("#svg").innerHTML += svgs;

function render(props = {}) {
  document.title = 'jvfe react hook';
  const DOM = document.getElementById('jvfe-app');
  ReactDOM.render(<App {...props} />, DOM);
}

render();
