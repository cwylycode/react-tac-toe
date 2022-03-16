import "./index.css"
import { TOKENS, LINES } from "./lib/constants.js"

import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Board from './components/Board'
import History from './components/History'

function App() {

  const [grid, setGrid] = useState([null]);
  const [gridSize, setGridSize] = useState(3)
  const [winningLines, setWinningLines] = useState([])
  const [gameStatus, setGameStatus] = useState(null)
  const gameOver = useRef(false)
  // const [gameOver, setGameOver] = useState(false)
  const [playersTurn, setPlayersTurn] = useState(true)
  const [playerToken, setPlayerToken] = useState(TOKENS.X)
  const [cpuToken, setCpuToken] = useState(TOKENS.O)

  // Run at start and whenever a game-breaking setting is changed by user
  useEffect(() => {
    resetGame(true)
  }, [gridSize, playerToken])

  useEffect(() => {
    const arr = Array(gridSize)
    for (let line of winningLines) {
      for (let i = 0; i < gridSize; i++) arr[i] = grid[line[i]]
      // Winner declared, return token
      if (arr.every(function (e) { return e === arr[0] })) setGameStatus(arr[0])
    }
    // All cells filled with no winner
    if (grid.every(function (e) { return e !== null })) setGameStatus("draw")
  }, [grid])

  useEffect(() => {
    if (gameStatus) {
      if (gameStatus === "draw") console.log("Draw")
      else console.log(`Winner: ${gameStatus}`)
      gameOver.current = true
    }
  }, [gameStatus])

  console.log(gameOver.current)

  // Reset board and history - user override means user goes first, even if not their turn
  function resetGame(userOverride = false) {
    setPlayersTurn(userOverride ? true : playersTurn)
    setGrid(Array(gridSize * gridSize).fill(null))
    setWinningLines(LINES[gridSize - 3])
    // todo: history erase
    gameOver.current = false
    // setGameOver(false)
    console.log("reset")
  }

  // Both the player and computer will call this to place their tokens on the board
  function cellClicked(cellID) {
    console.log(`Cell ${cellID} clicked`)
    if (gameOver.current) {
      resetGame()
      return
    }
    if (grid[cellID]) return
    const currentToken = playersTurn ? playerToken : cpuToken
    setGrid(prev => prev.map((value, index) => {
      return index === cellID ? currentToken : value
    }))
    setPlayersTurn(!playersTurn)
  }

  return (
    <div className='container-xxl'>
      <Header />
      <main className="pt-5">
        <Board grid={grid} gridSize={gridSize} cellClicked={cellClicked} />
        <History />
      </main>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)