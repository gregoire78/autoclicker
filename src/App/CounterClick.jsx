import React, { useState } from 'react'

function CounterClick() {
    const [counter, setCounter] = useState(0)
    const handleClick = () => {
        setCounter(counter + 1)
    }
    return (
        <div style={{ height: 100, background: "wheat", userSelect: 'none' }} onClick={handleClick}>
            <p>Zone de test:</p>
            <p>
                nombre cliques: {counter} <button onClick={
                    (e) => {
                        e.stopPropagation()
                        setCounter(0)
                    }
                }>reset</button>
            </p>
        </div>
    )
}

export default CounterClick
