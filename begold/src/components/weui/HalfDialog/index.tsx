import React, { useImperativeHandle, useRef, useState } from 'react'
export interface IHalfDialog {
    show: ({
        title,
        content,
    }: {
        title: string,
        content: string,
    }) => void;
    hide: () => void
}

export default React.memo(React.forwardRef(function HalfDialog(props, ref) {

    const containerRef = useRef(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            show({
                title,
                content,
            }: {
                title: string,
                content: string,
            }) {
                setTitle(title);
                setContent(content);

                show();
            },
            hide
        }
    })

    const show = () => {

        setVisible(true);
    }

    const hide = () => {
        setVisible(false)
    }


    return (

        <div className='animate__animated animate__fadeIn animate__faster' ref={containerRef} style={{ display: visible ? "block" : 'none' }}>
            <div role="dialog" aria-modal="true" className="js_dialog" >
                <div className="weui-mask" onClick={hide}></div>
                <div className="weui-half-screen-dialog">
                    <div className="weui-half-screen-dialog__hd">
                        <div className="weui-half-screen-dialog__hd__side">
                            <button className="weui-icon-btn" onClick={hide}>
                                <i className="weui-icon-close-thin"></i>
                            </button>
                        </div>
                        <div className="weui-half-screen-dialog__hd__main">
                            <strong className="weui-half-screen-dialog__title">{title}</strong>
                        </div>
                    </div>
                    <div className="weui-half-screen-dialog__bd">
                        {content}
                    </div>
                </div>
            </div>
        </div>


    )
}))
