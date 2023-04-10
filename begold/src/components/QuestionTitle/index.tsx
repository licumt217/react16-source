import React from 'react'
import css from './index.module.scss'
export default function QuestionTitle({ children, index }: { index: number, children: string }) {
    return (
        <div className={css.container}>
            {index}、{children}
        </div>
    )
}
