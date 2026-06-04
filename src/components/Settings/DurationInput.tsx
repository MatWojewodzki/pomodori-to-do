import classNames from 'classnames'
import { ChangeEvent, forwardRef, useImperativeHandle, useRef } from 'react'

type DurationInputProps = {
  id: string
  value: string
  setValue: (value: string) => void
  focusNextInput?: () => void
  blurAfterFilled: boolean
}

export type DurationInputHandle = {
  focus: () => void
}

const DurationInput = forwardRef<DurationInputHandle, DurationInputProps>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }))

    function handleFocus() {
      inputRef.current?.select()
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      const newValue = e.target.value.replace(/\D/g, '')
      const newValueClamped = parseInt(newValue) > 59 ? '59' : newValue

      if (newValueClamped.length === 2) {
        props.focusNextInput?.()
        if (props.blurAfterFilled) {
          inputRef.current?.blur()
        }
      }
      props.setValue(newValueClamped.slice(-2))
    }

    function handleBlur() {
      props.setValue(props.value.padStart(2, '0'))
    }

    return (
      <input
        id={props.id}
        ref={inputRef}
        type="text"
        className={classNames(
          'w-[4ch] text-center tabular-nums',
          'rounded-md bg-neutral-700 border border-neutral-600',
          'focus-visible:outline-2 outline-neutral-300'
        )}
        value={props.value}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
    )
  }
)

export default DurationInput
