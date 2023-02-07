import {useState} from 'react';
import './App.css'


function Square({ value, onSquareClick }) {
  return <button className='square' onClick={onSquareClick}>{ value } </button>
}

function Board() {

  const [isXNext, setXNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  
  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setXNext(!isXNext);
  }

  const winner = calculateWinner(squares);
  let status = calculateStatus(squares, winner, isXNext);
  
  return (
    <>
      <h1>React Tic Tac Toe</h1>
      <div>{ status }</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick = {() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick = {() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick = {() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick = {() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick = {() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick = {() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick = {() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick = {() => handleClick(8)}/>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateStatus(squares, winner, isXNext) {
  let status;
  if (winner) {
    status = winner + " is the Winner!";
  } else {

    status = "Next player: " + (isXNext ? "X" : "O");

    let isGameOver = squares.every(element => element !== null);
    
    if (!isGameOver)
      status = "Next player: " + (isXNext ? "X" : "O");
    else {
      status = "Draw!";
    }
  }
  return status;
}

export default Board;
