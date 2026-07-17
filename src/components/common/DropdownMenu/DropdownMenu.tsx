import { DropdownMenu as RadixDropdownMenu } from 'radix-ui'
import classNames from 'classnames'
import Tooltip from '../Tooltip.tsx'
import MoreVertIcon from '../../../assets/icons/more_vert_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import React from 'react'

type DropdownMenuProps = {
  tooltipText: string
  triggerLabel: string
  children?: React.ReactNode
}

function DropdownMenu(props: DropdownMenuProps) {
  return (
    <RadixDropdownMenu.Root>
      <Tooltip text={props.tooltipText}>
        <RadixDropdownMenu.Trigger
          aria-label={props.triggerLabel}
          className={classNames(
            'p-1 absolute z-10 right-3 top-3.5 rounded-md cursor-pointer',
            'hover:bg-neutral-800 focus:outline-none focus-visible:bg-neutral-800',
            'invisible group-hover:visible group-focus-within:visible'
          )}
        >
          <MoreVertIcon className="size-5" />
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
