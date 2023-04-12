/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from 'react'

export default function LongButton(
    {
        children,
        type = "primary",
    }: {
        children: any,
        type?: "primary" | "default" | "warn",
    }) {

    return (
        <a href="javascript:" role="button" className={`weui-btn_cell weui-btn_cell-${type}`}>
            {children}
        </a>
    )
}
