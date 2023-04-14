import { useContext, useMemo } from 'react';
import { IPopup } from '../components/modals/Popup';
import PopupContext from '../context/PopupContext';
import { EmptyFunction } from '../utils';

export default function usePopup(): IPopup {
    const context = useContext(PopupContext);

    const op = useMemo(() => {
        return {
            show: context?.show || EmptyFunction,
            hide: context?.hide || EmptyFunction,
        } as IPopup
    }, [context]);

    return op;
}