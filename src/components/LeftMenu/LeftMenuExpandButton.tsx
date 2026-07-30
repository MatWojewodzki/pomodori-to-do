import React from 'react'
import LeftPanelOpenIcon from '../../assets/icons/left_panel_open_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import LeftPanelCloseIcon from '../../assets/icons/left_panel_close_20dp_000000_FILL0_wght400_GRAD0_opsz20.svg?react'
import MenuButton from './MenuButton.tsx'
import Tooltip from '../common/Tooltip.tsx'

type LeftMenuExpandButtonProps = {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

function LeftMenuExpandButton(props: LeftMenuExpandButtonProps) {
  const label = props.expanded ? 'Collapse sidebar' : 'Expand sidebar'
  return (
    <Tooltip text={label} side="right">
      <MenuButton
        aria-label={label}
        onClick={() => props.setExpanded((prev) => !prev)}
      >
        {props.expanded ? (
          <LeftPanelCloseIcon className="size-5" />
        ) : (
          <LeftPanelOpenIcon className="size-5" />
        )}
      </MenuButton>
    </Tooltip>
  )
}

export default LeftMenuExpandButton
