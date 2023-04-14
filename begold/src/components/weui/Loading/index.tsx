import React, { useImperativeHandle, useRef } from 'react'
import css from "./index.module.scss"

type ICallback = () => void;
export interface ILoading {
    show: ICallback,
    hide: ICallback
}

export default React.memo(React.forwardRef(function Loading(props, ref) {

    const containerRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            show,
            hide
        }
    })

    const getContainer = () => {
        return containerRef.current as any;
    }

    const show = () => {
        getContainer().style.display = "block";
    }

    const hide = () => {
        getContainer().style.display = "none";
    }


    return (
        <div ref={containerRef} className={css.container} style={{ display: 'none' }} >
            <div className={css.loader}></div>
        </div>
    )
}))