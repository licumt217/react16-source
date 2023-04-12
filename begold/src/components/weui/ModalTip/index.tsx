import React, { useImperativeHandle, useRef, useState } from 'react'
import A from '../A';
type ICallback = () => void;
export interface IModalTip {
    show: ({
        content,
        okText = "确定",
        onOk
    }: {
        content: string,
        okText?: string,
        onOk?: ICallback
    }) => void;
    hide: () => void
}

export default React.forwardRef(function ModalTip(props, ref) {

    const containerRef = useRef(null);
    const container = containerRef.current as any;

    const [content, setContent] = useState("");
    const [okText, setOkText] = useState("");
    const onOkRef = useRef<ICallback | null>();

    useImperativeHandle(ref, () => {
        return {
            show({
                content,
                okText = "确定",
                onOk
            }: {
                content: string,
                okText?: string,
                onOk?: ICallback
            }) {
                setContent(content);
                setOkText(okText);
                if (onOk) {
                    onOkRef.current = onOk;
                }

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
        onOkRef.current = null;
    }

    const onOk = () => {
        if (onOkRef.current) {
            onOkRef.current();
        }
        hide();
    }

    return (
        <div className="js_dialog animate__animated animate__fadeIn animate__faster"
            ref={containerRef}
            role="dialog"
            aria-hidden="true"
            aria-modal="true"
            aria-labelledby="js_title2"
            id="iosDialog2"
            style={{ display: "none" }}>

            <div className="weui-mask"></div>
            <div className="weui-dialog">
                <div className="weui-dialog__bd">{content}</div>
                <div className="weui-dialog__ft">
                    <A role="button" className="weui-dialog__btn weui-dialog__btn_primary" onClick={onOk}>{okText}</A>
                </div>
            </div>
        </div>

    )
})
