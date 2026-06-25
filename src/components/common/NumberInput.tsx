import React, { useRef, useState } from 'react'

type NumberInputProps = {
  id?: string
  value: number
  setValue: (value: number) => void
  minValue?: number
  className?: string
}

function NumberInput(props: NumberInputProps) {
  const [innerValue, setInnerValue] = useState(props.value.toString())
  const inputRef = useRef<HTMLInputElement | null>(null)

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
    <input
      ref={inputRef}
      id={props.id}
      type="text"
      value={innerValue}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      autoComplete="off"
      className={props.className}
    />
  )
}

export default NumberInput
