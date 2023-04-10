import React from 'react'

export default function QuestionItem({ value, option, children, onChange }
    : { value: string, option: string | null, children: any, onChange: (event: any) => void }) {
    return (
        <div>
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
