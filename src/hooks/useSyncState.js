/*
 * @Author: junjie.lean
 * @Date: 2020-12-21 16:13:26
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2020-12-25 16:01:59
 */

import React from "react";

/**
 * @description 在FunctionComponent中,同步的setState
 * @param {Any} newState
 * @param {Function} setStateFN
 * @return Promise
 */
export const useSyncState = (newState, setStateFN) => {
  return new Promise((res) => {
    setStateFN(newState);
    res(newState);
  }).then((data) => data);
};
