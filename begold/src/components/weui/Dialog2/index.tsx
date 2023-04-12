/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useRef } from 'react';
import useDialog from '../../../hooks/useDialog';
import useModalTip from '../../../hooks/useModalTip';
import A from '../A';
export default function Dialog2() {
    const iosRef2 = useRef();
    const dialog = useDialog();
    const modalTip = useModalTip();


    const showIOSDialog1 = () => {
        // dialog.show({
        //     title: "你好吗",
        //     okText: "fslfs",
        //     onOk() {
        //         alert(3)
        //     },
        //     content: "斐林试剂分类设计费拉萨分类设计费拉萨发时间烦死了粉丝螺蛳粉就是斐林试剂分类设计费拉萨分类设计费拉萨发时间烦死了粉丝螺蛳粉就是斐林试剂分类设计费拉萨分类设计费拉萨发时间烦死了粉丝螺蛳粉就是斐林试剂分类设计费拉萨分类设计费拉萨发时间烦死了粉丝螺蛳粉就是"
        // });

        modalTip.show({
            content: "你好啊发生了附件是"
        })
    }


    return (
        <div className="page">
            <div className="page__hd">
                <h1 className="page__title">Dialog</h1>
                <p className="page__desc">对话框</p>
            </div>
            <div className="page__bd page__bd_spacing">
                <A href="javascript:" role="button" className="weui-btn weui-btn_default" id="showIOSDialog1" onClick={showIOSDialog1}>
                    iOS Dialog样式一
                </A>
            </div>

        </div>
    );
};