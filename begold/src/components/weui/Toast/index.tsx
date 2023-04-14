import React, { useEffect, useImperativeHandle, useReducer, useRef, useState } from 'react'
import A from '../A';

interface IShow {
    message: string,
}
export interface IHalfDialog {
    show: ({
        message,
    }: IShow) => void;
    hide: () => void
}

interface IToastAction {
    type: string;
};

interface IDispatch {
    (obj: IToastAction): void
}

const common_animate_class = `animate__animated animate__faster `;

export default React.memo(React.forwardRef(function Toast(props, ref) {

    const containerRef = useRef(null);

    const [message, setMessage] = useState("");
    const [classname, setClassname] = useState("");

    const [isLongText, setIsLongText] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isText, setIsText] = useState(false);


    const reducer = function (state: string, action: IToastAction): any {
        switch (action.type) {
            case "success":
                return "weui-icon-success-no-circle ";
            case "warn":
                return "weui-icon-warn ";
            case "loading":
                return "";
            case "text":
                return "";
            default:
                return "weui-icon-success-no-circle ";
        };
    }

    const [typeClass, dispatchTypeClass] = useReducer(reducer, "");


    const timerRef = useRef<any>(null);

    useImperativeHandle(ref, () => {
        return {
            success({
                message,

            }: IShow) {

                dispatchTypeClass({ type: "success" })

                setMessage(message);
                console.log(999000)
                show();
            },
            warn({
                message,

            }: IShow) {
                setMessage(message);
                dispatchTypeClass({ type: "warn" })
                show();
            },
            loading() {
                dispatchTypeClass({ type: "loading" })
                setIsLoading(true);
                show();
            },
            text({
                message,

            }: IShow) {
                setIsText(true)
                setMessage(message);
                dispatchTypeClass({ type: "text" })
                show();
            },
            longText({
                message,

            }: IShow) {
                setMessage(message);
                dispatchTypeClass({ type: "warn" })
                setIsLongText(true);
                show();
            }
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
        // setModalClassname("animate__fadeIn");
    }
    const setHideClassname = () => {
        setClassname("animate__fadeOutDown");
        // setModalClassname("animate__fadeOut");
    }

    const show = () => {
        showContainer()
        setShowClassname()
        hide();
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
            role="alert"
            style={{ display: "none" }}
            className={`${classname}`}
            ref={containerRef}>
            <div className="weui-mask_transparent"></div>
            <div className={`weui-toast ${isLongText ? "weui-toast_text-more" : ""}  ${isText ? "weui-toast_text" : ""} `} >

                {
                    isLoading ?
                        (
                            <span className="weui-primary-loading weui-icon_toast">
                                <span className="weui-primary-loading__dot"></span>
                            </span>
                        )
                        : (
                            !isText && <i className={`weui-icon_toast ${typeClass}`}></i>
                        )
                }



                <p className="weui-toast__content">{message}</p>
            </div>
        </div>
    )
}))











