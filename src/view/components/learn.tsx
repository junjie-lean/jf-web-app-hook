import React, { useEffect } from "react";

export default function Learn(): JSX.Element {
  useEffect(() => {
    const target = document.getElementById("learning");
    target!.textContent = "on learning";
  }, []);

  return (
    <div>
      <h3 id="learning">ts learning</h3>
    </div>
  );
}
