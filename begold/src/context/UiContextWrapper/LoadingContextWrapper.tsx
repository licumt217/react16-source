import React, { useCallback, useState } from 'react'
import Loading, { ILoading } from '../../components/weui/Loading'
import LoadingContext from '../LoadingContext'

export default function LoadingContextWrapper({
    children
}: {
    children: any
}) {

    const [contextValue, setContextValue] = useState<ILoading | null>(null)

    const refCallback = useCallback((ele: any) => {
        setContextValue(ele as ILoading)
    }, [])

    return (
        <LoadingContext.Provider value={contextValue}>
            <Loading ref={refCallback} />
            {children}
        </LoadingContext.Provider>
    )
}
