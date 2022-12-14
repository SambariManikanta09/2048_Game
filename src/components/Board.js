import React, { useState } from "react";
import Tile from "./Tile";
import Cell from "./Cell";
import { Board } from "../helper/logic";
import useEvent from "../hooks/useEvent";
import GameOverlay from "./GameOverlay";
import LOGO from "../assets/img/ezgif.com-gif-maker.gif";
import WAVES from "../assets/img/waves2.gif";
import Footer from "./Footer";

const BoardView = () => {
  const [board, setBoard] = useState(new Board());
  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };

  useEvent("keydown", handleKeyDown);

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  const resetGame = () => {
    setBoard(new Board());
  };

  return (
    <div>
      <div>
        <img
          src={LOGO}
          alt="2048 - Animated edition"
          style={{
            width: "100%",
            height: "70%",
            cursor: "pointer",
            alignSelf: "center",
          }}
        ></img>
      </div>

      <div className="details-box">
        <div className="resetButton" onClick={resetGame}>
          New Game
        </div>
        <div className="score-box">
          <div className="score-header">SCORE</div>
          <div>{board.score}</div>
        </div>
      </div>
      <div className="board">
        {cells}
        {tiles}

        <GameOverlay onRestart={resetGame} board={board} />
        <Footer />
      </div>

      <img src={WAVES} alt="waves2.gif" />
    </div>
  );
};

export default BoardView;
