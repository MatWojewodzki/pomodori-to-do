import React from 'react'

type SettingsSectionHeaderProps = {
  children?: React.ReactNode
}

function SettingsSectionHeader(props: SettingsSectionHeaderProps) {
  return <h2 className="mt-6 mb-3 text-lg">{props.children}</h2>
}

export default SettingsSectionHeader
