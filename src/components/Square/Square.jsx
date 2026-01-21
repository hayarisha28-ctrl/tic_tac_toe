import React from "react";  
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./square.css";

export default function Square({ value, onPlayerClick }) {
  const squareRef = useRef();

  useEffect(() => {
    if (value) {
      gsap.fromTo(squareRef.current, { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
    }
  }, [value]);

  return (
    <button ref={squareRef} className="square" onClick={onPlayerClick}>
      {value}
    </button>
  );
}
