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
            className={classNames(className, 'w-md p-6 bg-neutral-800')}
        >
            {props.children}
        </div>
    )
}

export default Panel
