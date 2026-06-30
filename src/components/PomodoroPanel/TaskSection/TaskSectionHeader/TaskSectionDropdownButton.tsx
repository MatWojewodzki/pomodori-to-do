import { Collapsible } from 'radix-ui'
import Tooltip from '../../../common/Tooltip.tsx'
import classNames from 'classnames'
import KeyboardArrowDownIcon from '../../../../assets/icons/keyboard_arrow_down_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'

type TaskSectionDropdownButtonProps = {
  taskSectionExpanded: boolean
}

function TaskSectionDropdownButton(props: TaskSectionDropdownButtonProps) {
  const buttonLabel = props.taskSectionExpanded
    ? 'Collapse task section'
    : 'Expand task section'

  return (
    <Tooltip text={buttonLabel}>
      <div>
        <Collapsible.Trigger asChild>
          <button
            aria-label={buttonLabel}
            className={classNames(
              'p-1 rounded-md cursor-pointer',
              'hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700'
            )}
          >
            <KeyboardArrowDownIcon
              className={classNames(
                'size-6 [[data-state=closed]>&]:-rotate-90',
                'transition-[rotate] duration-200 ease-in-out'
              )}
            />
          </button>
        </Collapsible.Trigger>
      </div>
    </Tooltip>
  )
}

export default TaskSectionDropdownButton
