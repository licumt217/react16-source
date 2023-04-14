import { useContext, useMemo } from 'react';
import { IDialog } from '../components/weui/Dialog';
import DialogContext from '../context/DialogContext';
import { EmptyFunction } from '../utils';
export default function useDialog(): IDialog {
    const context = useContext(DialogContext);

    const op = useMemo(() => {
        return {
            show: context?.show || EmptyFunction,
            hide: context?.hide || EmptyFunction,
        } as IDialog
    }, [context]);

    return op;
}