import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import Setting from './Setting.tsx'

type NumberSettingProps = {
  label: string
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  minValue?: number
}

function NumberSetting(props: NumberSettingProps) {
  const [innerValue, setInnerValue] = useState(props.value.toString())
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputId = `${props.label}-numberInput`

  function handleFocus() {
    inputRef.current?.select()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.replace(/\D/g, '')
    setInnerValue(newValue)
    props.setValue(newValue.length === 0 ? 0 : parseInt(newValue))
  }

  function handleBlur() {
    if (innerValue.length === 0) {
      const newValue = props.minValue ? props.minValue : 0
      setInnerValue(newValue.toString())
      props.setValue(newValue)
    } else if (props.minValue && parseInt(innerValue) < props.minValue) {
      setInnerValue(props.minValue.toString())
      props.setValue(props.minValue)
    }
  }

  return (
    <Setting label={props.label} inputId={inputId}>
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        className={classNames(
          'w-[4ch] text-center tabular-nums',
          'rounded-md bg-neutral-700 border border-neutral-600',
          'focus-visible:outline-2 outline-neutral-300'
        )}
        value={innerValue}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
    </Setting>
  )
}

export default NumberSetting
