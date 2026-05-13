import classNames from 'classnames'

export type TimerControlButtonProps = {
    running: boolean
    paused: boolean
    secondsLeft: number
    onClick: () => void
}

function TimerControlButton(props: TimerControlButtonProps) {
    return (
        <button
            className={classNames(
                'w-64 py-6 font-bold text-4xl cursor-pointer rounded-lg bg-white text-black'
            )}
            onClick={props.onClick}
        >
            {props.running
                ? props.paused
                    ? 'Resume'
                    : 'Pause'
                : props.secondsLeft === 0
                  ? 'Reset'
                  : 'Start'}
        </button>
    )
}

export default TimerControlButton
