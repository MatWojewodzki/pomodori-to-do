import './main.css'
import LeftMenu from './components/LeftMenu.tsx'
import TodoPanel from './components/TodoPanel.tsx'
import PomodoroPanel from './components/PomodoroPanel.tsx'
import PanelGap from './components/PanelGap.tsx'
import { useState } from 'react'
import classNames from 'classnames'

function App() {
    const [todoPanelWidth, setTodoPanelWidth] = useState(400)
    const [isTodoPanelOpen, setIsTodoPanelOpen] = useState(true)
    return (
        <div
            className={classNames(
                'w-screen h-screen flex items-stretch bg-neutral-700 text-white'
            )}
        >
            <LeftMenu
                isTodoPanelOpen={isTodoPanelOpen}
                setIsTodoPanelOpen={setIsTodoPanelOpen}
            />
            <div className="grow flex items-stretch overflow-hidden">
                {isTodoPanelOpen && <TodoPanel width={todoPanelWidth} />}
                {isTodoPanelOpen && (
                    <PanelGap setTodoPanelWidth={setTodoPanelWidth} />
                )}
                <PomodoroPanel isTodoPanelOpen={isTodoPanelOpen} />
            </div>
        </div>
    )
}

export default App
