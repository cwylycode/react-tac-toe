import { LINES } from "../lib/constants.js"
import Cell from "./Cell"

import { useEffect, useState } from "react"

export default function Board({ gridSize, onGameOver, playerToken, cpuToken, history }) {

  const [boardValues, setBoardValues] = useState(null)
  const [grid, setGrid] = useState([])
  const [winningLines, setWinningLines] = useState([])
  const [playersTurn, setPlayersTurn] = useState(true)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    reset(true) // Manually reset board if game-breaking settings change
  }, [gridSize, playerToken])

  useEffect(() => {
    // Prevent rendering the grid twice on startup
    if (boardValues) updateGrid()
    if (status) onGameOver(status)
  }, [boardValues, status]) // Status needed for cell-click reset to work

  useEffect(() => {
    if (!boardValues) return
    const arr = Array(gridSize)
    for (let line of winningLines) {
      for (let i = 0; i < gridSize; i++) arr[i] = boardValues[line[i]]
      // Winner declared, return token
      if (arr.every(function (e) { return e === arr[0] })) setStatus(arr[0])
    }
    // All cells filled with no winner
    if (boardValues.every(function (e) { return e !== null })) setStatus("draw")
  }, [grid])

  function updateGrid() {
    setGrid(() => {
      const arr = []
      let i = 0
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          let borders = ""
          if (y === gridSize - 1) {
            if (x === gridSize - 1) borders = "border-top-0 border-end-0 border-bottom-0 border-start-0"
            else borders = "border-top-0 border-bottom-0 border-start-0"
          }
          else if (x === gridSize - 1) borders = "border-top-0 border-end-0 border-start-0"
          else borders = "border-top-0 border-start-0"
          arr.push(<Cell key={i} cellID={i} cellValue={boardValues[i]} borders={borders} handleClick={handleCellClick} />)
          i++
        }
      }
      return arr
    })
  }

  // Reset board and history - user override means user goes first, even if not their turn
  function reset(userOverride = false) {
    setBoardValues(Array(gridSize * gridSize).fill(null))
    setWinningLines(LINES[gridSize - 3])
    setStatus(null)
    setPlayersTurn(userOverride ? true : playersTurn)
  }

  // Both the player and computer will call this to place their tokens on the board
  function handleCellClick(cellID) {
    if (status) {
      reset()
      return
    }
    if (boardValues[cellID]) return
    const currentToken = playersTurn ? playerToken : cpuToken
    setBoardValues(prev => prev.map((val, idx) => {
      return idx === cellID ? currentToken : val
    }))
    setPlayersTurn(!playersTurn)
  }

  return (
    <div className="container board ratio ratio-1x1 g-0">
      <div className={`row row-cols-${gridSize} g-0`}>
        {grid}
      </div>
    </div>
  )
}