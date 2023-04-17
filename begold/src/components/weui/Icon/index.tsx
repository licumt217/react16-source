import React from 'react'
interface IIconType {
    type: "success" | "tip" | "warn" | "wait" | "redwarn"
}

export default React.memo(function Icon({ type }: IIconType) {

    let result;
    switch (type) {
        case "success":
            result = <i role="img" title="成功" className="weui-icon-success weui-icon_msg"></i>;
            break;
        case "tip":
            result = <i role="img" title="提示" className="weui-icon-info weui-icon_msg"></i>
            break;
        case "warn":
            result = <i role="img" title="普通警告" className="weui-icon-warn weui-icon_msg-primary"></i>
            break;
        case "redwarn":
            result = <i role="img" title="强烈警告" className="weui-icon-warn weui-icon_msg"></i>
            break;
        case "wait":
            result = <i role="img" title="等待" className="weui-icon-waiting weui-icon_msg"></i>
            break;
    }
    return (
        <>
            {result}
        </>
    )
})
