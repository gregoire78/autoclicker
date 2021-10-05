import React, { useEffect, useState } from 'react'
import CounterClick from './CounterClick.jsx'

function Autocliker() {
    const [cps, setCps] = useState(50)
    const [isRunning, setIsRunning] = useState()
    useEffect(() => {
        window.api.receive("running", (isRunning) => setIsRunning(isRunning))
    }, [])
    const handleCahnge = (e) => {
        setCps(e.target.value)
        window.api.send("cps", e.target.value)
    }
    return (
        <div style={{backgroundColor: isRunning ? 'orange' : 'white', padding: '10px', height: 'calc(100% - 20px)'}}>
            <div style={{marginBottom: 10}}>Démarrer : <kbd><kbd>⌘ Command</kbd> ou <kbd>Ctrl</kbd></kbd> + <kbd>Alt</kbd> + <kbd>A</kbd></div>
            <div style={{marginBottom: 10}}>Stop : <kbd>Q</kbd></div>
            1 clique tout les <input type="number" min={0} onChange={handleCahnge} defaultValue={cps} /> milliseconds
            <CounterClick />
        </div>
    )
}

export default Autocliker
