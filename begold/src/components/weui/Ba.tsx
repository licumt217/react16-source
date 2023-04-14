import React, { useCallback, useContext, useRef, useState } from 'react'
import useHalfDialog from '../../hooks/useHalfDialog'
import useDialog from '../../hooks/useDialog'
import DialogContext from '../../context/DialogContext';
import HalfDialogContext from '../../context/HalfDialogContext';
import usePopup from '../../hooks/usePopup';
import useModalTip from '../../hooks/useModalTip';
import useLoading from '../../hooks/useLoading';
import useAgreementDialog from '../../hooks/useAgreementDialog';
import Toast from './Toast';

export default function Ba() {

    // const popupContext = useContext(DialogContext);


    console.log(1)
    console.log(22222)

    // const halfDialog = useHalfDialog();
    const context = useContext(HalfDialogContext);

    console.log(555555, context)

    // const dd = useDialog();

    // const show = useCallback(() => {
    //     popupContext.current?.show({
    //         title: "fssfs",
    //         content: "flsjflsjflsjflsfjs"
    //     })
    //     // dd.show({
    //     //     title: "fssfs",
    //     //     content: "flsjflsjflsjflsfjs"
    //     // });
    // }, [dd]);

    const mmm = useAgreementDialog();

    const [visible, setVisible] = useState(false);

    const ref = useRef<any>(null);





    return (
        <>
            <div onClick={() => {
                console.log(555, ref.current)
                ref.current && ref.current.text && ref.current.loading({
                    message: "雷锋牢骚雷锋牢骚雷锋牢骚雷锋牢骚"
                });
            }}>fjlsjfslf</div>
            <Toast ref={ref} />


        </>
    )

}
