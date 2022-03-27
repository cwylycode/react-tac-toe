import "./index.css"
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import * as AI from "./lib/ai"
import { AILEVEL, GRIDSIZE, TOKENS } from "./lib/constants"

import Header from './components/Header'
import Board from "./components/Board"
import History from "./components/History"

function App() {
  // Settings
  const [gridSize, setGridSize] = useState(GRIDSIZE["3x3"])
  const [aiDifficulty, setAIDifficulty] = useState(AILEVEL.Dummy)
  const [playerToken, setPlayerToken] = useState(TOKENS.X)
  const [cpuToken, setCpuToken] = useState(TOKENS.O)
  const [playerTokenColor, setPlayerTokenColor] = useState(null)
  const [cpuTokenColor, setCpuTokenColor] = useState(null)
  // Game states
  const isGameOver = useRef(false)
  const [gameOverStatus, setGameOverStatus] = useState("")
  const [gameOverMessage, setGameOverMessage] = useState("?") // temp
  const [board, setBoard] = useState(initBoard())
  const [boardHistory, setBoardHistory] = useState([initBoard()])
  const historyPoint = useRef(0)
  const playerFirst = useRef(true)
  const [playersTurn, setPlayersTurn] = useState(true)

  useEffect(() => {
    // Settings have been changed
    resetGame(true)
    AI.updateSettings(playerToken, cpuToken, gridSize, aiDifficulty)
  }, [gridSize, playerToken, aiDifficulty, playerTokenColor, cpuTokenColor])

  useEffect(() => {
    const status = AI.getBoardStatus(board)
    if (status) {
      // Status, if not a draw, will contain the winning token and the cell values it won on
      onGameOver(status)
      return
    }
    if (!playersTurn && !isGameOver.current) {
      const delay = setTimeout(() => { // Timeout allows for the player token to be rendered first
        const moveID = AI.getAIMove(board)
        placeToken(moveID)
      }, 250)
      return () => clearTimeout(delay)
    }
  }, [board])

  function initBoard() {
    return Array(gridSize * gridSize).fill(null)
  }

  function resetGame(userOverride = false) {
    setGameOverMessage("?") // temp
    isGameOver.current = false
    historyPoint.current = 0
    // User override makes sure player goes first if setting changes reset the game
    setPlayersTurn(userOverride ? true : playerFirst.current)
    setBoardHistory([initBoard()])
    setBoard(initBoard())
  }

  function onGameOver(result) {
    isGameOver.current = true
    playerFirst.current = !playerFirst.current
    setBoardHistory([initBoard()])
    setGameOverStatus(result)
    setGameOverMessage(result.token ? `Winner: ${result.token}` : "Draw") //temp
  }

  function onHistoryClick(forward = false) {
    if (!playersTurn) return
    const direction = forward ? 2 : -2
    historyPoint.current += direction
    setBoard(boardHistory[historyPoint.current])
  }

  // Player clicked on board cell
  function onCellClick(cellID) {
    if (isGameOver.current) {
      resetGame()
      return
    }
    if (board[cellID] || !playersTurn) return
    placeToken(cellID)
  }

  // Used by both player and cpu to place their tokens on the board
  function placeToken(cellID) {
    const currentToken = playersTurn ? playerToken : cpuToken
    const newBoard = board.map((val, idx) => {
      return idx === cellID ? currentToken : val
    })
    const newHistory = [...boardHistory.slice(0, historyPoint.current + 1), newBoard]
    historyPoint.current = newHistory.length - 1
    setPlayersTurn(!playersTurn)
    setBoardHistory(newHistory)
    setBoard(newBoard)
  }

  return (
    <div className='container-xxl'>
      <Header />
      <main className="pt-5">
        <Board
          board={board}
          gridSize={gridSize}
          onGameOver={gameOverStatus}
          onCellClick={onCellClick}
        />
        <History
          currentPoint={historyPoint.current}
          historyLength={boardHistory.length}
          onClickBackward={() => { onHistoryClick(false) }}
          onClickForward={() => { onHistoryClick(true) }}
        />
        <p>{gameOverMessage}</p>
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