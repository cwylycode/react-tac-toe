import "./index.css"
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { TOKENS } from "./lib/constants"
import Header from './components/Header'
import Board from "./components/Board"
import History from "./components/History"

function App() {
  const isGameOver = useRef(false)
  const [gameOverMessage, setGameOverMessage] = useState("?") // temp
  const [gridSize, setGridSize] = useState(3)
  const [board, setBoard] = useState(initBoard())
  const [boardHistory, setBoardHistory] = useState([initBoard()])
  const historyPoint = useRef(0)
  const [playersTurn, setPlayersTurn] = useState(true)
  const playerFirst = useRef(true)
  const [playerToken, setPlayerToken] = useState(TOKENS.X)
  const [cpuToken, setCpuToken] = useState(TOKENS.O)
  const [playerTokenColor, setPlayerTokenColor] = useState(null)
  const [cpuTokenColor, setCpuTokenColor] = useState(null)

  useEffect(() => {
    resetGame(true)
  }, [gridSize, playerToken])

  useEffect(() => {
    if (!playersTurn) {
      // AI
    }
  }, [playersTurn])

  function initBoard() {
    return Array(gridSize * gridSize).fill(null)
  }

  function resetGame(userOverride = false) {
    setGameOverMessage("?") // temp
    isGameOver.current = false
    historyPoint.current = 0
    setPlayersTurn(userOverride ? true : playerFirst.current)
    setBoardHistory([initBoard()])
    setBoard(initBoard())
  }

  function onGameOver(result) {
    isGameOver.current = true
    playerFirst.current = !playerFirst.current
    setBoardHistory([initBoard()])
    setGameOverMessage(result ? `Winner: ${result}` : "Draw")
  }

  function onHistoryClick(forward = false) {
    const direction = forward ? 1 : -1
    historyPoint.current += direction
    setPlayersTurn(!playersTurn) //remove for player/cpu
    setBoard(boardHistory[historyPoint.current])
  }

  // Used by both player and cpu to place their tokens on the board
  function onCellClick(cellID) {
    if (isGameOver.current) {
      resetGame()
      return
    }
    if (board[cellID]) return

    const currentToken = playersTurn ? playerToken : cpuToken
    const newBoard = board.map((val, idx) => {
      return idx === cellID ? currentToken : val
    })
    const newHistory = [...boardHistory.slice(0, historyPoint.current + 1), newBoard]
    historyPoint.current = newHistory.length - 1
    setBoard(newBoard)
    setBoardHistory(newHistory)
    setPlayersTurn(!playersTurn)
  }

  return (
    <div className='container-xxl'>
      <Header />
      <main className="pt-5">
        <Board
          board={board}
          gridSize={gridSize}
          onGameOver={onGameOver}
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