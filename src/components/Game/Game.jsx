import React from "react";  // ✅ add this
import Board from "../Board/Board.jsx";
import { useState } from "react";
import { gsap } from "gsap";
import "./Game.css";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentBoard = history[currentMove];
  const [xTurn, setXTurn] = useState(true);

  const handlePlay = (nextBoard) => {
    const newHistory = [...history.slice(0, currentMove+1), nextBoard];
    setHistory(newHistory);
    setCurrentMove(newHistory.length-1);
    setXTurn(!xTurn);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setXTurn(move % 2 === 0);
    gsap.from(".history-btn", { x: -50, opacity: 0, duration: 0.3, stagger: 0.05 });
  };

  return (
    <div className="game">
      <Board board={currentBoard} xTurn={xTurn} onPlay={handlePlay} />
      <ol className="game_list">
        {history.map((_, move) => {
          const desc = move === 0 ? "Go to Start" : `Go To Move #${move}`;
          return (
            <li key={move}>
              <button onClick={() => jumpTo(move)} className="history-btn game_list-item-btn">
                {desc}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
