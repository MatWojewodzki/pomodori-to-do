import Setting from './Setting.tsx'
import SwitchInput from '../common/form/SwitchInput.tsx'

type SwitchSettingProps = {
  label: string
  value: boolean
  setValue: (value: boolean) => void
}

function SwitchSetting(props: SwitchSettingProps) {
  const inputId = `${props.label}-switchSetting`
  return (
    <Setting label={props.label} inputId={inputId}>
      <SwitchInput
        id={inputId}
        checked={props.value}
        onCheckedChange={props.setValue}
      />
    </Setting>
  )
}

export default SwitchSetting
