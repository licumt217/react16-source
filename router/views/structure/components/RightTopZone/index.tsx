import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss'
import { Util } from '../../../../assets/js/Util';
import { logout } from '../../../../api/cloud'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ModifyPassword from '../../../components/ModifyPassword';

function RightTopZone() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const passwordRef: any = React.createRef();

    const username = useSelector((state: any) => {
        return state.common.username;
    })

    const handleLogout = () => {
        Util.confirm(`确定退出系统吗？`, () => {
            logout().then(() => {
                Util.logoutInFE(dispatch, navigator)
            })
        })
    }

    const handleModifyPass = () => {
        passwordRef.current.show();
    }


    return (
        <>
            <ModifyPassword ref={passwordRef} />
            <div style={{ float: 'right', marginRight: '-35px' }}>
                <div className={styles['cp-btn-wrapper']}>
                    <span>{username} </span>
                    <span className={styles.separator}>|</span>
                    <span onClick={handleModifyPass}>修改密码 </span>
                    <span className={styles.separator}>|</span>
                    <span onClick={handleLogout}>退出</span>
                </div>
            </div>
        </>
    )
}

export default RightTopZone;