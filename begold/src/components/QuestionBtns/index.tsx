import React from 'react'
import css from './index.module.scss'
export default function QuestionBtns({ onSubmit }
    : {
        onSubmit: (event: any) => void
    }) {
    return (
        <div className={css['container-wraper']}>
            <div className={css.container}>
                <div className={css['btn-exit']}>
                    <button>退出</button>
                </div>
                <div className={css['btn-commit']}>
                    <button onClick={onSubmit}>提交</button>
                </div>
            </div>
        </div>
    )
}
