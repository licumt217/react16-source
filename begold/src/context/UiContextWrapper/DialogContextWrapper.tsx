import React, { useCallback, useState } from 'react'
import Dialog, { IDialog } from '../../components/weui/Dialog'
import DialogContext from '../DialogContext'

export default function DialogContextWrapper({
    children
}: {
    children: any
}) {

    const [contextValue, setContextValue] = useState<IDialog | null>(null)

    const refCallback = useCallback((ele: any) => {
        setContextValue(ele as IDialog)
    }, [])

    return (
        <DialogContext.Provider value={contextValue}>
            <Dialog ref={refCallback} />
            {children}
        </DialogContext.Provider>
    )
}
