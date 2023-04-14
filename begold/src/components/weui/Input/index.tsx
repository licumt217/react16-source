import React, { useId, useRef } from 'react'

export default React.forwardRef(function Input({
    placeholder = "请输入",
    label,
    name,
    maxLength
}: {
    label: string
    placeholder?: string,
    name: string,
    maxLength?: number
}, ref: any) {

    const id = useId();


    return (
        <label htmlFor={id} className="weui-cell weui-cell_active">
            <div className="weui-cell__hd">
                <span className="weui-label">{label}</span>
            </div>
            <div className="weui-cell__bd">
                <input id={id} className="weui-input" placeholder={placeholder} ref={ref} maxLength={maxLength !== undefined ? maxLength : 9999} />
            </div>
        </label>
    )
})
