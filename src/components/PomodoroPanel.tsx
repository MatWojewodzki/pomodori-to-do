import PanelHeader from './PanelHeader.tsx'
import Panel from './Panel.tsx'
import classNames from 'classnames'

type PomodoroPanelProps = {
    isTodoPanelOpen: boolean
}

function PomodoroPanel(props: PomodoroPanelProps) {
    return (
        <Panel
            className={classNames('min-w-0 flex-1', {
                'rounded-s-lg': props.isTodoPanelOpen,
            })}
        >
            <PanelHeader>Pomodoro Timer</PanelHeader>
        </Panel>
    )
}

export default PomodoroPanel
