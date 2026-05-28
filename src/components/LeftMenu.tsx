import ChecklistIcon from '../assets/icons/checklist_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import classNames from 'classnames'
import React from 'react'
import Tooltip from './Tooltip.tsx'
import SettingsButton from './Settings/SettingsButton.tsx'

type LeftMenuProps = {
  isTodoPanelOpen: boolean
  setIsTodoPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function LeftMenu(props: LeftMenuProps) {
  const tooltipText = props.isTodoPanelOpen
    ? 'Hide Todo List'
    : 'Show Todo List'
  return (
    <div className="flex flex-col px-1 py-2">
      <div className="grow">
        <Tooltip text={tooltipText} side="right">
          <button
            className={classNames(
              'p-1 rounded-sm cursor-pointer',
              'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500',
              { 'bg-neutral-600': props.isTodoPanelOpen }
            )}
            onClick={() => props.setIsTodoPanelOpen((value) => !value)}
            aria-label={tooltipText}
            aria-expanded={props.isTodoPanelOpen}
            aria-controls="todo-panel"
          >
            <ChecklistIcon className="size-5" />
          </button>
        </Tooltip>
      </div>
      <div>
        <SettingsButton />
      </div>
    </div>
  )
}

export default LeftMenu
