import React, { useCallback, useState } from 'react'
import AgreementDialog, { IAgreementDialog } from '../../components/weui/AgreementDialog'
import AgreementDialogContext from '../AgreementDialogContext'

export default function AgreementDialogContextWrapper({
    children
}: {
    children: any
}) {

    const [contextValue, setContextValue] = useState<IAgreementDialog | null>(null)

    const refCallback = useCallback((ele: any) => {
        setContextValue(ele as IAgreementDialog)
    }, [])

    return (
        <AgreementDialogContext.Provider value={contextValue}>
            <AgreementDialog ref={refCallback} />
            {children}
        </AgreementDialogContext.Provider>
    )
}
