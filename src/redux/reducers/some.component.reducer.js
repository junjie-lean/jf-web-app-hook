/*
 * @Author: junjie.lean
 * @Date: 2020-11-16 10:43:23
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2020-11-16 11:00:15
 */

/**
 * example reducer file should like this,
 *
 */
const defaultVersion = {
  version: {
    redux: require("./../../../node_modules/redux/package").version,
    reactRedux: require("./../../../node_modules/react-redux/package").version,
    reduxPersist: require("./../../../node_modules/redux-persist/package")
      .version,
  },
};

export const someCompenentValue_reducer = (
  state = defaultVersion,
  { type }
) => {
  switch (type) {
    case "some unique value": {
      return {
        version: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
