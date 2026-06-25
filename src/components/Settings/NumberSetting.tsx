import classNames from 'classnames'
import React from 'react'
import Setting from './Setting.tsx'
import NumberInput from '../common/NumberInput.tsx'

type NumberSettingProps = {
  label: string
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  minValue?: number
}

function NumberSetting(props: NumberSettingProps) {
  const inputId = `${props.label}-number-setting`
  return (
    <Setting label={props.label} inputId={inputId}>
      <NumberInput
        id={inputId}
        value={props.value}
        setValue={props.setValue}
        minValue={props.minValue}
        className={classNames(
          'w-[4ch] text-center tabular-nums',
          'rounded-md bg-neutral-700 border border-neutral-600',
          'focus-visible:outline-2 outline-neutral-300'
        )}
      />
    </Setting>
  )
}

export default NumberSetting
