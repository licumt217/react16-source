import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import A from '../A';

import { IEmptyFunction } from '../../../utils';
interface IShow {
    title: string,
    desc?: string,
    content: string,
    okText?: string,
    cancelText?: string,
    onOk?: IEmptyFunction,
    onCancel?: IEmptyFunction
}
export interface IAgreementDialog {
    show: ({
        title,
        desc,
        content,
        okText,
        cancelText,
        onOk,
        onCancel
    }: IShow) => void;
    hide: () => void
}
const common_animate_class = `animate__animated animate__faster `;

export default React.memo(React.forwardRef(function AgreementDialog(props, ref) {

    const containerRef = useRef(null);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [content, setContent] = useState("");
    const [okText, setOkText] = useState("");
    const [cancelText, setCancelText] = useState("");
    const [classname, setClassname] = useState("");
    const [modalClassname, setModalClassname] = useState("");

    const okCallbackRef = useRef<any>(null);
    const cancelCallbackRef = useRef<any>(null);

    const timerRef = useRef<any>(null);

    useImperativeHandle(ref, () => {
        return {
            show({
                title,
                desc = "",
                content,
                okText = "同意并完成",
                cancelText = "取消",
                onOk,
                onCancel

            }: IShow) {

                console.log(5)

                setTitle(title);
                setContent(content);
                setDesc(desc)
                setOkText(okText)
                setCancelText(cancelText)
                okCallbackRef.current = () => {
                    onOk && onOk();
                    hide();
                };
                cancelCallbackRef.current = () => {
                    onCancel && onCancel();
                    hide();
                };
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

    const CloseIcon = <button className="js_close weui-btn_icon weui-wa-hotarea">
        关闭<i className="weui-icon-close-thin"></i>
    </button>;

    const ReturnIcon = <button className="weui-btn_icon weui-wa-hotarea">
        返回<i className="weui-icon-back-arrow-thin"></i>
    </button>;

    const SlideDownCloseIcon = <button onClick={hide} className="js_close weui-btn_icon weui-wa-hotarea">
        关闭<i className="weui-icon-slide-down"></i></button>

    const More = <div className="weui-half-screen-dialog__hd__side">
        <button className="weui-btn_icon weui-wa-hotarea">更多<i className="weui-icon-more"></i></button>
    </div>

    return (
        <div className="js_dialog_wrap"
            style={{ display: "none" }}
            ref={containerRef}
            aria-labelledby="js_title2"
            role="dialog"
            aria-modal="false"
            aria-hidden="true"
        >

            <div className={`js_close weui-mask  ${common_animate_class} ${modalClassname}`} onClick={hide}></div>
            <div
                className={`weui-half-screen-dialog js_dialog  weui-half-screen-dialog_bottom-fixed ${common_animate_class}  ${classname}  `}
            >
                <div className="weui-half-screen-dialog__hd">

                    <div className="weui-half-screen-dialog__hd__side">
                        {SlideDownCloseIcon}
                    </div>

                    <div className="weui-half-screen-dialog__hd__main">
                        <strong className="weui-half-screen-dialog__title" >{title}</strong>
                    </div>
                </div>
                <div className="weui-half-screen-dialog__bd">
                    <div className="weui-bottom-fixed-opr-page" >
                        <div className="weui-bottom-fixed-opr-page__content" >
                            <p className="weui-half-screen-dialog__desc">
                                {desc}
                            </p>
                            <p className="weui-half-screen-dialog__tips" style={{ paddingBottom: 50 }}>
                                {content}
                            </p>
                        </div>
                        <div className="weui-bottom-fixed-opr">
                            <A role="button" className="js_close weui-btn weui-btn_primary" onClick={okCallbackRef.current}>{okText}</A>
                            <A role="button" className="js_close weui-btn weui-btn_default" onClick={cancelCallbackRef.current}>{cancelText}</A>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}))
