import React from 'react'
import SettingsSectionHeader from './SettingsSectionHeader.tsx'
import SettingsList from './SettingsList.tsx'

type SettingsSectionProps = {
  title: string
  children?: React.ReactNode
}

function SettingsSection(props: SettingsSectionProps) {
  return (
    <>
      <SettingsSectionHeader>{props.title}</SettingsSectionHeader>
      <SettingsList>{props.children}</SettingsList>
    </>
  )
}

export default SettingsSection
