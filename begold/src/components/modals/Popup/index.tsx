import React, { useState, useCallback, ForwardRefRenderFunction, useImperativeHandle } from 'react'
import css from './index.module.scss'

import CloseIcon from './CloseIcon'

export interface IPopup {
    show: ({ title, content }: { title: string, content: string }) => void;
    hide: () => void
}
const Popup: ForwardRefRenderFunction<IPopup> = function (props, ref) {
    const close = useCallback(() => {
        setVisible(false);
    }, [])

    useImperativeHandle(ref, () => {
        return {
            show: ({ title, content }: { title: string, content: string }) => {

                setTitle(title);
                setContent(content)
                setVisible(true);
            },
            hide: close
        }
    })

    const [visible, setVisible] = useState(false);


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <>
            <div className={`${css.pane} ${visible ? css['content-show'] : css['content-hide']}`}>
                <div className={css.draggable}>
                    <div className={css.move}></div>
                </div>
                <div className={css['close-btn']}>
                    <CloseIcon onClose={close} />
                </div>
                <div className={css.content}>
                    <h1>{title}</h1>
                    <div>{content}</div>
                    <section className='x'>
                        <div>取消</div>
                        <div>确定</div>
                    </section>
                </div>
            </div>
            <div className={`${css.mask} ${visible ? css['mask-show'] : css['mask-hide']}`} ></div>
        </ >
    )
}

export default React.memo(React.forwardRef(Popup))
