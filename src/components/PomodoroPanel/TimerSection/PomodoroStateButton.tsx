import React from 'react'
import classNames from 'classnames'

type PomodoroStateButtonProps = {
  active: boolean
  onClick: () => void
  children?: React.ReactNode
}

function PomodoroStateButton(props: PomodoroStateButtonProps) {
  return (
    <button
      role="radio"
      className={classNames(
        'px-2 py-1 rounded-lg cursor-pointer border-2 border-white',
        'hover:bg-neutral-200 hover:border-neutral-200 hover:text-black',
        'focus:outline-none focus-visible:bg-neutral-200',
        'focus-visible:border-neutral-200 focus-visible:text-black',
        { 'bg-white text-black': props.active }
      )}
      onClick={props.onClick}
      aria-checked={props.active}
    >
      {props.children}
    </button>
  )
}

export default PomodoroStateButton
