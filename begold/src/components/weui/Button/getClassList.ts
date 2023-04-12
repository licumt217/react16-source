

function appendByType(class_list: string, type: string) {
    switch (type) {
        case "primary":
            class_list += ` weui-btn_primary `;
            break;
        case "default":
            class_list += ` weui-btn_default  `;
            break;
        case "warn":
            class_list += ` weui-btn_warn  `;
            break;
    }
    return class_list;
}

function appendByLoading(class_list: string, isLoading: boolean) {
    if (isLoading) {
        class_list += ` weui-btn_loading `;
    }
    return class_list;
}

function appendByDisabled(class_list: string, disabled: boolean) {
    if (disabled) {
        class_list += ` weui-btn_disabled `;
    }
    return class_list;
}

function appendByMini(class_list: string, mini: boolean) {
    if (mini) {
        class_list += ` weui-btn_mini `;
    }
    return class_list;
}

export default function getClassList(type: string, loading: boolean, disabled: boolean, mini: boolean) {
    let class_list = ``;
    class_list = appendByType(class_list, type);
    class_list = appendByLoading(class_list, loading)
    class_list = appendByDisabled(class_list, disabled)
    class_list = appendByMini(class_list, mini)
    return class_list;
}