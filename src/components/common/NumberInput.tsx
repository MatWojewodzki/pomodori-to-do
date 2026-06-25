import React, { useRef, useState } from 'react'

type NumberInputProps = {
  id?: string
  value: number
  setValue: (value: number) => void
  minValue?: number
  className?: string
}

function NumberInput(props: NumberInputProps) {
  const [draft, setDraft] = useState(props.value.toString())
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  function updateValue(newValue: string) {
    if (newValue.length === 0) {
      props.setValue(props.minValue ? props.minValue : 0)
    } else if (props.minValue && parseInt(newValue) < props.minValue) {
      props.setValue(props.minValue)
    } else {
      props.setValue(parseInt(newValue))
    }
  }

  function handleFocus() {
    setDraft(props.value.toString())
    setIsEditing(true)
    inputRef.current?.select()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.replace(/\D/g, '')
    setDraft(newValue)
    updateValue(newValue)
  }

  function handleBlur() {
    setIsEditing(false)
  }

  return (
    <input
      ref={inputRef}
      id={props.id}
      type="text"
      value={isEditing ? draft : props.value}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      autoComplete="off"
      className={props.className}
    />
  )
}

export default NumberInput
