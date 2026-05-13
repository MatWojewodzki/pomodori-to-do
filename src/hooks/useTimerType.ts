import { useState } from 'react'

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

    function setTimerTypeToNext(completedPomodoroCount: number) {
        const nextState = getNextState(
            pomodoriToLongBreak,
            timerType,
            completedPomodoroCount
        )
        setTimerType(nextState)
        return nextState
    }

    return {
        timerType,
        setTimerType,
        setTimerTypeToNext,
    }
}
