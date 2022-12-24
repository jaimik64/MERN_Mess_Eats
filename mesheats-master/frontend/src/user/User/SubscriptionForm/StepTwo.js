import React from 'react'

export default function StepTwo({ prevStep }) {
    return (
        <div>
            StepTwo
            <button onClick={() => { prevStep() }}>Prev</button>
        </div>
    )
}
