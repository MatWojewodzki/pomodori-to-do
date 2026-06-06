import Panel from '../Panel/Panel.tsx'
import classNames from 'classnames'
import settingsService from '../../services/tauri/settings.ts'
import { useQuery } from '@tanstack/react-query'
import PomodoroPanelContent from './PomodoroPanelContent.tsx'

type PomodoroPanelProps = {
  isTodoPanelOpen: boolean
}

function PomodoroPanel(props: PomodoroPanelProps) {
  const settingsResult = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  })
  if (!settingsResult.isSuccess)
    return (
      <div>Loading...</div> // TODO: proper loading indicator
    )

  return (
    <Panel
      className={classNames('min-w-0 flex-1', {
        'rounded-s-lg': props.isTodoPanelOpen,
      })}
    >
      <PomodoroPanelContent
        isTodoPanelOpen={props.isTodoPanelOpen}
        settings={settingsResult.data}
      />
    </Panel>
  )
}

export default PomodoroPanel
