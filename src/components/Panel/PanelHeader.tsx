import React from 'react'

type PanelHeaderProps = {
    children: React.ReactNode
}

function PanelHeader(props: PanelHeaderProps) {
    return (
        <h2 className="mb-8 font-bold text-xl text-center">{props.children}</h2>
    )
}

export default PanelHeader
