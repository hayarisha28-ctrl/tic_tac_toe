import React from "react";  
import Square from "../Square/Square.jsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./board.css";
import calculateWinner from "../../logic.js";

export default function Board({ board, xTurn, onPlay }) {
  const winner = calculateWinner(board);
  const messageRef = useRef();

  useEffect(() => {
    if (winner) {
      gsap.fromTo(messageRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" });
    }
  }, [winner]);

  const handlePlayerClick = (index) => {
    if (board[index] || winner) return;
    const tempBoard = [...board];
    tempBoard[index] = xTurn ? "X" : "O";
    onPlay(tempBoard);
  };

  const message = winner ? `Player ${winner} wins 🎉` : `Player ${xTurn ? "X" : "O"} turn`;

  return (
    <div className="board">
      <h2 ref={messageRef} className="board__message">{message}</h2>
      {Array(3).fill(0).map((_, row) => (
        <div key={row} className="board__row">
          {Array(3).fill(0).map((_, col) => {
            const idx = row * 3 + col;
            return <Square key={idx} value={board[idx]} onPlayerClick={() => handlePlayerClick(idx)} />;
          })}
        </div>
      ))}
    </div>
  );
}
