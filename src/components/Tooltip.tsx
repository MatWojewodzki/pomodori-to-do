import { Tooltip as RadixTooltip } from 'radix-ui'
import React from 'react'
import type { ComponentPropsWithoutRef } from 'react'

export type TooltipProps = {
  text: string
  children: React.ReactNode
} & Omit<ComponentPropsWithoutRef<typeof RadixTooltip.Content>, 'children'>

function Tooltip(props: TooltipProps) {
  const { text, children, ...contentProps } = props
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side="bottom"
          sideOffset={8}
          className="px-2 py-1 text-neutral-300 text-xs rounded-md bg-neutral-900"
          {...contentProps}
        >
          {text}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}

export default Tooltip
