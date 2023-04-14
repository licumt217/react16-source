import { useContext, useMemo } from 'react';
import { ILoading } from '../components/weui/Loading';
import LoadingContext from '../context/LoadingContext';
import { EmptyFunction } from '../utils';
export default function useLoading(): ILoading {
    const context = useContext(LoadingContext);

    const op = useMemo(() => {
        return {
            show: context?.show || EmptyFunction,
            hide: context?.hide || EmptyFunction,
        } as ILoading
    }, [context]);

    return op;
}