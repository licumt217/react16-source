import React, { useImperativeHandle, useRef, useState } from 'react'
import A from '../A';

export interface IDialog {
    show: ({
        title,
        content,
        okText = "确定",
        cancelText = "取消"
    }: {
        title: string,
        content: string,
        okText?: string,
        cancelText?: string,
    }) => void;
    hide: () => void
}

export default React.forwardRef(function Dialog(props, ref) {

    const containerRef = useRef(null);
    const container = containerRef.current as any;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [okText, setOkText] = useState("");
    const [cancelText, setCancelText] = useState("");

    useImperativeHandle(ref, () => {
        return {
            show({
                title,
                content,
                okText = "确定",
                cancelText = "取消"
            }: {
                title: string,
                content: string,
                okText?: string,
                cancelText?: string,
            }) {
                setTitle(title);
                setContent(content);
                setOkText(okText);
                setCancelText(cancelText)

                show();
            },
            hide
        }
    })

    const show = () => {
        container.style.display = "block";
    }

    const hide = () => {
        container.style.display = "none";
    }

    return (
        <div className="js_dialog animate__animated animate__fadeIn animate__faster " role="dialog" aria-hidden="true" aria-modal="true"
            aria-labelledby="js_title1" id="iosDialog1" ref={containerRef} style={{ display: "none" }}>
            <div className="weui-mask"></div>
            <div className="weui-dialog">
                <div className="weui-dialog__hd"><strong className="weui-dialog__title" id="js_title1">{title}</strong></div>
                <div className="weui-dialog__bd">{content}</div>
                <div className="weui-dialog__ft">
                    <A role="button" className="weui-dialog__btn weui-dialog__btn_default" onClick={hide}>{cancelText}</A>
                    <A role="button" className="weui-dialog__btn weui-dialog__btn_primary">{okText}</A>
                </div>
            </div>
        </div>
    )
})
