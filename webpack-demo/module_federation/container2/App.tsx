// container/App.tsx
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ContainerApp from "./components/ContainerApp";

// 通过 webpack 关联其它应用，然后按需加载
const CounterAppOne = lazy(() => import("app1/CounterAppOne"));
const CounterAppTwo = lazy(() => import("app2/CounterAppTwo"));

const App = () => (
    <Routes>
        <Route
            path="/"
            element={
                <ContainerApp
                    CounterAppOne={CounterAppOne}
                    CounterAppTwo={CounterAppTwo}
                />
            }
        />
        <Route path="app1/*" element={<CounterAppOne />} />
        <Route path="app2/*" element={<CounterAppTwo />} />
    </Routes>
);

export default App;
