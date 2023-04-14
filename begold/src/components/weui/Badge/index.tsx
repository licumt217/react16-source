import React from 'react'

export default function Badge({ dot = false, children }:
    {
        dot?: boolean,
        children?: any
    }) {


    return (
        <span className={`weui-badge ${dot ? 'weui-badge_dot' : ''}`}>
            {!dot && children}
        </span>
    )
}
