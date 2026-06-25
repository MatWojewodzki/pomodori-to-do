import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import Tooltip from '../../common/Tooltip.tsx'
import NumberInput from '../../common/NumberInput.tsx'

type TaskFormProps = {
  handleSubmit: () => void
  handleCancel: () => void
  taskDescription: string
  setTaskDescription: (value: string) => void
  totalPomodoriCount: number
  setTotalPomodoriCount: (value: number) => void
  submitButtonText: string
  isActive?: boolean
}

function TaskForm(props: TaskFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const taskDescriptionInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    formRef.current?.scrollIntoView()
    taskDescriptionInputRef.current?.focus()
    taskDescriptionInputRef.current?.select()
  }, [])

  const totalPomodoriCountInputId = 'total-pomodori-count-input'

  return (
    <form
      className={classNames(
        'flex-1 p-4 flex flex-col rounded-md bg-neutral-600',
        { 'outline-2 outline-neutral-400': props.isActive }
      )}
      onSubmit={(e) => {
        e.preventDefault()
        props.handleSubmit()
      }}
      ref={formRef}
    >
      <label
        htmlFor="task-description-input"
        className="text-sm text-neutral-200"
      >
        Task description
      </label>
      <input
        id="task-description-input"
        type="text"
        className={classNames(
          'mt-1 px-2 py-2 rounded-md bg-neutral-700 ',
          'focus-visible:outline-2 outline-white'
        )}
        value={props.taskDescription}
        onChange={(e) => props.setTaskDescription(e.target.value)}
        ref={taskDescriptionInputRef}
        autoComplete="off"
      />
      <label
        htmlFor={totalPomodoriCountInputId}
        className="mt-6 ps-1 text-sm text-neutral-200"
      >
        Total pomodori to finish
      </label>
      <div className="mt-1 flex justify-start">
        <div className="flex rounded-md bg-neutral-700">
          <Tooltip text="Decrease">
            <button
              aria-label="Decrease total pomodori count"
              type="button"
              className={classNames(
                'px-4 py-2 text-xl font-bold rounded-s-md cursor-pointer',
                'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500'
              )}
              onClick={() => {
                if (props.totalPomodoriCount > 1)
                  props.setTotalPomodoriCount(props.totalPomodoriCount - 1)
              }}
            >
              -
            </button>
          </Tooltip>
          <NumberInput
            id={totalPomodoriCountInputId}
            value={props.totalPomodoriCount}
            setValue={props.setTotalPomodoriCount}
            minValue={1}
            className={classNames(
              'w-12 py-2 text-center rounded-md',
              'focus-visible:outline-2 outline-white -outline-offset-2'
            )}
          />
          <Tooltip text="Increase">
            <button
              aria-label="Increase total pomodori count"
              type="button"
              className={classNames(
                'px-4 py-2 text-xl font-bold rounded-e-md cursor-pointer',
                'hover:bg-neutral-500 focus:outline-none focus-visible:bg-neutral-500'
              )}
              onClick={() =>
                props.setTotalPomodoriCount(props.totalPomodoriCount + 1)
              }
            >
              +
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={props.handleCancel}
          className={classNames(
            'px-4 py-1 text-sm rounded-sm border-2 border-white cursor-pointer',
            'hover:bg-neutral-200 focus:outline-none focus-visible:bg-neutral-200',
            'hover:border-neutral-200 focus-visible:border-neutral-200 hover:text-black focus-visible:text-black'
          )}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={classNames(
            'px-4 py-1 text-sm rounded-sm bg-white text-black cursor-pointer',
            'hover:bg-neutral-200 focus:outline-none focus-visible:bg-neutral-200'
          )}
        >
          {props.submitButtonText}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
