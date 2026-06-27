import classNames from 'classnames'
import React from 'react'
import { TaskDto } from '../../../types/generated/TaskDto.ts'

type TaskDisplayTextContentProps = {
  task: TaskDto
  children?: React.ReactNode
}

function TaskDisplayTextContent(props: TaskDisplayTextContentProps) {
  const { task } = props
  return (
    <span
      className={classNames(
        'ps-14 pe-4 py-4 flex justify-between gap-3 rounded-md'
      )}
    >
      <span
        className={classNames('flex-1', { 'line-through': task.completed })}
      >
        {task.text}
      </span>
      <span className="shrink-0 tabular-nums">
        {task.pomodoro_completed}/{task.pomodoro_total}
      </span>
    </span>
  )
}

export default TaskDisplayTextContent
