import { MdHistory } from "react-icons/md"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineArrowRight } from "react-icons/ai"

export default function History() {
  return (
    <div className="d-flex justify-content-center pt-3">
      <button className="btn p-1 pe-5 fs-2" type="button" title="Go Back"><AiOutlineArrowLeft /></button>
      <div className="p-1 fs-1" title="History"><MdHistory /></div>
      <button className="btn p-1 ps-5 fs-2" type="button" title="Go Forward"><AiOutlineArrowRight /></button>
    </div>
  )
}