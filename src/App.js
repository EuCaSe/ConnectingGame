import React, { useState } from 'react';
import './App.css';

const NUM_ROWS = 6;
const NUM_COLS = 7; 

function App() {
 
  const [board, setBoard] = useState(
    Array(NUM_ROWS).fill().map(() => Array(NUM_COLS).fill(' '))
  );
  const [currentPlayer, setCurrentPlayer] = useState('X'); 
  const [message, setMessage] = useState('');

  
  const dropDisc = (column) => {
    if (message) return; // If there is a winner, prevent further moves
    for (let row = NUM_ROWS - 1; row >= 0; row--) {
            if (board[row][column] === ' ') {
        const newBoard = [...board];
        newBoard[row][column] = currentPlayer;
        setBoard(newBoard);

              if (checkWinner(newBoard, currentPlayer)) {
          setMessage(`Player ${currentPlayer} wins! You did a great job, RCCian!`);
        } else if (isDraw(newBoard)) {
          setMessage("It's a draw! Both players did great!");
        } else {
          // Switch to the other player
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
        return;
      }
    }
    // Alert if the column is already full
    alert("Column is full. Try a different one.");
  };


  const checkWinner = (board, player) => {

    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        if (
          
          (col + 3 < NUM_COLS && board[row].slice(col, col + 4).every(cell => cell === player)) ||
      
          (row + 3 < NUM_ROWS && Array(4).fill().map((_, i) => board[row + i][col]).every(cell => cell === player)) ||
         
          (row + 3 < NUM_ROWS && col + 3 < NUM_COLS && Array(4).fill().map((_, i) => board[row + i][col + i]).every(cell => cell === player)) ||
       
          (row - 3 >= 0 && col + 3 < NUM_COLS && Array(4).fill().map((_, i) => board[row - i][col + i]).every(cell => cell === player))
        ) {
          return true;
        }
      }
    }
    return false;
  };


  const isDraw = (board) => {
    return board[0].every(cell => cell !== ' ');
  };

  const resetBoard = () => {
    setBoard(Array(NUM_ROWS).fill().map(() => Array(NUM_COLS).fill(' ')));
    setCurrentPlayer('X'); // X always starts the new game
    setMessage(''); // Clear the message when the board is reset
  };

  return (
    <div className="App">
      <h1>Connect Four</h1>
      <div className="board">
        {/* Render the game board */}
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell}`}
                onClick={() => dropDisc(colIndex)} // Handle disc drop on click
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Display the game message below the board */}
      <div className="message">
        {message && <p>{message}</p>}
      </div>
      {/* Button to reset the game */}
      <button onClick={resetBoard}>Reset Game</button>
    </div>
  );
}

export default App;
