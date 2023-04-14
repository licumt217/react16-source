import React, { useState, useRef, useEffect, useCallback } from 'react';
import LoadingContext from './context/LoadingContext';
import Loading from './components/weui/Loading';
import css from './App.module.scss'
import { useSessionStorageState } from 'ahooks';
import RouterWrapper from './router/RouterWrapper';
import UiContextWrapper from './context/UiContextWrapper/UiContextWrapper';


function App() {

    const [loading, setLoading] = useSessionStorageState<boolean>("loading", {
        defaultValue: false
    });

    return (
        <div className={css.App}>

            <UiContextWrapper>


                <RouterWrapper />
            </UiContextWrapper>



        </div>
    );
}

export default React.memo(App);
