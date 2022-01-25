// Game Logic
const game = (function () {

  let xOnScreen = 0;
  let oOnScreen = 0;
  let xTimesPlayed = 0;
  let oTimesPlayed = 0;

  let board = [[null, null, null],
               [null, null, null],
               [null, null, null],                            
              ]; 
  
  function createX(x, y) {
    if (board[y][x]==null) {
      board[y][x] = "X";
      game.xOnScreen++;
      game.xTimesPlayed++
    }
  }

  function createO(x, y) {
    if (board[y][x]==null) {
      board[y][x] = "O";
      game.oOnScreen++;
      game.oTimesPlayed++
    }
  }

  function moveX(x1, y1, x, y) {
    if (board[y][x]==null) {
      board[y1][x1] = null;
      board[y][x] = "X";
      game.xTimesPlayed++
    }
  }

  function moveO(x1, y1, x, y) {
    if (board[y][x]==null) {
      board[y1][x1] = null;
      board[y][x] = "O";
      game.oTimesPlayed++
    }
  }

  function playersTurn() {
    if (game.xTimesPlayed <= game.oTimesPlayed) return "X";
    else return "O";
  }

  function reset() {
    board = [[null, null, null],
             [null, null, null],
             [null, null, null],                            
            ]; 
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
          oCol == 3 || oLeftDiag == 3 || xLeftDiag == 3) return true; 
    }
    return false;
  }
  return {
    createX,
    createO,
    moveX,
    moveO,
    checkWin,
    board,
    xOnScreen,
    oOnScreen,
    xTimesPlayed,
    oTimesPlayed,
    playersTurn
  }
})();

function player(pawn) {
  const obj = {
    oldRow: 0,
    oldCol: 0,
    twoClicks: false,
    pawn: pawn,
  }
  obj.onScreen = obj.pawn == "X" ? game.xOnScreen : game.oOnScreen;
  obj.create = obj.pawn == "X" ? game.createX : game.createO;
  obj.move = obj.pawn == "X" ? game.moveX : game.moveO;
  return obj;
}
// Page Logic
const body = document.querySelector('body');
const cells = document.querySelectorAll('.cell');


const loadGame = () => {
  let counter = 0;
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      const cell = document.getElementById(counter.toString());
      if (game.board[i][j] == "X") cell.textContent = "X";
      else if (game.board[i][j] == "O") cell.textContent = "O";
      else if (game.board[i][j] == null) cell.textContent= "";
      counter++;
    }
  }
};

const victoryHead = document.getElementById('victory');

const player1 = player("X");
const player2 = player("O");

const play = (cell) => {
  
  let player;
  const turn = game.playersTurn();
  
  if (turn == "X") player = player1;
  if (turn == "O") player = player2;

  console.log(player.onScreen);

  const row = cell.dataset.row;
  const col = cell.dataset.cell;
  if (cell.textContent == player.pawn) {
    player.twoClicks = true;
    player.oldCol = col;
    player.oldRow = row;
  }
  else if (player.twoClicks == true) {
    player.move(player.oldCol, player.oldRow, col, row);
    player.twoClicks = false;
    player.oldCol = null;
    player.oldRow = null;
  }
  else if(player.onScreen < 3) player.create(col, row);
  if (game.checkWin()==true) {
    victoryHead.textContent = "VICTORY"; 
  }
  loadGame();
};

const hover = (cell) => {
  let player;
  const turn = game.playersTurn();
  if (turn == "X") player = player1;
  if (turn == "O") player = player2;

  if (player.onScreen == 3 && cell.textContent == player.pawn) {
    cell.classList.add("hover-x"); 
  }
  else if ((cell.textContent == "" && player.onScreen != 3) || player.twoClicks == true) {
    cell.classList.add("hover");
  }
};

const unHover = (cell) => {
  cell.classList.remove("hover");
  cell.classList.remove("hover-x");
}
cells.forEach(cell => {
  cell.addEventListener('click', () => play(cell) );
  cell.addEventListener('mouseover', () => hover(cell) );
  cell.addEventListener('mouseout', () => unHover(cell) );
});