import React, { useState, useEffect } from 'react'
import { getVerifyCode } from '../../../api/cloud'
import { Util } from '../../../assets/js/Util';

const InitCounts = 60;
export default function SMSVerifyCode({ phone }: { phone: string }) {

    const [counts, setCounts] = useState(InitCounts);
    const [timer, setTimer] = useState<any>();

    const handleGetVerifyCode = () => {
        if (!Util.isValidPhone(phone)) {
            Util.warn(`请输入合法的手机号！`)
            return;
        }

        getVerifyCode({ phone }).then(() => {
            Util.success(`短信验证码发送成功！`)
            startTimer()
        })

        
    }

    useEffect(() => {
        if (counts === 0) {
            clearInterval(timer);
            setCounts(InitCounts);
        }
    }, [counts])


    const startTimer = () => {
        setCounts(c => c - 1)
        const timer = setInterval(() => {
            setCounts(c => c - 1)
        }, 1000);
        setTimer(timer)
    }


    return (
        <>
            {
                InitCounts === counts
                    ? <span style={{ color: "rgb(19,148,235)", cursor: 'pointer' }} onClick={handleGetVerifyCode}>获取短信验证码</span>
                    : <span style={{ color: "gray" }}>{counts}秒后重新获取 </span>
            }

        </>

    )
}
