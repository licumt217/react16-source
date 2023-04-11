import React from 'react'
import css from './index.module.scss'
export default function FiveStar() {
    return (
        <div className={css['star-five']} style={{ right: 15, top: 15 }}></div>
    )
}
