import { DropdownMenu as RadixDropdownMenu } from 'radix-ui'
import classNames from 'classnames'
import Tooltip from '../Tooltip.tsx'
import MoreVertIcon20 from '../../../assets/icons/more_vert_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import MoreVertIcon24 from '../../../assets/icons/more_vert_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import React from 'react'

type DropdownMenuProps = {
  tooltipText: string
  triggerLabel: string
  children?: React.ReactNode
  triggerClassName?: string
  iconSize?: 20 | 24
}

function DropdownMenu(props: DropdownMenuProps) {
  const { iconSize = 20 } = props
  return (
    <RadixDropdownMenu.Root>
      <Tooltip text={props.tooltipText}>
        <RadixDropdownMenu.Trigger
          aria-label={props.triggerLabel}
          className={classNames(
            'p-1 rounded-md cursor-pointer',
            props.triggerClassName
          )}
        >
          {iconSize === 20 && <MoreVertIcon20 className="size-5" />}
          {iconSize === 24 && <MoreVertIcon24 className="size-6" />}
        </RadixDropdownMenu.Trigger>
      </Tooltip>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          align="end"
          sideOffset={4}
          className={classNames(
            'flex flex-col py-2 text-white text-sm rounded-md bg-neutral-900'
          )}
        >
          {props.children}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}

export default DropdownMenu
