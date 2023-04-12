import React from 'react'
import A from '../A';
import getClassList from './getClassList';


export default function Button(
    {
        loading = false,
        children,
        type = "primary",
        disabled = false,
        mini = false
    }: {
        loading?: boolean,
        children: any,
        type?: "primary" | "default" | "warn",
        disabled?: boolean,
        mini?: boolean
    }) {

    const class_list = getClassList(type, loading, disabled, mini);

    return (
        <A role="button" className={`weui-btn ${class_list} `}>
            {loading && <i className="weui-mask-loading"></i>}
            {children}
        </A>
    )
}
