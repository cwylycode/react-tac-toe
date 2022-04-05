import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "./index.css"
import sound_win from "./sfx/win.mp3"
import sound_lose from "./sfx/lose.mp3"
import sound_draw from "./sfx/draw.mp3"
import sound_token1 from "./sfx/token1.mp3"
import sound_token2 from "./sfx/token2.mp3"

import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import useSound from "use-sound"

import * as AI from "./lib/ai"
import * as storage from "./lib/storage"
import { AILEVELS, COLORS, GRIDSIZES, TOGGLE, TOKENS } from "./lib/constants"

import Header from './components/Header'
import Board from "./components/Board"
import History from "./components/History"
import ModalInfo from "./components/ModalInfo"
import ModalStats from "./components/ModalStats"
import ModalSettings from "./components/ModalSettings"

const defaultSettings = {
  darkModeActive: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
  soundActive: true,
  aiDifficulty: AILEVELS.easy.value,
  gridSize: GRIDSIZES.three.value,
  playerToken: TOKENS.X.value,
  playerTokenColor: COLORS.None.value,
  cpuTokenColor: COLORS.None.value,
  cpuToken: TOKENS.O.value
}
const defaultStats = {
  wins: 0,
  losses: 0,
  draws: 0,
  cheated: 0,
  streak: 0
}

