import classNames from 'classnames'
import React, { useState } from 'react'

type NumberSettingProps = {
  label: string
  minValue?: number
}

function NumberSetting(props: NumberSettingProps) {
  const [innerValue, setInnerValue] = useState('4')
  const inputId = `${props.label}-numberInput`

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.replace(/\D/g, '')
    setInnerValue(newValue)
  }

  function handleBlur() {
    if (innerValue.length === 0) {
      setInnerValue(props.minValue ? props.minValue.toString() : '0')
    } else if (props.minValue && parseInt(innerValue) < props.minValue) {
      setInnerValue(props.minValue.toString())
    }
  }

  return (
    <div className="py-3 flex items-center">
      <label htmlFor={inputId} className="flex-1">
        {props.label}
      </label>
      <input
        id={inputId}
        type="text"
        className={classNames(
          'w-[4ch] text-center tabular-nums',
          'rounded-md bg-neutral-700 border border-neutral-600'
        )}
        value={innerValue}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
    </div>
  )
}

export default NumberSetting
