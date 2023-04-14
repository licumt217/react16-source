import { useContext, useMemo } from 'react';
import { IAgreementDialog } from '../components/weui/AgreementDialog';
import AgreementDialogContext from '../context/AgreementDialogContext';
import { EmptyFunction } from '../utils';
export default function useAgreementDialog() {
    const context = useContext(AgreementDialogContext);

    const op = useMemo(() => {
        return {
            show: context?.show || EmptyFunction,
            hide: context?.hide || EmptyFunction,
        } as IAgreementDialog
    }, [context]);

    return op;
}