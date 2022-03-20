import "./index.css"
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { TOKENS } from "./lib/constants"
import Header from './components/Header'
import Board from "./components/Board"
import History from "./components/History"

function App() {

  const [gridSize, setGridSize] = useState(3)
  const [playerToken, setPlayerToken] = useState(TOKENS.X)
  const [cpuToken, setCpuToken] = useState(TOKENS.O)

  function onGameOver(result) {
    alert(`game over: ${result}`)
  }

  return (
    <div className='container-xxl'>
      <Header />
      <main className="pt-5">
        <Board
          gridSize={gridSize}
          onGameOver={onGameOver}
          playerToken={playerToken}
          cpuToken={cpuToken}
        />
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