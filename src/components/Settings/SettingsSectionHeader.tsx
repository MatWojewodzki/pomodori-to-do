import React from 'react'

type SettingsSectionHeaderProps = {
  children?: React.ReactNode
}

function SettingsSectionHeader(props: SettingsSectionHeaderProps) {
  return <h2 className="mt-8 mb-4 text-lg">{props.children}</h2>
}

export default SettingsSectionHeader
