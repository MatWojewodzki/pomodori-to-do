import React from 'react'
import classNames from 'classnames'

type SecondaryDialogButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function SecondaryDialogButton(props: SecondaryDialogButtonProps) {
  return (
    <button
      className={classNames(
        'px-4 py-1 text-sm rounded-sm border-2 border-white cursor-pointer',
        'hover:bg-neutral-200 focus:outline-none focus-visible:bg-neutral-200',
        'hover:border-neutral-200 focus-visible:border-neutral-200 hover:text-black focus-visible:text-black'
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}

export default SecondaryDialogButton
