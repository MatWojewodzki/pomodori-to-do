import SettingsSectionHeader from './SettingsSectionHeader'
import SettingsList from './SettingsList'
import DurationSetting from './DurationSetting'
import NumberSetting from './NumberSetting'
import { SettingsDto } from '../../types/generated/SettingsDto.ts'
import { useState } from 'react'

type SettingsFormProps = {
  settings: SettingsDto
}

function SettingsForm(props: SettingsFormProps) {
  const [workDuration, setWorkDuration] = useState(props.settings.work_duration)
  const [shortBreakDuration, setShortBreakDuration] = useState(
    props.settings.short_break_duration
  )
  const [longBreakDuration, setLongBreakDuration] = useState(
    props.settings.long_break_duration
  )
  const [pomodoriBetweenLongBreaks, setPomodoriBetweenLongBreaks] = useState(
    props.settings.pomodori_between_long_breaks
  )

  return (
    <>
      <SettingsSectionHeader>Timer</SettingsSectionHeader>
      <SettingsList>
        <DurationSetting
          label="Work duration"
          value={workDuration}
          setValue={setWorkDuration}
        />
        <DurationSetting
          label="Short break duration"
          value={shortBreakDuration}
          setValue={setShortBreakDuration}
        />
        <DurationSetting
          label="Long break duration"
          value={longBreakDuration}
          setValue={setLongBreakDuration}
        />
        <NumberSetting
          label="Number of pomodoro cycles between long breaks"
          value={pomodoriBetweenLongBreaks}
          setValue={setPomodoriBetweenLongBreaks}
          minValue={1}
        />
      </SettingsList>
    </>
  )
}

export default SettingsForm
