import React from 'react'


import PopupContextWrapper from './PopupContextWrapper'
import DialogContextWrapper from './DialogContextWrapper'
import ModalTipContextWrapper from './ModalTipContextWrapper'
import HalfDialogContextWrapper from './HalfDialogContextWrapper'
import LoadingContextWrapper from './LoadingContextWrapper'
export default function UiContextWrapper({ children }: { children: any }) {
    return (
        <PopupContextWrapper>
            <DialogContextWrapper>
                <ModalTipContextWrapper>
                    <HalfDialogContextWrapper>
                        <LoadingContextWrapper>
                            {children}
                        </LoadingContextWrapper>

                    </HalfDialogContextWrapper>
                </ModalTipContextWrapper>
            </DialogContextWrapper>
        </PopupContextWrapper>
    )
}
