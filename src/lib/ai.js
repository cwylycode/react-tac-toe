import { LINES } from "./constants"

const MAX_DEPTH = 5 // 5 is a good balance between quick compute time and accuracy
let aiRandomnessFactor = 0
let gridSize = 0
let playerToken = ""
let cpuToken = ""

export function updateConfig(playerTkn, cpuTkn, gridsize, aiLevel) {
  gridSize = gridsize
  playerToken = playerTkn
  cpuToken = cpuTkn
  const factor = {
    0: 0.5,
    1: 0.8,
    2: 1
  }
  aiRandomnessFactor = factor[aiLevel]
}

// For both the ai and the game itself to know if a win/loss/draw has occured
export function getBoardStatus(board) {
  const winningLines = LINES[gridSize]
  const lineLength = winningLines[0].length
  for (let line of winningLines) {
    const arr = Array(lineLength)
    for (let i = 0; i < lineLength; i++) {
      arr[i] = board[line[i]]
    }
    if (arr[0] && arr.every((e) => e === arr[0])) {
      return { token: arr[0], winLine: line } // Winner declared, return token and winning line
    }
  }
  if (board.every((e) => e !== null)) {
    return "draw" // All cells filled with no winner - draw
  }
  return "" // Board still open to a winner or a draw
}

export function getAIMove(board) {
  if (board.every(e => e === null)) {
    // AI is going first and the board is empty - pick a random cell
    return Math.floor(Math.random() * board.length)
  }
  if (Math.random() > aiRandomnessFactor) {
    // For a less-than-perfect computer player
    const available = getAvailableSpots(board)
    return available[Math.floor(Math.random() * available.length)]
  }
  // Calculate the best possible move for AI (factoring in depth limitations)
  return minimax(board, 0, -10000, 10000, cpuToken).index
}

function getAvailableSpots(board) {
  const spots = []
  for (var i = 0; i < board.length; i++) {
    if (board[i] === null) {
      spots.push(i)
    }
  }
  return spots
}

// Minimax algorithm code kindly provided by jatin-47 - and then I went and fiddled with it.
// https://github.com/jatin-47/Tic-Tac-Toe/

//minimax with alpha-beta pruning and max-depth for sane computation times
function minimax(newBoard, depth, alpha, beta, currentToken) {
  const availSpots = getAvailableSpots(newBoard)

  // if terminal state reaches, return with the score
  const boardResult = getBoardStatus(newBoard)
  if (boardResult.token && boardResult.token === cpuToken) //let opponent(ai) be the minimizer
    return { score: -20 + depth }
  else if (boardResult.token && boardResult.token === playerToken) // let placurrentTokenyer1(human) be the maximiser
    return { score: 20 - depth }
  else if (boardResult === "draw" || depth > MAX_DEPTH) // tie or depth limit reached
    return { score: 0 }

  //if it is the ai's turn, lowest score (as we have taken ai as the minimiser)
  if (currentToken === cpuToken) {
    var bestScore = 10000;
    var bestMove = {};
    for (var i = 0; i < availSpots.length; i++) {
      newBoard[availSpots[i]] = currentToken; // set the empty spot to the current player

      var value = minimax(newBoard, depth + 1, alpha, beta, playerToken);
      if (value.score < bestScore) {
        bestScore = value.score;
        bestMove.index = availSpots[i];
        bestMove.score = bestScore;
      }

      // reset the spot to empty for the next loop itereration
      newBoard[availSpots[i]] = null;

      beta = Math.min(beta, bestScore);
      if (beta <= alpha)
        break;
    }
    return bestMove;
  }
  else // else highest score (as human player is the maximiser)
  {
    var bestScore = -10000;
    var bestMove = {};
    for (var i = 0; i < availSpots.length; i++) {
      newBoard[availSpots[i]] = currentToken; // set the empty spot to the current player

      var value = minimax(newBoard, depth + 1, alpha, beta, cpuToken);
      if (value.score > bestScore) {
        bestScore = value.score;
        bestMove.index = availSpots[i];
        bestMove.score = bestScore;
      }

      // reset the spot to empty for the next loop itereration
      newBoard[availSpots[i]] = null;

      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha)
        break;
    }
    return bestMove;
  }
}