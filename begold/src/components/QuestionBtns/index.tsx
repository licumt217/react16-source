import React from 'react'
import css from './index.module.scss'
export default function QuestionBtns({ onSubmit }
    : {
        onSubmit: (event: any) => void
    }) {
    return (
        <div className={css['container-wraper']}>
            <div className={css.container}>
                <div className={css['btn-wrapper']}>
                    <div className={` ${css['d-btn']} ${css['d-btn-gray']}`} >
                        退出
                    </div>
                </div>
                <div className={css['btn-wrapper']}>
                    <div onClick={onSubmit} className={` ${css['d-btn']} ${css['d-btn-3d']}`} >
                        提交
                    </div>
                </div>
            </div>
        </div>
    )
}
