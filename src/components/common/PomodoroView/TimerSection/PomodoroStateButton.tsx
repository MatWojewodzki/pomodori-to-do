import classNames from 'classnames'

type PomodoroStateButtonProps = {
  text: string
  shortText: string
  active: boolean
  onClick: () => void
}

function PomodoroStateButton(props: PomodoroStateButtonProps) {
  return (
    <button
      role="radio"
      className={classNames(
        'px-2 py-1 rounded-lg cursor-pointer border-2 border-white',
        'hover:bg-neutral-200 hover:border-neutral-200 hover:text-black',
        'active:bg-neutral-200 active:border-neutral-200 active:text-black',
        'focus:outline-none focus-visible:bg-neutral-200',
        'focus-visible:border-neutral-200 focus-visible:text-black',
        { 'bg-white text-black': props.active }
      )}
      onClick={props.onClick}
      aria-checked={props.active}
    >
      <span className="xs:hidden">{props.shortText}</span>
      <span className="hidden xs:inline">{props.text}</span>
    </button>
  )
}

export default PomodoroStateButton
