

import React from "react"
const LoadingContext = React.createContext({
    value: false,
    change: (loading: boolean) => { }
});

export default LoadingContext;

