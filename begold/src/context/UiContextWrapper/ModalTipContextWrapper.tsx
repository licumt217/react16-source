import React, { useCallback, useState } from 'react'
import ModalTip, { IModalTip } from '../../components/weui/ModalTip'
import ModalTipContext from '../ModalTipContext'

export default function ModalTipContextWrapper({
    children
}: {
    children: any
}) {

    const [contextValue, setContextValue] = useState<IModalTip | null>(null)

    const refCallback = useCallback((ele: any) => {
        console.log(ele, 23232323)
        setContextValue(ele as IModalTip)
    }, [])

    return (
        <ModalTipContext.Provider value={contextValue}>
            <ModalTip ref={refCallback} />
            {children}
        </ModalTipContext.Provider>
    )
}
