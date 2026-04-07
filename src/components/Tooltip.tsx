import React from 'react'
import classNames from 'classnames'

export type TooltipProps = {
    text: string
    children?: React.ReactNode
    id?: string
    position: 'bottom-right' | 'bottom-left'
}

function Tooltip(props: TooltipProps) {
    return (
        <div className="relative group flex justify-center items-center">
            {props.children}
            <div
                id={props.id}
                className={classNames(
                    'absolute max-w-2xs px-2 py-1 w-max',
                    {
                        '-right-1 translate-x-full -bottom-1 translate-y-full':
                            props.position === 'bottom-right',
                    },
                    {
                        '-left-1 -translate-x-full -bottom-1 translate-y-full':
                            props.position === 'bottom-left',
                    },
                    'bg-neutral-700 text-white font-sans rounded-md text-xs pointer-events-none',
                    'opacity-0 invisible transition-opacity duration-150 ease-in-out',
                    'group-hover:opacity-100 group-hover:visible',
                    'group-focus-within:opacity-100 group-focus-within:visible'
                )}
            >
                {props.text}
            </div>
        </div>
    )
}

export default Tooltip
