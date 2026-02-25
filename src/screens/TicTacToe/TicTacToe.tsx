import { useState } from "react";
import "./styles.less";

const checkWinner = (
  items: (null | string)[][],
  rowIndex: number,
  colIndex: number
) => {
  const value = items[rowIndex][colIndex];
  let rowWin = true;
  for (let i = 0; i < items.length; i++) {
    if (value != items[rowIndex][i]) {
      rowWin = false;
      break;
    }
  }
  let colWin = true;
  for (let i = 0; i < items.length; i++) {
    if (value != items[i][colIndex]) {
      colWin = false;
      break;
    }
  }
  let diagonal1Win = false;
  if (rowIndex == colIndex) {
    diagonal1Win = true;
    for (let i = 0; i < items.length; i++) {
      if (value != items[i][i]) {
        diagonal1Win = false;
        break;
      }
    }
  }

  let diagonal2Win = false;
  if (rowIndex + colIndex === items.length - 1) {
    diagonal2Win = true;
    for (let i = 0; i < items.length; i++) {
      if (value != items[items.length - 1 - i][i]) {
        diagonal2Win = false;
        break;
      }
    }
  }

  return rowWin || colWin || diagonal1Win || diagonal2Win;
};

function TicTacToe() {
  const [size, setSize] = useState<string>("");
  const [boards, setBoards] = useState<(null | string)[][]>([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [win, setWin] = useState("");
  const [history, setHistory] = useState<[number, number][]>([]);

  const startHandler = () => {
    if (size) {
      const dimensions = parseInt(size);

      setBoards(
        Array.from({ length: dimensions }, () => Array(dimensions).fill(null))
      );

      setGameStarted(true);
    }
  };

  const clickHandler = (rowIndex: number, colIndex: number) => {
    if (win || boards[rowIndex][colIndex]) return;
    const items = boards.map((row) => [...row]);
    items[rowIndex][colIndex] = playerTurn ? "X" : "O";

    setHistory([...history, [rowIndex, colIndex]]);
    if (checkWinner(items, rowIndex, colIndex)) {
      setWin(playerTurn ? "X" : "O");
      setBoards(items);
      return;
    }

    setBoards(items);
    setPlayerTurn(!playerTurn);
  };

  const resetHandler = () => {
    setGameStarted(false);
    setSize("");
    setBoards([]);
    setWin("");
  };

  const undoHandler = () => {
    if (history.length > 0) {
      const pastHistory = [...history];
      const [row, col] = pastHistory[pastHistory.length - 1];
      const updatedBoards = [...boards];
      updatedBoards[row] = [...updatedBoards[row]];
      updatedBoards[row][col] = null;
      setBoards(updatedBoards);
      setHistory(pastHistory.slice(0, -1));
      setPlayerTurn(!playerTurn);
    }
  };
  return (
    <div className="container">
      <h1 className="main-heading">TicTacToe</h1>
      <div className="tic-tac-toe-container">
        <div className="input-container">
          {!gameStarted ? (
            <>
              <input
                type="number"
                value={size}
                placeholder="Enter the Size"
                onChange={(e) => setSize(e.target.value)}
              />
              <div className="btn-container">
                <button onClick={startHandler} className="game-btn">
                  Start The Game
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="btn-container">
                <button
                  onClick={() => undoHandler()}
                  className={`undo-btn ${win && "disabled"}`}
                  disabled={win ? true : false}
                >
                  Undo
                </button>
                <button onClick={() => resetHandler()} className="game-btn">
                  Play New Game
                </button>
              </div>
              {win ? (
                <p>Player {win} won</p>
              ) : (
                <p>Player {playerTurn ? "X" : "O"} Turn</p>
              )}
            </>
          )}
        </div>
        <div className="board-container">
          {boards?.map((row, rowIndex) => {
            return (
              <div className="row" key={rowIndex}>
                {row.map((col, colIndex) => {
                  return (
                    <div
                      className={`cell ${win && "disabled"}`}
                      key={colIndex}
                      onClick={() => clickHandler(rowIndex, colIndex)}
                    >
                      {col}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
