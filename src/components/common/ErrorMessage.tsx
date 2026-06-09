type ErrorMessageProps = {
  text: string
}

function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div className="px-2 py-1 border-2 border-red-500 rounded-md">
      <p className="text-red-500">{`Error: ${props.text}`}</p>
    </div>
  )
}

export default ErrorMessage
