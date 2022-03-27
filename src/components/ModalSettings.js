import ModalBase from "./ModalBase";

export default function ModalSettings(onResetClick) {
  const contextButtons = <>
    <button
      onClick={() => onResetClick()}
      type="button"
      className="btn btn-danger">
      Reset
    </button></>
  return (
    <ModalBase id={"settings-modal"} title={"Settings"} contextButtons={contextButtons}>
      <p>Hello settings</p>
    </ModalBase>
  )
}