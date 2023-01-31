import React, { useEffect, useState } from 'react'
import { Checkbox } from 'antd'
import styles from './index.module.scss'

import { Util } from '../../../../assets/js/Util';

export default function RememberPass() {

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const storeChecked = Util.isRememberPass();
        if (storeChecked) {
            setChecked(storeChecked);
        }
    }, [])

    const onRemeberPassChange = (e: any) => {
        const isChecked = e.target.checked;
        setChecked(isChecked)
        if (isChecked) {
            Util.setRememberPass()
        } else {
            Util.clearRememberPass();
        }

    }


    return (
        <Checkbox
            className={styles['remember-pass']}
            checked={checked}
            onChange={onRemeberPassChange} >
            记住密码
        </Checkbox>
    )
}
