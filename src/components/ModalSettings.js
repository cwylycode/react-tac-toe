import ModalBase from "./ModalBase";

function UIDropdown({ options = { name: "option name", value: "" }, onChange }) {
  return (
    <select defaultValue="0" onChange={onChange} className="form-select w-auto" aria-label="Select">
      <option value="0">Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  )
}

function UIBtnGrp({ }) {
  return (
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
      <label className="btn btn-outline-primary" htmlFor="btnradio1">Radio 1</label>

      <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
      <label className="btn btn-outline-primary" htmlFor="btnradio2">Radio 2</label>

      <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
      <label className="btn btn-outline-primary" htmlFor="btnradio3">Radio 3</label>
    </div>
  )
}

function Setting({ controller, description, tooltip }) {
  return (
    <div className="d-flex justify-content-between pb-3">
      <h6>{description}</h6>
      {controller}
    </div>
  )
}

export default function ModalSettings({ onResetClick }) {
  const contextButtons = <>
    <button
      onClick={onResetClick}
      type="button"
      className="btn btn-bs btn-danger">
      Reset
    </button></>
  return (
    <ModalBase id={"settings-modal"} title={"Settings"} contextButtons={contextButtons}>
      <div className="d-flex justify-content-between pb-3">
        <h6>Enable Dark Mode</h6>
        <div className="form-check form-switch">
          <input className="toggle form-check-input" type="checkbox" role="switch" id="toggle-dark-mode"></input>
        </div>
      </div>
      <div>

      </div>
      <div className="d-flex justify-content-between pb-3">
        <h6>Player Color</h6>
        <UIDropdown />
      </div>
    </ModalBase>
  )
}