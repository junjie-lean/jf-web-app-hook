/*
 * @Author: junjie.lean
 * @Date: 2021-06-21 10:56:52
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-15 15:19:28
 */

declare module '*.svg' {
  interface Svg {
    content: string;
    id: string;
    viewBox: string;
    node: any;
  }
  const svg: Svg;
  export default svg;
}

declare module '*.jpg' {
  const png: string;
  export default png;
}

declare module '*.png' {
  const png: string;
  export default png;
}

declare module '*.mp3' {
  const mp3: string;
  export default mp3;
}

declare module '*.mp4' {
  const mp3: string;
  export default mp4;
}

declare module '*.gif' {
  const png: string;
  export default png;
}

declare module '*.json' {
  const json: string;
  export default json;
}

declare module '*.md' {
  const md: string;
  export default string;
}

interface Window {
  timer: any;
}
