import React, { useEffect, useState } from 'react'

function Autocliker() {
    const [cps, setCps] = useState(1000)
    const [isRunning, setIsRunning] = useState()
    useEffect(() => {
        window.api.receive("running", (isRunning) => setIsRunning(isRunning))
    }, [])
    const handleCahnge = (e) => {
        setCps(e.target.value)
        window.api.send("cps", e.target.value)
    }
    return (
        <div>
            {isRunning && <p>Running !</p>}
            1 clique tout les <input type="number" min={0} onChange={handleCahnge} defaultValue={cps} /> milliseconds
        </div>
    )
}

export default Autocliker
