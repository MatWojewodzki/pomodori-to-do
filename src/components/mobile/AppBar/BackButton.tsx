import ArrowBackIcon from '../../../assets/icons/arrow_back_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react'
import classNames from 'classnames'

type BackButtonProps = {
  onClick: () => void
}

function BackButton(props: BackButtonProps) {
  return (
    <button
      className={classNames(
        'p-1 rounded-md pointer-cursor',
        'hover:bg-neutral-600 focus:outline-none focus-visible:bg-neutral-600'
      )}
      onClick={props.onClick}
    >
      <ArrowBackIcon className="size-6" />
    </button>
  )
}

export default BackButton
