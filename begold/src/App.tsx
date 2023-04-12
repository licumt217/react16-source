import React, { useState, useRef } from 'react';
import LoadingContext from './context/LoadingContext';
import PopupContext from './context/PopupContext';
import DialogContext from './context/DialogContext';
import ModalTipContext from './context/ModalTipContext';
import Loading from './components/Loading';
import css from './App.module.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSessionStorageState } from 'ahooks';
import Popup, { IPopup } from './components/modals/Popup';
import Dialog, { IDialog } from './components/weui/Dialog';
import ModalTip, { IModalTip } from './components/weui/ModalTip';
const Home = React.lazy(() => import('./views/Home'));
const QuestionPane = React.lazy(() => import('./views/QuestionPane'));



function App() {

    const [loading, setLoading] = useSessionStorageState<boolean>("loading", {
        defaultValue: false
    });


    const popupRef = useRef<IPopup>(null);
    const dialogRef = useRef<IDialog>(null);
    const modalTipRef = useRef<IModalTip>(null);
    return (
        <div className={css.App}>
            <ModalTipContext.Provider value={modalTipRef}>
                <DialogContext.Provider value={dialogRef}>
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
                            <Dialog ref={dialogRef} />
                            <ModalTip ref={modalTipRef} />
                        </LoadingContext.Provider>
                    </PopupContext.Provider>
                </DialogContext.Provider>
            </ModalTipContext.Provider>
        </div>
    );
}

export default App;
