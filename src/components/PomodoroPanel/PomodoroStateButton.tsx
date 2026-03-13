import React from 'react'
import classNames from 'classnames'

type PomodoroStateButtonProps = {
    active: boolean
    onClick: () => void
    children?: React.ReactNode
}

function PomodoroStateButton(props: PomodoroStateButtonProps) {
    return (
        <button
            role="radio"
            className={classNames(
                'px-2 py-1 rounded-lg cursor-pointer border-2 border-white',
                { 'bg-white text-black': props.active }
            )}
            onClick={props.onClick}
            aria-checked={props.active}
        >
            {props.children}
        </button>
    )
}

export default PomodoroStateButton
