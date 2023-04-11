import React from 'react'
import css from "./index.module.scss"
export default function Loading({ visible }: { visible: boolean }) {
    return (
        <>
            {
                visible && <div className={css.container}>
                    <div className={css.loader}></div>
                </div>
            }
        </>
    )
}
