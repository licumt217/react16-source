import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import A from '../A';

import { IEmptyFunction } from '../../../utils';
interface IShow {
    title: string,
    subTitle?: string,
    content: string,
    withButton?: boolean,
    okText?: string,
    cancelText?: string,
    onOk?: IEmptyFunction,
    onCancel?: IEmptyFunction
}
export interface IHalfDialog {
    show: ({
        title,
        subTitle,
        content,
        withButton = false,
        okText = "确定",
        cancelText = "取消",
        onOk,
        onCancel
    }: IShow) => void;
    hide: () => void
}
const common_animate_class = `animate__animated animate__faster `;

export default React.memo(React.forwardRef(function HalfDialog(props, ref) {

    const containerRef = useRef(null);

    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [content, setContent] = useState("");
    const [okText, setOkText] = useState("");
    const [cancelText, setCancelText] = useState("");
    const [withButton, setWithButton] = useState(false);
    const [classname, setClassname] = useState("");
    const [modalClassname, setModalClassname] = useState("");

    const okCallbackRef = useRef<any>(null);
    const cancelCallbackRef = useRef<any>(null);

    const timerRef = useRef<any>(null);

    useImperativeHandle(ref, () => {
        return {
            show({
                title,
                subTitle = "",
                content,
                withButton = false,
                okText = "确定",
                cancelText = "取消",
                onOk = hide,
                onCancel = hide

            }: IShow) {

                setTitle(title);
                setContent(content);
                setSubTitle(subTitle)
                setOkText(okText)
                setCancelText(cancelText)
                setWithButton(withButton)
                okCallbackRef.current = onOk;
                cancelCallbackRef.current = onCancel;
                show();
            },
            hide
        }
    })

    const showContainer = () => {
        (containerRef?.current as any).style.display = "block";
    }

    const hideContainer = () => {
        (containerRef?.current as any).style.display = "none";
    }

    const setShowClassname = () => {
        setClassname("animate__fadeInUp");
        setModalClassname("animate__fadeIn");
    }
    const setHideClassname = () => {
        setClassname("animate__fadeOutDown");
        setModalClassname("animate__fadeOut");
    }

    const show = () => {
        showContainer()
        setShowClassname()
    }

    const hide = () => {
        setHideClassname();
        timerRef.current = setTimeout(() => {
            hideContainer();
            clearTimeout(timerRef.current)
        }, 1000)
    }

    return (
        <div
            style={{ display: "none" }}
            className={`js_dialog_wrap weui-half-screen-dialog_show `}
            ref={containerRef}
            role="dialog"
            aria-modal="false"
            aria-hidden="true" >
            <div className={`js_close weui-mask  ${common_animate_class} ${modalClassname}`} onClick={hide}></div>
            <div className={`weui-half-screen-dialog ${common_animate_class}  ${classname}  `} >
                <div className="weui-half-screen-dialog__hd">
                    <div className="weui-half-screen-dialog__hd__side">
                        <button className="js_close weui-btn_icon weui-wa-hotarea" onClick={hide}>
                            <i className="weui-icon-close-thin"></i>
                        </button>
                    </div>
                    <div className="weui-half-screen-dialog__hd__main">
                        <strong className="weui-half-screen-dialog__title" >{title}</strong>
                        <span className="weui-half-screen-dialog__subtitle">{subTitle}</span>
                    </div>

                </div>
                <div className="weui-half-screen-dialog__bd">
                    {content}
                </div>
                {
                    withButton && (
                        <div className="weui-half-screen-dialog__ft" style={{ paddingBottom: 30 }}>
                            <div className="weui-half-screen-dialog__btn-area">
                                <A className="js_close weui-btn weui-btn_default" onClick={cancelCallbackRef.current}>{cancelText}</A>
                                <A className="js_close weui-btn weui-btn_primary" onClick={okCallbackRef.current}>{okText}</A>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}))
