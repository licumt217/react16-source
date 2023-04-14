

import React, { RefObject } from "react"
import { IModalTip } from "../components/weui/ModalTip";
const ModalTipContext = React.createContext<IModalTip | null>(null as any);

export default ModalTipContext;

