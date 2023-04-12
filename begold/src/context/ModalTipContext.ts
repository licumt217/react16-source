

import React, { RefObject } from "react"
import { IModalTip } from "../components/weui/ModalTip";
const ModalTipContext = React.createContext<RefObject<IModalTip>>(null as any);

export default ModalTipContext;

