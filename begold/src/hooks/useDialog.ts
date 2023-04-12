import { useContext } from 'react';
import { IDialog } from '../components/weui/Dialog';
import DialogContext from '../context/DialogContext';

export default function useDialog(): IDialog {
    const popupContext = useContext(DialogContext);

    return popupContext.current as IDialog;
}