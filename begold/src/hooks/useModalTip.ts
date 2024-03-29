import { useContext, useMemo } from 'react';
import { IModalTip } from '../components/weui/ModalTip';
import ModalTipContext from '../context/ModalTipContext';
import { EmptyFunction } from '../utils';
export default function useModalTip(): IModalTip {
    const context = useContext(ModalTipContext);

    const op = useMemo(() => {
        return {
            show: context?.show || EmptyFunction,
            hide: context?.hide || EmptyFunction,
        } as IModalTip
    }, [context]);

    return op;
}