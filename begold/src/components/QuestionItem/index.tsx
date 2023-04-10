import React from 'react'
import css from './index.module.scss'
export default function QuestionItem({ value, option, children, onChange }
    : { value: string, option: string | null, children: any, onChange: (event: any) => void }) {
    return (
        <div className={css.container}>
            <label>
                <input
                    type="radio"
                    name="option"
                    value={value}
                    checked={option === value}
                    onChange={onChange}
                />
                {children}
            </label>
        </div>
    )
}
