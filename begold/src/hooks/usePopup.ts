import { useContext } from 'react';
import { IPopup } from '../components/modals/Popup';
import PopupContext from '../context/PopupContext';

export default function usePopup(): IPopup {
    const popupContext = useContext(PopupContext);

    return popupContext.current as IPopup;
}