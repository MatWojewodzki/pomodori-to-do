import React, { HTMLAttributes } from 'react'
import classNames from 'classnames'

type PanelProps = React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>

function Panel({ className, ...props }: PanelProps) {
    return (
        <div
            {...props}
            className={classNames(
                className,
                'w-md px-1 pt-6 flex flex-col bg-neutral-800 overflow-x-hidden'
            )}
        >
            {props.children}
        </div>
    )
}

export default Panel
