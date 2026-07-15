import React from 'react'
import classNames from 'classnames'

type MenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function MenuButton(props: MenuButtonProps) {
  const { className, ...rest } = props
  return (
    <button
      className={classNames(
        'p-1 rounded-sm cursor-pointer',
        'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500',
        className
      )}
      {...rest}
    />
  )
}

export default MenuButton
