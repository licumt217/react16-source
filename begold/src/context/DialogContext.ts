

import React, { RefObject } from "react"
import { IDialog } from "../components/weui/Dialog";
const DialogContext = React.createContext<IDialog | null>(null as any);

export default DialogContext;

