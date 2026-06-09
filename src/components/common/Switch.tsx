import { Switch as RadixSwitch } from 'radix-ui'
import classNames from 'classnames'

type SwitchProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function Switch(props: SwitchProps) {
  return (
    <RadixSwitch.Root
      checked={props.checked}
      onCheckedChange={props.onCheckedChange}
      className={classNames(
        'relative w-12 h-7 rounded-full',
        'bg-neutral-600 data-[state=checked]:bg-neutral-500 focus:outline-none',
        'focus-visible:bg-neutral-500 focus-visible:data-[state=checked]:bg-neutral-400'
      )}
    >
      <RadixSwitch.Thumb
        className={classNames(
          'block size-5 rounded-full bg-white',
          'translate-x-1 data-[state=checked]:translate-x-6',
          'transition-transform duration-100'
        )}
      />
    </RadixSwitch.Root>
  )
}

export default Switch
