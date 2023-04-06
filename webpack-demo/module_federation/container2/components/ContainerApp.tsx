import React from 'react'
export default function ContainerApp({ CounterAppOne, CounterAppTwo }: { CounterAppOne: any, CounterAppTwo: any }) {
    return <div style={{ border: '1px solid red;' }}>

        <CounterAppOne />
        <CounterAppTwo />
    </div>
}

