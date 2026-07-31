import { DropdownMenu } from 'radix-ui'
import classNames from 'classnames'
import React from 'react'

type DropdownMenuItemProps = {
  className?: string
  onSelect?: (e: Event) => void
  children?: React.ReactNode
}

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(function DropdownMenuItem(props, ref) {
  const { className, ...rest } = props
  return (
    <DropdownMenu.Item
      className={classNames(
        'flex justify-start items-center gap-4 px-4 py-2 cursor-pointer',
        'hover:bg-neutral-800 focus:outline-none focus-visible:bg-neutral-800',
        props.className
      )}
      ref={ref}
      {...rest}
    >
      {props.children}
    </DropdownMenu.Item>
  )
})

export default DropdownMenuItem
