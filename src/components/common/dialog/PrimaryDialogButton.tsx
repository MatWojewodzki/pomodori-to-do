import React from 'react'
import classNames from 'classnames'

type PrimaryDialogButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function PrimaryDialogButton(props: PrimaryDialogButtonProps) {
  return (
    <button
      className={classNames(
        'px-4 py-1 text-sm rounded-sm bg-white text-black cursor-pointer',
        'hover:bg-neutral-200 focus:outline-none focus-visible:bg-neutral-200'
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}

export default PrimaryDialogButton
