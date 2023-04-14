import React, { useImperativeHandle, useRef, useState } from 'react'
import A from '../A';
type ICallback = () => void;
export interface IDialog {
    show: ({
        title,
        content,
        okText = "确定",
        cancelText = "取消",
        onOk,
        onCancel
    }: {
        title: string,
        content: string,
        okText?: string,
        cancelText?: string,
        onOk?: ICallback,
        onCancel?: ICallback
    }) => void;
    hide: () => void
}

export default React.memo(React.forwardRef(function Dialog(props, ref) {

    const containerRef = useRef(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [okText, setOkText] = useState("");
    const [cancelText, setCancelText] = useState("");
    const onOkRef = useRef<ICallback | null>();
    const onCancelRef = useRef<ICallback | null>();

    useImperativeHandle(ref, () => {
        return {
            show({
                title,
                content,
                okText = "确定",
                cancelText = "取消",
                onOk,
                onCancel
            }: {
                title: string,
                content: string,
                okText?: string,
                cancelText?: string,
                onOk?: ICallback,
                onCancel?: ICallback
            }) {
                setTitle(title);
                setContent(content);
                setOkText(okText);
                setCancelText(cancelText)
                if (onOk) {
                    onOkRef.current = onOk;
                }
                if (onCancel) {
                    onCancelRef.current = onCancel;
                }



                show();
            },
            hide
        }
    })

    const getContainer = () => {
        return containerRef.current as any;
    }

    const show = () => {
        getContainer().style.display = "block";
    }

    const hide = () => {
        getContainer().style.display = "none";
        onOkRef.current = null;
    }

    const onOk = () => {
        if (onOkRef.current) {
            onOkRef.current();
        }
        hide();
    }

    const onCancel = () => {
        if (onCancelRef.current) {
            onCancelRef.current();
        }
        hide();
    }

    return (
        <div className="js_dialog animate__animated animate__fadeIn animate__faster " role="dialog" aria-hidden="true" aria-modal="true"
            aria-labelledby="js_title1" id="iosDialog1" ref={containerRef} style={{ display: "none" }}>
            <div className="weui-mask"></div>
            <div className="weui-dialog">
                <div className="weui-dialog__hd"><strong className="weui-dialog__title" id="js_title1">{title}</strong></div>
                <div className="weui-dialog__bd">{content}</div>
                <div className="weui-dialog__ft">
                    <A role="button" className="weui-dialog__btn weui-dialog__btn_default" onClick={onCancel}>{cancelText}</A>
                    <A role="button" className="weui-dialog__btn weui-dialog__btn_primary" onClick={onOk}>{okText}</A>
                </div>
            </div>
        </div>
    )
}))
