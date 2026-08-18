import Panel from '../Panel/Panel.tsx'
import classNames from 'classnames'
import PanelHeader from '../Panel/PanelHeader.tsx'
import PanelTitle from '../Panel/PanelTitle.tsx'
import PomodoroView from '../common/PomodoroView/PomodoroView.tsx'

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
      <PanelHeader>
        <PanelTitle>Pomodoro Timer</PanelTitle>
      </PanelHeader>
      <PomodoroView />
    </Panel>
  )
}

export default PomodoroPanel
