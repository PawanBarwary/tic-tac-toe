
// Game Logic
const game = (function () {
  const board = [[null, null, null],
                 [null, null, null],
                 [null, null, null],                            
                ]; 
  
  function createX(x, y) {
    board[y][x] = "X";
  }

  function createO(x, y) {
    board[y][x] = "O";
  }

  function moveX(x1, y1, x, y) {
    board[y1][x1] = null;
    createX(x, y)
  }

  function moveO(x1, y1, x, y) {
    board[y1][x1] = null;
    createO(x, y);
  }

  function checkWin() {

    if (board[2][0] == "X" && board[1][1] == board[2][0] 
        && board[0][2] == board[2][0]) return true; 
    if (board[2][0] == "O" && board[1][1] == board[2][0] 
        && board[0][2] == board[2][0]) return true; 

    let xLeftDiag = 0;
    let oLeftDiag = 0; 

    for (let i = 0; i < 3; i++) {
      let oCol = 0;
      let xCol = 0; 
      let oRow = 0;
      let xRow = 0;
      
      for (let j = 0; j < 3; j++) {
        if (i==j) {
          if (board[i][j] == "X") xLeftDiag ++;
          if (board[i][j] == "O") oLeftDiag ++;
        }
        if (board[j][i] == "O") oCol ++;
        if (board[j][i] == "X") xCol ++;
        if (board[i][j] == "O") oRow ++;
        if (board[i][j] == "X") xRow ++; 
      }
      if (oRow == 3 || xRow == 3 || xCol == 3 || 
          oCol == 3 || oLeftDiag == 3 || xLeftDiag) return true; 
    }
    return false;
  }

  return {
    createX,
    createO,
    moveX,
    moveO,
    checkWin,
    board
  }
})();

// Page Logic
const body = document.querySelector('body');

const loadGame = () => {
  
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      
      if (game.board[i][j] == "X") {
        const cell = document.getElementById(counter.toString());
        cell.textContent = "X";
      }
      else if (game.board[i][j] == "O") {
        const cell = document.getElementById(counter.toString());
        cell.textContent = "O";
      }
    }
  }
};

game.createO(0, 0);
game.createO(1, 1);
game.createO(2, 0);

console.log(game.checkWin());