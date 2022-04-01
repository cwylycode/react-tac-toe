import React from "react";
import ModalBase from "./ModalBase";
import { AILEVELS, COLORS, GRIDSIZES, TOKENS } from "../lib/constants"
import {
  BsMoonStars,
  BsSpeedometer,
  BsHash,
  BsPerson,
  BsPalette,
} from "react-icons/bs"

const iconStyle = { translate: "0 -4px" }

function UIDropdown({ id, state, setState, selections }) {
  const optionElements = function () {
    const els = []
    for (var x in selections) {
      els.push(<option key={x} value={selections[x].value}>{selections[x].name}</option>)
    }
    return els
  }()
  return (
    <select id={id} className="form-select w-auto" aria-label="Select" onChange={(e) => { setState(id, e.target.value) }} >
      {optionElements}
    </select>
  )
}

function UIBtnGrp({ id, state, setState, selections }) {
  const btnElements = function () {
    const els = []
    for (var x in selections) {
      els.push(<React.Fragment key={x}>
        <input id={id + x} type="radio" onChange={(e) => { setState(id, e.target.value) }} className="btn-check" name={selections[x].name} value={selections[x].value} autoComplete="off" checked={state == selections[x].value} />
        <label className={"btn btn-outline-secondary"} htmlFor={id + x}>{selections[x].name}</label>
      </React.Fragment>
      )
    }
    return els
  }()

  return (
    <div className="btn-group" role="group" aria-label="Button group setting">
      {btnElements}
    </div>
  )
}

function UIToggle({ id, state, setState }) {
  return (
    <div className="form-check form-switch">
      <input id={id} checked={state} onChange={() => { setState(id, !state) }} className="toggle form-check-input" type="checkbox" role="switch"></input>
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
        icon={<BsMoonStars style={iconStyle} />}
        classes={"d-flex align-items-center justify-content-between pb-3"}>
        <UIToggle
          id={"darkModeActive"}
          state={settings.darkModeActive}
          setState={changeSetting}>
        </UIToggle>
      </Setting>

      <Setting
        description={"AI Intelligence"}
        icon={<BsSpeedometer style={iconStyle} />}
        classes={"d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between pb-3"}>
        <UIBtnGrp
          id={"aiDifficulty"}
          state={settings.aiDifficulty}
          setState={changeSetting}
          selections={AILEVELS}>
        </UIBtnGrp>
      </Setting>

      <Setting
        description={"Grid Size"}
        icon={<BsHash style={iconStyle} />}
        classes={"d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between pb-3"}>
        <UIBtnGrp
          id={"gridSize"}
          state={settings.gridSize}
          setState={changeSetting}
          selections={GRIDSIZES}>
        </UIBtnGrp>
      </Setting>

      <Setting
        description={"Player Token"}
        icon={<BsPerson style={iconStyle} />}
        classes={"d-flex align-items-center justify-content-between pb-3"}>
        <UIBtnGrp
          id={"playerToken"}
          state={settings.playerToken}
          setState={changeSetting}
          selections={TOKENS}>
        </UIBtnGrp>
      </Setting>

      <Setting
        description={"Player Color"}
        icon={<BsPalette style={iconStyle} />}
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
        icon={<BsPalette style={iconStyle} />}
        classes={"d-flex align-items-center justify-content-between pb-3"}>
        <UIDropdown selections={COLORS} />
      </Setting>

    </ModalBase>
  )
}