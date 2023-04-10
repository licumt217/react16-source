import React from 'react'
import css from './index.module.scss'
export default function QuestionTitle({ children }: { children: string }) {
    return (
        <div className={css.container}>{children}</div>
    )
}
