import { useCallback, useState } from 'react'

export enum TimerType {
    WORK,
    SHORT_BREAK,
    LONG_BREAK,
}

function getNextState(
    pomodoriToLongBreak: number,
    prevState: TimerType,
    completedPomodoroCount: number
) {
    return prevState == TimerType.SHORT_BREAK ||
        prevState == TimerType.LONG_BREAK
        ? TimerType.WORK
        : completedPomodoroCount % pomodoriToLongBreak == 0
          ? TimerType.LONG_BREAK
          : TimerType.SHORT_BREAK
}

export default function useTimerType(
    initialValue: TimerType,
    pomodoriToLongBreak: number
) {
    const [timerType, setTimerType] = useState<TimerType>(initialValue)

    const setTimerTypeToNext = useCallback(
        (completedPomodoroCount: number) => {
            const nextState = getNextState(
                pomodoriToLongBreak,
                timerType,
                completedPomodoroCount
            )
            setTimerType(nextState)
            return nextState
        },
        [pomodoriToLongBreak, timerType]
    )

    return {
        timerType,
        setTimerType,
        setTimerTypeToNext,
    }
}
