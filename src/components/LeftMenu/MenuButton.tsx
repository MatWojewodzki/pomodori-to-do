import React from 'react'
import classNames from 'classnames'

type MenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton(props, ref) {
    const { className, ...rest } = props
    return (
      <button
        className={classNames(
          'p-1 flex items-center gap-2 rounded-sm cursor-pointer ',
          'text-sm text-nowrap overflow-x-hidden',
          'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500',
          className
        )}
        {...rest}
        ref={ref}
      />
    )
  }
)

export default MenuButton
