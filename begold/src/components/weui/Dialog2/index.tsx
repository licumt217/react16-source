/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useRef } from 'react';
import Button from '../Button';
import LongButton from '../LongButton';
import useDialog from '../../../hooks/useDialog';
export default function Dialog2() {
    const iosRef1 = useRef(null);
    const iosRef2 = useRef();
    const androidRef1 = useRef();
    const androidRef2 = useRef();

    const dialog = useDialog();


    const showIOSDialog1 = () => {
        dialog.show({
            title: "你好吗",
            content: "斐林试剂分类设计费拉萨分类设计费拉萨发时间烦死了粉丝螺蛳粉就是斐林试剂分类设计费拉萨分类设计费拉萨发时间烦死了粉丝螺蛳粉就是斐林试剂分类设计费拉萨分类设计费拉萨发时间烦死了粉丝螺蛳粉就是斐林试剂分类设计费拉萨分类设计费拉萨发时间烦死了粉丝螺蛳粉就是"
        });
    }

    const hideIOSDialog1 = () => {
        dialog.hide();
    }

    const showIOSDialog2 = () => {
        const ios2 = iosRef2.current as any;
        ios2.style.display = "block";
    }

    const hideIOSDialog2 = () => {
        const ios2 = iosRef2.current as any;
        ios2.style.display = "none";
    }



    // var $iosDialog1 = $('#iosDialog1');
    //     $iosDialog2 = $('#iosDialog2'),
    //     $androidDialog1 = $('#androidDialog1'),
    //     $androidDialog2 = $('#androidDialog2');

    //     $('#dialogs').on('click', '.weui-dialog__btn', function () {
    //         $(this).parents('.js_dialog').fadeOut(200);
    //         $(this).parents('.js_dialog').attr('aria-hidden', 'true');
    //         $(this).parents('.js_dialog').removeAttr('tabindex');
    //     });

    //     $('#showIOSDialog1').on('click', function () {
    //         $iosDialog1.fadeIn(200);
    //         $iosDialog1.attr('aria-hidden', 'false');
    //         $iosDialog1.attr('tabindex', '0');
    //         $iosDialog1.trigger('focus');
    //     });
    //     $('#showIOSDialog2').on('click', function () {
    //         $iosDialog2.fadeIn(200);
    //         $iosDialog2.attr('aria-hidden', 'false');
    //         $iosDialog2.attr('tabindex', '0');
    //         $iosDialog2.trigger('focus');
    //     });
    //     $('#showAndroidDialog1').on('click', function () {
    //         $androidDialog1.fadeIn(200);
    //         $androidDialog1.attr('aria-hidden', 'false');
    //         $androidDialog1.attr('tabindex', '0');
    //         $androidDialog1.trigger('focus');
    //     });
    //     $('#showAndroidDialog2').on('click', function () {
    //         $androidDialog2.fadeIn(200);
    //         $androidDialog2.attr('aria-hidden', 'false');
    //         $androidDialog2.attr('tabindex', '0');
    //         $androidDialog2.trigger('focus');
    //     });
    // });

    return (
        <div className="page">
            <div className="page__hd">
                <h1 className="page__title">Dialog</h1>
                <p className="page__desc">对话框</p>
            </div>
            <div className="page__bd page__bd_spacing">
                <a href="javascript:" role="button" className="weui-btn weui-btn_default" id="showIOSDialog1" onClick={showIOSDialog1}>
                    iOS Dialog样式一
                </a>
                <a href="javascript:" role="button" className="weui-btn weui-btn_default" id="showIOSDialog2" onClick={showIOSDialog2}>
                    iOS Dialog样式二
                </a>
            </div>

            <div id="dialogs">
                <div className="js_dialog animate__animated animate__fadeIn animate__faster " role="dialog" aria-hidden="true" aria-modal="true"
                    aria-labelledby="js_title1" id="iosDialog1" ref={iosRef1} style={{ display: "none" }}>
                    <div className="weui-mask"></div>
                    <div className="weui-dialog">
                        <div className="weui-dialog__hd"><strong className="weui-dialog__title" id="js_title1">弹窗标题</strong></div>
                        <div className="weui-dialog__bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
                        <div className="weui-dialog__ft">
                            <a role="button" href="javascript:" className="weui-dialog__btn weui-dialog__btn_default" onClick={hideIOSDialog1}>辅助操作</a>
                            <a role="button" href="javascript:" className="weui-dialog__btn weui-dialog__btn_primary">主操作</a>
                        </div>
                    </div>
                </div>

                <div className="js_dialog" role="dialog" aria-hidden="true" aria-modal="true" aria-labelledby="js_title2"
                    id="iosDialog2" style={{ display: "none" }}>
                    <div className="weui-mask"></div>
                    <div className="weui-dialog">
                        <div className="weui-dialog__bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
                        <div className="weui-dialog__ft">
                            <a role="button" href="javascript:" className="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
                        </div>
                    </div>
                </div>


                <div className="js_dialog" role="dialog" aria-hidden="true" aria-modal="true" aria-labelledby="js_title3"
                    id="androidDialog1" style={{ display: "none" }}>
                    <div className="weui-mask"></div>
                    <div className="weui-dialog weui-skin_android">
                        <div className="weui-dialog__hd"><strong className="weui-dialog__title" id="js_title3">弹窗标题</strong></div>
                        <div className="weui-dialog__bd">
                            弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
                        </div>
                        <div className="weui-dialog__ft">
                            <a role="button" href="javascript:" className="weui-dialog__btn weui-dialog__btn_default">辅助操作</a>
                            <a role="button" href="javascript:" className="weui-dialog__btn weui-dialog__btn_primary">主3操作</a>
                        </div>
                    </div>
                </div>


                <div className="js_dialog" role="dialog" aria-hidden="true" aria-modal="true" aria-labelledby="js_title4"
                    id="androidDialog2" style={{ display: "none" }}>
                    <div className="weui-mask"></div>
                    <div className="weui-dialog weui-skin_android">
                        <div className="weui-dialog__bd">
                            弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
                        </div>
                        <div className="weui-dialog__ft">
                            <a role="button" href="javascript:" className="weui-dialog__btn weui-dialog__btn_default">辅助操作</a>
                            <a role="button" href="javascript:" className="weui-dialog__btn weui-dialog__btn_primary">主操作</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};