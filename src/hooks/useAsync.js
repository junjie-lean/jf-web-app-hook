/*
 * @Author: junjie.lean
 * @Date: 2020-08-12 15:13:14
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-15 12:14:57
 */
/**
 * @description 基于promise的状态管理
 */

import React, { useEffect, useCallback } from 'react';

export function useAsync(asyncFunction, immediate = true) {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response) => setValue(response))
      .catch((error) => setError(error))
      .finally(() => setPending(false));
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, value, error };
}

// 用法
// function App() {
//     const { execute, pending, value, error } = useAsync(myFunction, false);

//     return (
//       <div>
//         {value && <div>{value}</div>}
//         {error && <div>{error}</div>}
//         <button onClick={execute} disabled={pending}>
//           {!pending ? "Click me" : "Loading..."}
//         </button>
//       </div>
//     );
//   };
