import SettingsSectionHeader from './SettingsSectionHeader.tsx'
import DurationSetting from './DurationSetting.tsx'
import SettingsList from './SettingsList.tsx'
import NumberSetting from './NumberSetting.tsx'

function Settings() {
  return (
    <div>
      <SettingsSectionHeader>Timer</SettingsSectionHeader>
      <SettingsList>
        <DurationSetting label="Work duration" />
        <DurationSetting label="Short break duration" />
        <DurationSetting label="Long break duration" />
        <NumberSetting
          label="Number of pomodoro cycles between long breaks"
          minValue={1}
        />
      </SettingsList>
    </div>
  )
}

export default Settings
