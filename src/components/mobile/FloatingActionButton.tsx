import React from 'react'
import classNames from 'classnames'

type FloatingActionButtonProps = {
  label: string
  onClick?: () => void
  children: React.ReactNode
}

function FloatingActionButton(props: FloatingActionButtonProps) {
  return (
    <button
      aria-label={props.label}
      className={classNames(
        'absolute right-6 bottom-6 p-4 rounded-md cursor-pointer',
        'bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-600',
        'focus:outline-none focus-visible:bg-neutral-600'
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default FloatingActionButton
