import React, { useEffect, useRef, useId } from "react";

import { createTimer } from "@/util/util-outInterval";
export default function NotFound404(props): JSX.Element {
  const domRef = useRef<any>();

  const timerRef = useRef<any>();

  const id = useId();
  const id2 = useId();

  const fn = () => {
    const child = document.createElement("div");
    child.innerHTML = id + "///" + id2;
    domRef.current.appendChild(child);
    document.getElementById("dom-target").appendChild;
  };

  const timer = () => {
    if (!timerRef.current) {
      timerRef.current = createTimer(fn, 1000);
    }
  };

  //5351809342

  useEffect(() => {
    domRef.current = document.querySelector(".dom-target");
    timer();
  }, []);
  return (
    <div className="dom-target" id="dom-target">
      404
    </div>
  );
}
