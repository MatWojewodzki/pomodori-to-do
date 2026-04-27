import classNames from 'classnames'

type AddTaskButtonProps = {
    onClick: () => void
}

function AddTaskButton(props: AddTaskButtonProps) {
    return (
        <button
            aria-expanded="false"
            className={classNames(
                'mt-3 p-4 flex-1 rounded-md border-2 border-neutral-700',
                'hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700'
            )}
            onClick={props.onClick}
        >
            Add task
        </button>
    )
}

export default AddTaskButton
