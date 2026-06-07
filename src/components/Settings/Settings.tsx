import DurationSetting from './DurationSetting'
import NumberSetting from './NumberSetting'
import React, { useState } from 'react'
import { Dialog } from 'radix-ui'
import classNames from 'classnames'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import settingsService from '../../services/tauri/settings.ts'
import SettingsSection from './SettingsSection.tsx'
import SwitchSetting from './SwitchSetting.tsx'
import useSettings from '../../hooks/useSettings.ts'

type SettingsFormProps = {
  closeDialog: () => void
}

function Settings(props: SettingsFormProps) {
  const settings = useSettings()
  const [workDuration, setWorkDuration] = useState(settings.work_duration)
  const [shortBreakDuration, setShortBreakDuration] = useState(
    settings.short_break_duration
  )
  const [longBreakDuration, setLongBreakDuration] = useState(
    settings.long_break_duration
  )
  const [pomodoriBetweenLongBreaks, setPomodoriBetweenLongBreaks] = useState(
    settings.pomodori_between_long_breaks
  )
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    settings.notifications_enabled
  )

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: settingsService.setSettings,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
      props.closeDialog()
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutation.mutate({
      settings: {
        work_duration: workDuration,
        short_break_duration: shortBreakDuration,
        long_break_duration: longBreakDuration,
        pomodori_between_long_breaks: pomodoriBetweenLongBreaks,
        notifications_enabled: notificationsEnabled,
      },
    })
  }

  return (
    <form className="grow flex flex-col" onSubmit={handleSubmit}>
      <div className="grow">
        <SettingsSection title="Notifications">
          <SwitchSetting
            label="Enable notifications"
            value={notificationsEnabled}
            setValue={setNotificationsEnabled}
          />
        </SettingsSection>
        <SettingsSection title="Timer">
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
        </SettingsSection>
      </div>
      <div className="mt-16 flex justify-end gap-4">
        <Dialog.Close
          type="button"
          className={classNames(
            'px-4 py-1 text-sm rounded-sm border-2 border-white cursor-pointer',
            'hover:bg-neutral-200 focus:outline-none focus-visible:bg-neutral-200',
            'hover:border-neutral-200 focus-visible:border-neutral-200 hover:text-black focus-visible:text-black'
          )}
        >
          Cancel
        </Dialog.Close>
        <button
          type="submit"
          className={classNames(
            'px-4 py-1 text-sm rounded-sm bg-white text-black cursor-pointer',
            'hover:bg-neutral-200 focus:outline-none focus-visible:bg-neutral-200'
          )}
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default Settings
