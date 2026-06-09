import classNames from 'classnames'

type WarningProps = {
  text: string
}

function Warning(props: WarningProps) {
  return (
    <div className="flex">
      <div
        className={classNames(
          'p-2 flex items-center gap-4',
          'text-sm text-yellow-400 rounded-md border border-yellow-400'
        )}
      >
        {props.text}
      </div>
    </div>
  )
}

export default Warning
