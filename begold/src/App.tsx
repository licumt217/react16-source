import React, { useState, useRef } from 'react';
import LoadingContext from './context/LoadingContext';
import PopupContext from './context/PopupContext';
import Loading from './components/Loading';
import css from './App.module.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSessionStorageState } from 'ahooks';
import Popup, { IPopup } from './components/modals/Popup';
const Home = React.lazy(() => import('./views/Home'));
const QuestionPane = React.lazy(() => import('./views/QuestionPane'));



function App() {

    const [loading, setLoading] = useSessionStorageState<boolean>("loading", {
        defaultValue: false
    });


    const popupRef = useRef<IPopup>(null);
    return (
        <div className={css.App}>
            <PopupContext.Provider value={popupRef}>
                <LoadingContext.Provider value={{
                    value: loading,
                    change: setLoading
                }}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/questionPane" element={<QuestionPane />} />
                            <Route path="/*" element={<Home />} />
                        </Routes>
                    </Router>
                    <Loading visible={loading} />
                    <Popup ref={popupRef} />
                </LoadingContext.Provider>
            </PopupContext.Provider>
        </div>
    );
}

export default App;
