import { MdHistory } from "react-icons/md"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useEffect, useState } from "react"

export default function History({ currentPoint, historyLength, onClickBackward, onClickForward }) {

  const [showBackBtn, setShowBackBtn] = useState(false)
  const [showNextBtn, setShowNextBtn] = useState(false)

  useEffect(() => {
    if (historyLength <= 2) {
      // No history
      setShowBackBtn(false)
      setShowNextBtn(false)
      return
    }
    if (currentPoint === historyLength - 1) {
      // Latest point in history, nothing forward
      setShowBackBtn(true)
      setShowNextBtn(false)
      return
    }
    if (currentPoint < 2) {
      // At history start, can only go forward
      setShowBackBtn(false)
      setShowNextBtn(true)
      return
    }
    if (currentPoint > 0) {
      // History in-between
      setShowBackBtn(true)
      setShowNextBtn(true)
      return
    }
  }, [currentPoint, historyLength])

  return (
    <div className="d-flex justify-content-center pt-3">
      <button
        className={`${showBackBtn ? "" : "invisible"} btn btn-anim btn-anim-ml p-1 me-5 fs-1`}
        type="button"
        // title="Previous"
        onClick={onClickBackward}
      ><AiOutlineArrowLeft />
      </button>
      <div className={`${showBackBtn || showNextBtn ? "" : "invisible"} p-1 fs-1`} title="History"><MdHistory /></div>
      <button
        className={`${showNextBtn ? "" : "invisible"} btn btn-anim btn-anim-mr p-1 ms-5 fs-1`}
        type="button"
        // title="Next"
        onClick={onClickForward}
      ><AiOutlineArrowRight />
      </button>
    </div>
  )
}