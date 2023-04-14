import React, { useCallback, useContext } from 'react'
import useHalfDialog from '../../hooks/useHalfDialog'
import useDialog from '../../hooks/useDialog'
import DialogContext from '../../context/DialogContext';
import HalfDialogContext from '../../context/HalfDialogContext';
import usePopup from '../../hooks/usePopup';
import useModalTip from '../../hooks/useModalTip';
import useLoading from '../../hooks/useLoading';

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

    const mmm = useHalfDialog();
    const a = useLoading();

    console.log(a, 555)




    return (
        <>
            <div onClick={() => {
                a.show()
            }}>flsjfls</div>
        </>
    )

}
