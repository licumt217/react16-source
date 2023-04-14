import React, { useCallback, useState } from 'react'
import Popup, { IPopup } from '../../components/modals/Popup'
import PopupContext from '../PopupContext'

export default function PopupContextWrapper({
    children
}: {
    children: any
}) {

    const [contextValue, setContextValue] = useState<IPopup | null>(null)

    const refCallback = useCallback((ele: any) => {
        setContextValue(ele as IPopup)
    }, [])

    return (
        <PopupContext.Provider value={contextValue}>
            <Popup ref={refCallback} />
            {children}
        </PopupContext.Provider>
    )
}
