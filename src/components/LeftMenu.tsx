import ChecklistIcon from '../assets/checklist_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import classNames from 'classnames'
import React from 'react'
import Tooltip from './Tooltip.tsx'

type LeftMenuProps = {
    isTodoPanelOpen: boolean
    setIsTodoPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function LeftMenu(props: LeftMenuProps) {
    return (
        <div className="px-1 py-2">
            <Tooltip
                text={
                    props.isTodoPanelOpen
                        ? 'Hide To-do List'
                        : 'Show To-do List'
                }
            >
                <button
                    className={classNames(
                        'p-1 rounded-sm',
                        'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500',
                        { 'bg-neutral-600': props.isTodoPanelOpen }
                    )}
                    onClick={() => props.setIsTodoPanelOpen((value) => !value)}
                >
                    <ChecklistIcon className="size-5" />
                </button>
            </Tooltip>
        </div>
    )
}

export default LeftMenu
