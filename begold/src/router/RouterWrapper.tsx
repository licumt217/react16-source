import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from '../views/Home'
import QuestionPane from '../views/QuestionPane'

function SuspenseWrapper(props: any) {
    return (
        <Suspense fallback={"loading..."}>
            {props.children}
        </Suspense>
    )
}

export default function RouterWrapper() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <SuspenseWrapper>
                        <Home />
                    </SuspenseWrapper>
                } />
                <Route path="/questionPane" element={
                    <SuspenseWrapper >
                        <QuestionPane />
                    </SuspenseWrapper>
                } />
                <Route path="/*" element={
                    <SuspenseWrapper >
                        <Home />
                    </SuspenseWrapper>
                } />
            </Routes>
        </Router>
    )
}
