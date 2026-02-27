import React from 'react'
import classNames from 'classnames'

export type TooltipProps = {
    text: string
    children?: React.ReactNode
    id?: string
}

function Tooltip(props: TooltipProps) {
    return (
        <div className="relative group">
            {props.children}
            <div
                id={props.id}
                className={classNames(
                    'absolute max-w-2xs -right-1 translate-x-full -bottom-1 translate-y-full px-2 py-1 w-max',
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
