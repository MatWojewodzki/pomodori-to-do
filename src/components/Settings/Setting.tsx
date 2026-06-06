import React from 'react'

type SettingProps = {
  label: string
  inputId: string
  children?: React.ReactNode
}

function Setting(props: SettingProps) {
  return (
    <li className="flex items-center gap-6">
      <label htmlFor={props.inputId} className="flex-1">
        {props.label}
      </label>
      {props.children}
    </li>
  )
}

export default Setting
