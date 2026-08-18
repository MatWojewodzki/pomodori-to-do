import classNames from 'classnames'
import PomodoroView from '../common/PomodoroView/PomodoroView.tsx'

function PomodoroScreen() {
  return (
    <div
      className={classNames(
        'px-4 pt-6 flex flex-col bg-neutral-800',
        'overflow-y-auto scrollbar-gutter-stable'
      )}
    >
      <PomodoroView />
    </div>
  )
}

export default PomodoroScreen
