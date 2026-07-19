import React from 'react'

type PanelTitleProps = {
  children?: React.ReactNode
}

function PanelTitle(props: PanelTitleProps) {
  return (
    <h2 className="flex-1 font-bold text-xl text-center">{props.children}</h2>
  )
}

export default PanelTitle
