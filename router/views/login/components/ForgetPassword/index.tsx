import React from 'react'
import styles from './index.module.scss'
import ResetPassword from '../../../components/ResetPassword'

function ForgetPassword() {

    const passwordRef: any = React.createRef();

    const showPasswordModifyModal = () => {
        passwordRef.current.show();
    }

    return (
        <>
            <ResetPassword ref={passwordRef} />

            <span
                className={styles['forget-pass']}
                onClick={showPasswordModifyModal}
            >
                忘记密码？
            </span>
        </>
    )
}

export default ForgetPassword;
