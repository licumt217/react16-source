import { useContext } from 'react';
import { IModalTip } from '../components/weui/ModalTip';
import ModalTipContext from '../context/ModalTipContext';

export default function useModalTip(): IModalTip {
    const context = useContext(ModalTipContext);

    return context.current as IModalTip;
}