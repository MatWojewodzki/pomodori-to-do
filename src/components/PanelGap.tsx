import Resizer from './Resizer.tsx'
import React from 'react'

type PanelGapProps = {
    setTodoPanelWidth: React.Dispatch<React.SetStateAction<number>>
}

function PanelGap(props: PanelGapProps) {
    return (
        <div className="relative w-1 grow-0 shrink-0">
            <Resizer setTodoPanelWidth={props.setTodoPanelWidth} />
        </div>
    )
}

export default PanelGap
