import React from 'react'

type PanelHeaderProps = {
  children?: React.ReactNode
}

function PanelHeader(props: PanelHeaderProps) {
  return <div className="mb-8 flex">{props.children}</div>
}

export default PanelHeader
