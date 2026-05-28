import DurationInput, { DurationInputHandle } from './DurationInput.tsx'
import { useRef, useState } from 'react'

type DurationSettingProps = {
  label: string
}

function DurationSetting(props: DurationSettingProps) {
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const secondsRef = useRef<DurationInputHandle | null>(null)

  const minutesInputId = `${props.label}-minutesInput`
  const secondsInputId = `${props.label}-secondsInput`

  return (
    <fieldset className="flex items-center py-3">
      <legend className="sr-only">{props.label}</legend>
      <div className="flex-1">{props.label}</div>
      <div className="flex items-center gap-1">
        <label htmlFor={minutesInputId} className="sr-only">
          Minutes
        </label>
        <DurationInput
          id={minutesInputId}
          value={minutes}
          setValue={setMinutes}
          blurAfterFilled={false}
          focusNextInput={() => secondsRef.current?.focus()}
        />
        <span>:</span>
        <label htmlFor={secondsInputId} className="sr-only">
          Seconds
        </label>
        <DurationInput
          id={secondsInputId}
          value={seconds}
          setValue={setSeconds}
          blurAfterFilled={true}
          ref={secondsRef}
        />
      </div>
    </fieldset>
  )
}

export default DurationSetting
