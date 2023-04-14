

import React, { RefObject } from "react"
import { IHalfDialog } from "../components/weui/HalfDialog";
const HalfDialogContext = React.createContext<IHalfDialog | null>(null as any);

export default HalfDialogContext;

