import React from 'react'
import TaskDisplayCheckbox from './TaskDisplayCheckbox.tsx'
import { TaskDto } from '../../../../types/generated/TaskDto.ts'
import useTaskProgress from '../../../../hooks/useTaskProgress.ts'
import { Timer } from '../../../../hooks/useTimer.ts'

type TaskDisplayBaseProps = {
  task: TaskDto
  timer: Timer
  isActive: boolean
  children?: React.ReactNode
}

function TaskDisplayBase({
  task,
  timer,
  isActive,
  children,
}: TaskDisplayBaseProps) {
  const progress = useTaskProgress(task, timer, isActive)
  return (
    <div
      className="group relative rounded-md"
      style={{
        background: `linear-gradient(to right, var(--color-neutral-600) ${progress}%, var(--color-neutral-700) ${progress}%)`,
      }}
    >
      <TaskDisplayCheckbox task={task} />
      {children}
    </div>
  )
}

export default TaskDisplayBase
