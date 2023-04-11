

import React, { RefObject } from "react"
import { IPopup } from "../components/modals/Popup";
const PopupContext = React.createContext<RefObject<IPopup>>(null as any);

export default PopupContext;

