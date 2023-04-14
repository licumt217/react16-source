

import React from "react"
import { IAgreementDialog } from "../components/weui/AgreementDialog";
const AgreementDialogContext = React.createContext<IAgreementDialog | null>(null as any);

export default AgreementDialogContext;

