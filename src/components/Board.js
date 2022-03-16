import { useEffect, useState } from "react"
import Cell from "./Cell"

export default function Board({ grid, gridSize, cellClicked }) {

  const [board, setBoard] = useState([])

  useEffect(() => {
    // Board gets recalculated everytime the grid changes. Whether this is efficient or not...I dunno lol.
    setBoard(() => {
      // console.log("updating board")
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
          arr.push(<Cell key={i} cellID={i} cellValue={grid[i]} borders={borders} onClick={cellClicked} />)
          i++
        }
      }
      return arr
    })
  }, [grid])



  return (
    <div className="container board ratio ratio-1x1 g-0">
      <div className={`grid row row-cols-${gridSize} g-0`}>
        {board}
      </div>
    </div>
  )
}