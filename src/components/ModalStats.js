import { useEffect, useState } from "react";
import ModalBase from "./ModalBase";
import {
  FaRegSmile,
  FaRegFrown,
  FaRegMeh,
  FaRegGrinSquint,
} from "react-icons/fa"

function StatBar({ title, icon, statCount, statPercentage }) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center" style={{ width: "7em", height: "2.5em" }}>
        <div className="fs-2">{icon}</div>
        <p className="m-0 ms-2">{title}</p>
        <div className="ms-auto bg-dark" style={{ width: "2px", height: "100%" }}></div>
      </div>
      <div className="flex-fill">
        <div className="bg-dark rounded-end" style={{ maxWidth: `${statPercentage}%`, minHeight: "1em" }}></div>
      </div>
      <div className="d-flex align-items-center" style={{ width: "2.5em", height: "2.5em" }}>
        <div className="bg-dark" style={{ width: "2px", height: "100%" }}></div>
        <p className="m-0 ms-auto">{statCount > 999 ? 999 : statCount}</p>
      </div>
    </div>
  )
}

export default function ModalStats({ stats, changeStat, onResetClick }) {

  const contextButtons = <>
    <button
      onClick={onResetClick}
      type="button"
      className="btn btn-bs btn-danger">
      Reset
    </button></>

  const [prevWinCount, setPrevWinCount] = useState(stats.wins)
  const [streak, setStreak] = useState(0)
  const totals = stats.wins + stats.losses + stats.draws + stats.cheated

  useEffect(() => {
    if (stats.wins && stats.wins !== prevWinCount) {
      setStreak(prev => prev + 1)
      setPrevWinCount(stats.wins)
    } else {
      if (stats.wins && stats.streak < streak) changeStat("streak", streak)
      setStreak(0)
    }
  }, [stats])

  function getPercent(x) { return totals ? Math.floor(x / totals * 100) : 0 }

  return (
    <ModalBase id={"stats-modal"} title={"Statistics"} contextButtons={contextButtons}>
      <div className="d-flex justify-content-between">
        <div className="text-center">
          <h3>{totals}</h3>
          <p>Total Games</p>
        </div>
        <div className="text-center">
          <h3>{streak}</h3>
          <p>Current Streak</p>
        </div>
        <div className="text-center">
          <h3>{stats.streak}</h3>
          <p>Best Streak</p>
        </div>
        <div className="text-center">
          <h3>{getPercent(stats.wins)}%</h3>
          <p>Win Rate</p>
        </div>
      </div>
      <div className="mt-2">
        <StatBar
          title={"Wins"}
          icon={<FaRegSmile style={{ translate: "0 -4px" }} />}
          statCount={stats.wins}
          statPercentage={getPercent(stats.wins)}
        />
        <StatBar
          title={"Losses"}
          icon={<FaRegFrown style={{ translate: "0 -4px" }} />}
          statCount={stats.losses}
          statPercentage={getPercent(stats.losses)}
        />
        <StatBar
          title={"Draws"}
          icon={<FaRegMeh style={{ translate: "0 -4px" }} />}
          statCount={stats.draws}
          statPercentage={getPercent(stats.draws)}
        />
        <StatBar
          title={"Cheated"}
          icon={<FaRegGrinSquint style={{ translate: "0 -4px" }} />}
          statCount={stats.cheated}
          statPercentage={getPercent(stats.cheated)}
        />
      </div>
    </ModalBase>
  )
}