import React from "react";
import ModalBase from "./ModalBase";
import { AILEVELS, COLORS, GRIDSIZES, TOKENS } from "../lib/constants"
import {
  BsMoonStars,
  BsVolumeUp,
  BsSpeedometer,
  BsHash,
  BsPerson,
  BsPalette,
} from "react-icons/bs"

function UIDropdown({ id, state, setState, selections }) {
  const options = Object.keys(selections).map((x) => {
    return (
      <option
        key={x}
        value={selections[x].value}
      >{selections[x].name}</option>
    )
  })

  return (
    <select
      id={id}
      className="form-select btn-outline-secondary w-auto"
      value={state}
      onChange={(e) => { setState(id, e.target.value) }}
      aria-label="Select"
    >{options}</select>
  )
}

function UIButtonGroup({ id, state, setState, selections }) {
  const buttons = Object.keys(selections).map((x) => {
    return (
      <React.Fragment key={x}>
        <input
          id={id + x}
          type="radio"
          className="btn-check"
          checked={state === selections[x].value}
          onChange={() => { setState(id, selections[x].value) }}
          name={selections[x].name}
          value={selections[x].value}
          autoComplete="off"
        ></input>
        <label
          className={"btn btn-outline-secondary"}
          htmlFor={id + x}
        >{selections[x].name}</label>
      </React.Fragment>
    )
  })

  return (
    <div className="btn-group" role="group" aria-label="Button group setting">
      {buttons}
    </div>
  )
}

function UIToggle({ id, state, setState }) {
  return (
    <div className="form-check form-switch">
      <input
        id={id}
        className="toggle form-check-input" type="checkbox" role="switch"
        checked={state}
        onChange={() => { setState(id, !state) }}

      ></input>
    </div>
  )
}

function Setting({ children, description, icon, classes }) {
  return (
    <div className={classes}>
      <div className="d-flex align-items-center">
        <div className="fs-4">{icon}</div>
        <p className="m-0 ms-3">{description}</p>
      </div>
      {children}
    </div>
  )
}

export default function ModalSettings({ onResetClick, settings, changeSetting }) {

  const contextButtons = <>
    <button
      onClick={onResetClick}
      type="button"
      className="btn btn-bs btn-danger">
      Reset
    </button></>

  return (
    <ModalBase id={"settings-modal"} title={"Settings"} contextButtons={contextButtons}>

      <Setting
        description={"Dark Mode"}
        icon={<BsMoonStars style={{ translate: "0 -4px" }} />}
        classes={"d-flex align-items-center justify-content-between pb-3"}>
        <UIToggle
          id={"darkModeActive"}
          state={settings.darkModeActive}
          setState={changeSetting}>
        </UIToggle>
      </Setting>

      <Setting
        description={"Sounds"}
        icon={<BsVolumeUp style={{ translate: "0 -4px" }} />}
        classes={"d-flex align-items-center justify-content-between pb-3"}>
        <UIToggle
          id={"soundActive"}
          state={settings.soundActive}
          setState={changeSetting}>
        </UIToggle>
      </Setting>

      <Setting
        description={"AI Intelligence"}
        icon={<BsSpeedometer style={{ translate: "0 -4px" }} />}
        classes={"d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between pb-3"}>
        <UIButtonGroup
          id={"aiDifficulty"}
          state={settings.aiDifficulty}
          setState={changeSetting}
          selections={AILEVELS}>
        </UIButtonGroup>
      </Setting>

      <Setting
        description={"Grid Size"}
        icon={<BsHash style={{ translate: "0 -4px" }} />}
        classes={"d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between pb-3"}>
        <UIButtonGroup
          id={"gridSize"}
          state={settings.gridSize}
          setState={changeSetting}
          selections={GRIDSIZES}>
        </UIButtonGroup>
      </Setting>

      <Setting
        description={"Player Token"}
        icon={<BsPerson style={{ translate: "0 -4px" }} />}
        classes={"d-flex align-items-center justify-content-between pb-3"}>
        <UIButtonGroup
          id={"playerToken"}
          state={settings.playerToken}
          setState={changeSetting}
          selections={TOKENS}>
        </UIButtonGroup>
      </Setting>

      <Setting
        description={"Player Color"}
        icon={<BsPalette style={{ translate: "0 -4px" }} />}
        classes={"d-flex align-items-center justify-content-between pb-3"}>
        <UIDropdown
          id={"playerTokenColor"}
          state={settings.playerTokenColor}
          setState={changeSetting}
          selections={COLORS}>
        </UIDropdown>
      </Setting>

      <Setting
        description={"Computer Color"}
        icon={<BsPalette style={{ translate: "0 -4px" }} />}
        classes={"d-flex align-items-center justify-content-between pb-3"}>
        <UIDropdown
          id={"cpuTokenColor"}
          state={settings.cpuTokenColor}
          setState={changeSetting}
          selections={COLORS}>
        </UIDropdown>
      </Setting>

    </ModalBase>
  )
}