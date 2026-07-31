import React, { forwardRef } from 'react'
import classNames from 'classnames'

type TextInputProps = {
  label: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <div className="flex-1 flex flex-col">
      <label
        htmlFor="task-description-input"
        className="text-sm text-neutral-200"
      >
        {props.label}
      </label>
      <input
        id="task-description-input"
        type="text"
        className={classNames(
          'mt-1 px-2 py-2 rounded-md bg-neutral-700 ',
          'focus-visible:outline-2 outline-white'
        )}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        ref={ref}
        autoComplete="off"
      />
    </div>
  )
})

TextInput.displayName = 'TextInput'

export default TextInput
