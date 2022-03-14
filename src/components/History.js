import { MdHistory } from "react-icons/md"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineArrowRight } from "react-icons/ai"

export default function History() {
  return (
    <div className="d-flex justify-content-center pt-3">
      <button className="btn p-1 me-5 fs-2" type="button" title="Go Backward"><AiOutlineArrowLeft /></button>
      <div className="p-1 fs-1" title="History"><MdHistory /></div>
      <button className="btn p-1 ms-5 fs-2" type="button" title="Go Forward"><AiOutlineArrowRight /></button>
    </div>
  )
}