import { LINES } from "./constants"

let aiRandomnessFactor = 0
let gridSize = 0
let playerToken = ""
let cpuToken = ""

export function updateSettings(playerTkn, cpuTkn, gridsize, aiLevel) {
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
  for (let line of winningLines) {
    const arr = Array(gridSize)
    for (let i = 0; i < gridSize; i++) {
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
    // AI goes first and the board is empty - pick a random cell
    const selection = Math.floor(Math.random() * board.length)
    return selection
  }
  return minimax(board, cpuToken).index
}

// Minimax algorithm code kindly provided by jatin-47 - and then I went and fiddled with it.
// https://github.com/jatin-47/Tic-Tac-Toe/

//dumb minimax with some randomness
function minimax(newBoard, currentToken) {
  const availSpots = []
  for (var i = 0; i < newBoard.length; i++) {
    if (newBoard[i] === null)
      availSpots.push(i)
  }

  // if terminal state reaches, return with the score
  const boardResult = getBoardStatus(newBoard)
  if (boardResult.token && boardResult.token === cpuToken) //let opponent(ai) be the minimizer
    return { score: -10 }
  else if (boardResult.token && boardResult.token === playerToken) // let player1(human) be the maximiser
    return { score: 10 }
  else if (boardResult === "draw") // tie 
    return { score: 0 }

  //storing score and index for each move possible from the given board state
  var moves = []

  // loop through all available spots
  for (var i = 0; i < availSpots.length; i++) {
    //create an object for each and store the index of that spot 
    var move = {}
    move.index = availSpots[i]
    newBoard[availSpots[i]] = currentToken // set the empty spot to the current player

    //collect the score resulted from calling minimax on the opponent of the current player
    if (currentToken == cpuToken) {
      var result = minimax(newBoard, playerToken)
      move.score = result.score
    }
    else {
      var result = minimax(newBoard, cpuToken)
      move.score = result.score
    }
    // reset the spot to empty for the next loop itereration   
    newBoard[availSpots[i]] = null
    // push the object to the array
    moves.push(move)
  }

  // evaluating the best move in the moves array (i.e. all the possible moves)
  var bestMove

  if (Math.random() > aiRandomnessFactor) {
    // For a less-than-perfect AI player
    bestMove = Math.floor(Math.random() * moves.length)
  }
  else {
    //if it is the ai's turn loop over the moves and choose the move with the lowest score 
    //as we have taken ai as the minimiser
    if (currentToken === cpuToken) {
      var bestScore = 10000
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    }// else loop over the moves and choose the move with the highest score (as human player is the maximiser)
    else {
      var bestScore = -10000
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    }
  }
  // return the chosen move (object) from the moves array
  return moves[bestMove]
}