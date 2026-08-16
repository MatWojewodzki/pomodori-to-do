import React from 'react'

type SettingsListProps = {
  children?: React.ReactNode
}

function SettingsList(props: SettingsListProps) {
  return <ul className="flex flex-col gap-3">{props.children}</ul>
}

export default SettingsList
