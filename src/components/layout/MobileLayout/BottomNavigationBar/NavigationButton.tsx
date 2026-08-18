import React from 'react'
import classNames from 'classnames'

type NavigationButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  icon: React.ReactElement
  text: string
  isSelected: boolean
  select: () => void
}

const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>(function NavigationButton(props, ref) {
  const { icon, text, className, isSelected, select, ...rest } = props
  return (
    <button
      ref={ref}
      className={classNames(
        'flex flex-col gap-1 p-2 cursor-pointer',
        'focus:outline-none group',
        className
      )}
      onClick={select}
      {...rest}
    >
      <span
        className={classNames(
          'px-2 py-1 flex justify-center rounded-md',
          'group-hover:bg-neutral-600',
          'group-focus-visible:bg-neutral-600',
          { 'bg-neutral-700': props.isSelected }
        )}
      >
        {icon}
      </span>
      <span className="font-semibold text-sm">{text}</span>
    </button>
  )
})

export default NavigationButton
