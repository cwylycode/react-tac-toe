import "./index.css"
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { TOKENS } from "./lib/constants"
import Header from './components/Header'
import Board from "./components/Board"
import History from "./components/History"

function App() {
  const [boardValues, setBoardValues] = useState([null])
  const [boardHistory, setBoardHistory] = useState([])
  const [historyPoint, setHistoryPoint] = useState(false)
  const [historyBtnClicked, setHistoryBtnClicked] = useState(false)
  const [isPlayerStarting, setIsPlayerStarting] = useState(true)
  const [gameFinished, setGameFinished] = useState(false)
  // Settings
  const [gridSize, setGridSize] = useState(3)
  const [playerToken, setPlayerToken] = useState(TOKENS.X)
  const [cpuToken, setCpuToken] = useState(TOKENS.O)
  const [playerTokenColor, setPlayerTokenColor] = useState(null)
  const [cpuTokenColor, setCpuTokenColor] = useState(null)

  useEffect(() => {
    if (historyBtnClicked) {
      setHistoryBtnClicked(false)
      return
    }
    if (boardValues.every(v => { return v === null })) {
      // Delete board history since board is empty because of game reset
      clearHistory()
      setHistoryPoint(0)
      if (gameFinished) setIsPlayerStarting(prev => !prev)
      else setIsPlayerStarting(true)
      setGameFinished(false)
      return
    }
    const newHistory = [...boardHistory.slice(0, historyPoint + 1), boardValues]
    setBoardHistory(newHistory)
    setHistoryPoint(newHistory.length - 1)
  }, [boardValues])

  useEffect(() => {
    if (!historyBtnClicked) return
    setBoardValues(boardHistory[historyPoint])
  }, [historyPoint])

  function onGameOver(result) {
    clearHistory()
    setGameFinished(true)
    alert(`game over: ${result}`)
  }

  function onHistoryClick(forward = false) {
    setHistoryPoint(prev => forward ? prev + 2 : prev - 2)
    setHistoryBtnClicked(true)
  }

  function clearHistory() {
    setBoardHistory([Array(gridSize * gridSize).fill(null)])
  }

  return (
    <div className='container-xxl'>
      <Header />
      <main className="pt-5">
        <Board
          boardValues={boardValues}
          setBoardValues={setBoardValues}
          gridSize={gridSize}
          onGameOver={onGameOver}
          playerToken={playerToken}
          cpuToken={cpuToken}
        />
        <History
          currentPoint={historyPoint}
          historyLength={boardHistory.length}
          historyBuffer={isPlayerStarting ? 0 : 1}
          onClickBackward={() => { onHistoryClick(false) }}
          onClickForward={() => { onHistoryClick(true) }}
        />
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