function App() {

  // Storage
  const [settings, setSettings] = useState(loadData("settings"))
  const [stats, setStats] = useState(loadData("stats"))

  // Sounds
  const [sfx_win] = useSound(sound_win)
  const [sfx_lose] = useSound(sound_lose)
  const [sfx_draw] = useSound(sound_draw)
  const [sfx_token1] = useSound(sound_token1)
  const [sfx_token2] = useSound(sound_token2)

  // Game states
  const isGameOver = useRef(false)
  const [gameOverStatus, setGameOverStatus] = useState("")
  const [gameResults, setGameResults] = useState("")
  const [didCheat, setDidCheat] = useState(false)
  const [board, setBoard] = useState(initBoard())
  const [boardHistory, setBoardHistory] = useState([initBoard()])
  const historyPoint = useRef(0)
  const playerFirst = useRef(true)
  const [playersTurn, setPlayersTurn] = useState(true)
  const canClick = useRef(true)

  useEffect(() => {
    // Saving
    storage.setData("settings", settings)
    storage.setData("stats", stats)
    storage.setData("secret", "WW91IGFyZSBjbGV2ZXIgdG8gaGF2ZSBnb3R0ZW4gdGhpcyBmYXIhIFNvIS4uLkRpZCB5b3UgZW5qb3kgbXkgdGljLXRhYy10b2UgZ2FtZT8gSWYgeW91IGRpZCwgZ2l2ZSBteSBHaXRIdWIgcmVwb3NpdG9yeSBhIHN0YXIgYW5kIHRoZW4gZ2l2ZSB5b3Vyc2VsZiBhIHBhdCBvbiB0aGUgYmFjay4=")
  }, [settings, stats])

  useEffect(() => {
    // Settings have been changed - reset game and update stuff
    resetGame(true)
    // CPU token is not really a setting, but still must be manually set when the player token gets changed - and yes, it all works despite not calling setSettings. I have no idea why.
    if (settings.playerToken === TOKENS.X.value) settings.cpuToken = TOKENS.O.value
    else settings.cpuToken = TOKENS.X.value
    AI.updateConfig(
      settings.playerToken,
      settings.cpuToken,
      settings.gridSize,
      settings.aiDifficulty
    )
    if (settings.darkModeActive) document.body.classList.add("dark")
    else document.body.classList.remove("dark")
  }, [settings])

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

  useEffect(() => {
    if (gameOverStatus) {
      // Give a flashy game over with blinking and sfx
      const delay = setTimeout(() => {
        canClick.current = true
        setGameResults(gameOverStatus)
        if (gameOverStatus === "draw") {
          playSound(sfx_draw)
        } else {
          if (gameOverStatus.token === settings.playerToken) {
            playSound(sfx_win)
          } else {
            playSound(sfx_lose)
          }
        }
      }, 1000)
      return () => clearTimeout(delay)
    }
  }, [gameOverStatus])

  function loadData(dataTypeToLoad) {
    const load = storage.getData(dataTypeToLoad)
    if (!load) return dataTypeToLoad === "settings" ? defaultSettings : defaultStats
    else return load
  }

  function changeSetting(k, val) {
    setSettings(prev => { return { ...prev, [k]: val } })
  }

  function changeStat(k, val) {
    setStats(prev => { return { ...prev, [k]: val } })
  }

  function playSound(sfx) {
    if (settings.soundActive) {
      sfx()
    }
  }

  function resetGame(userOverride = false) {
    setGameOverStatus("")
    setGameResults("")
    isGameOver.current = false
    historyPoint.current = 0
    // User override makes sure player goes first if setting changes resets the game
    if (userOverride) playerFirst.current = true
    setPlayersTurn(userOverride ? true : playerFirst.current)
    setDidCheat(false)
    setBoardHistory([initBoard()])
    setBoard(initBoard())
  }

  function onGameOver(result) {
    isGameOver.current = true
    playerFirst.current = !playerFirst.current
    canClick.current = false
    setBoardHistory([initBoard()])
    setGameOverStatus(result)
    // Figure out stats
    if (didCheat) {
      changeStat("cheated", stats.cheated + 1)
      return // Cheaters never win...well, usually they do :(
    }
    if (result === "draw") changeStat("draws", stats.draws + 1)
    else {
      if (result.token === settings.playerToken) changeStat("wins", stats.wins + 1)
      else changeStat("losses", stats.losses + 1)
    }
  }

  function onHistoryClick(forward = false) {
    if (!playersTurn) return
    setDidCheat(true) //Cheater cheater pumpkin eater
    const direction = forward ? 2 : -2
    historyPoint.current += direction
    setBoard(boardHistory[historyPoint.current])
  }

  // Player clicked on board cell
  function onCellClick(cellID) {
    if (!canClick.current) return
    if (isGameOver.current) {
      resetGame()
      return
    }
    if (board[cellID] || !playersTurn) return
    placeToken(cellID)
  }

  // Used by both player and cpu to place their tokens on the board
  function placeToken(cellID) {
    const currentToken = playersTurn ? settings.playerToken : settings.cpuToken
    playSound(currentToken === settings.playerToken ? sfx_token1 : sfx_token2)
    const newBoard = board.map((val, idx) => {
      return idx === cellID ? currentToken : val
    })
    const newHistory = [...boardHistory.slice(0, historyPoint.current + 1), newBoard]
    historyPoint.current = newHistory.length - 1
    setPlayersTurn(!playersTurn)
    setBoardHistory(newHistory)
    setBoard(newBoard)
  }

  function initBoard() {
    return Array(settings.gridSize * settings.gridSize).fill(null)
  }

  return (
    <div className='container-xxl'>
      <Header />
      <main className="pt-4">
        <Board
          board={board}
          gridSize={settings.gridSize}
          cellColors={{
            [settings.playerToken]: [settings.playerTokenColor],
            [settings.cpuToken]: [settings.cpuTokenColor]
          }}
          gameResults={gameResults}
          onCellClick={onCellClick}
        />
        <History
          currentPoint={historyPoint.current}
          historyLength={boardHistory.length}
          onClickBackward={() => { onHistoryClick(false) }}
          onClickForward={() => { onHistoryClick(true) }}
        />
      </main>
      <ModalInfo />
      <ModalStats
        onResetClick={() => { setStats(defaultStats) }}
        stats={stats}
        changeStat={changeStat}
      />
      <ModalSettings
        onResetClick={() => { setSettings(defaultSettings) }}
        settings={settings}
        changeSetting={changeSetting}
      />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)