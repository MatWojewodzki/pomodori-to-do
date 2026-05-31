import settingsService from '../../services/tauri/settings.ts'
import { useQuery } from '@tanstack/react-query'
import SettingsForm from './SettingsForm'

type SettingsProps = {
  closeDialog: () => void
}

function Settings(props: SettingsProps) {
  const result = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  })
  if (!result.isSuccess) return <div>Loading...</div>
  return <SettingsForm settings={result.data} closeDialog={props.closeDialog} />
}

export default Settings
