import { useContext, useMemo } from 'react';
import { IHalfDialog } from '../components/weui/HalfDialog';
import HalfDialogContext from '../context/HalfDialogContext';
import { EmptyFunction } from '../utils';
export default function useHalfDialog() {
    const context = useContext(HalfDialogContext);

    const op = useMemo(() => {
        return {
            show: context?.show || EmptyFunction,
            hide: context?.hide || EmptyFunction,
        } as IHalfDialog
    }, [context]);

    return op;
}