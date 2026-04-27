import PanelHeader from '../Panel/PanelHeader.tsx'
import Panel from '../Panel/Panel.tsx'
import classNames from 'classnames'
import TimerSection from './TimerSection/TimerSection.tsx'
import TaskSection from './TaskSection/TaskSection.tsx'

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
            <TimerSection />
            <TaskSection />
        </Panel>
    )
}

export default PomodoroPanel
