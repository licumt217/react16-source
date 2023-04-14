import React from 'react'

export default function Toast() {
    return (
        <div role="alert" id="js_toast" >
            <div className="weui-mask_transparent"></div>
            <div className="weui-toast">
                <i className="weui-icon-success-no-circle weui-icon_toast"></i>
                <p className="weui-toast__content">已完成</p>
            </div>
        </div>
    )
}
