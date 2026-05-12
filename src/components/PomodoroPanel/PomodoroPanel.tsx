import PanelHeader from '../Panel/PanelHeader.tsx'
import Panel from '../Panel/Panel.tsx'
import classNames from 'classnames'
import TimerSection from './TimerSection/TimerSection.tsx'
import TaskSection from './TaskSection/TaskSection.tsx'
import useTimer from '../../hooks/useTimer.ts'

type PomodoroPanelProps = {
    isTodoPanelOpen: boolean
}

function PomodoroPanel(props: PomodoroPanelProps) {
    const timer = useTimer()
    return (
        <Panel
            className={classNames('min-w-0 flex-1', {
                'rounded-s-lg': props.isTodoPanelOpen,
            })}
        >
            <PanelHeader>Pomodoro Timer</PanelHeader>
            <TimerSection timer={timer} />
            <TaskSection timer={timer} />
        </Panel>
    )
}

export default PomodoroPanel
