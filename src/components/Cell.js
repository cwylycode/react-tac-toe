import iconX from "../img/iconX.png"
import iconO from "../img/iconO.png"
import { TOKENS } from "../lib/constants.js"

import { useEffect, useState } from "react"

export default function Cell({ cellID, cellValue, borders, colors, gameOverStatus, onCellClick }) {

  const [icon, setIcon] = useState("")
  const [color, setColor] = useState("")
  const [strike, setStrike] = useState("")
  const [cellAnim, setCellAnim] = useState("")
  const [animBorder, setAnimBorder] = useState(false)

  useEffect(() => {
    if (cellValue) {
      setCellAnim("zoom-in")
      if (cellValue === TOKENS.X.value) {
        setIcon(iconX)
        setColor(colors[cellValue])
      }
      else if (cellValue === TOKENS.O.value) {
        setIcon(iconO)
        setColor(colors[cellValue])
      }
    } else {
      setCellAnim("zoom-out")
      setStrike("")
      setAnimBorder(false)
      const iconDelay = setTimeout(() => {
        setIcon("")
        setCellAnim("")
      }, 250);
      return () => { clearTimeout(iconDelay) }
    }
  }, [cellValue])

  useEffect(() => {
    if (gameOverStatus) {
      if (gameOverStatus === "draw") {
        setAnimBorder(true)
        return
      } else {
        const token = gameOverStatus.token
        const line = gameOverStatus.winLine
        const strikeType = function () {
          // A strike can be figured out by the first two cells
          const gridsize = line.length
          switch (line[1]) {
            case line[0] + 1: return "cell-strike-hor"
            case line[0] + gridsize + 1: return "cell-strike-ccw"
            case line[0] + gridsize - 1: return "cell-strike-cw"
            default: return "" // Default is a vertical
          }
        }()
        if (line.includes(cellID)) {
          // Winning cell - decorate with blinking animation and strikethrough
          setCellAnim("cell-blink")
          setStrike(`cell-blink cell-strike ${strikeType}`)
        }
      }
    }
  }, [gameOverStatus])

  return (
    <button id={cellID} type="button" onClick={() => (onCellClick(cellID))} className={`cell ${animBorder ? "border-blink" : ""} col btn position-relative rounded-0 border-5 ${borders}`}>
      <img className={`cell-icon ${color} ${cellAnim} ${cellAnim ? "" : "invisible"} position-absolute translate-middle`} src={icon}></img>
      <div className={`${strike} ${color}`}></div>
    </button>
  )
}