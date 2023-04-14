import React, { useCallback, useState } from 'react'
import HalfDialog, { IHalfDialog } from '../../components/weui/HalfDialog'
import HalfDialogContext from '../HalfDialogContext'

export default function HalfDialogContextWrapper({
    children
}: {
    children: any
}) {

    const [contextValue, setContextValue] = useState<IHalfDialog | null>(null)

    const refCallback = useCallback((ele: any) => {
        setContextValue(ele as IHalfDialog)
    }, [])

    return (
        <HalfDialogContext.Provider value={contextValue}>
            <HalfDialog ref={refCallback} />
            {children}
        </HalfDialogContext.Provider>
    )
}
