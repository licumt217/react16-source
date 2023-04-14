import React, { useRef, RefObject } from 'react'

import Input from '../Input';
interface IFormSubmit {
    click: () => void
}

export const FormSubmitContext = React.createContext<RefObject<IFormSubmit>>(null as any);



export default function Form({
    title,
    children,
    onFinish
}: {
    title?: string,
    children: any,
    onFinish: (values: any) => void
}) {

    const formSubmitRef = useRef(null);

    const inputRef: any = useRef({} as any)

    const handleSubmit = () => {
        const result: {
            [index: string]: string | number
        } = {};

        for (let name in inputRef.current) {
            result[name] = inputRef.current[name].value;
        }
        onFinish(result);
    }

    return (
        <FormSubmitContext.Provider value={formSubmitRef}>
            <form className="weui-form" onSubmit={handleSubmit} >
                <div className="weui-form__control-area">
                    <div className="weui-cells__group weui-cells__group_form">
                        {
                            title && <div className="weui-cells__title">{title}</div>
                        }
                        <div className="weui-cells">
                            {
                                React.Children.map(children, (child, i) => {
                                    if (child.type && child.type === Input) {
                                        const name = child.props.name;
                                        child = React.cloneElement(child, {
                                            ref: (ele: any) => {
                                                inputRef.current[name] = ele as any;
                                            }
                                        })
                                        return child;
                                    } else {
                                        return child;
                                    }
                                })
                            }
                        </div>
                        <input type="submit" hidden ref={formSubmitRef} />
                    </div>
                </div>

            </form>
        </FormSubmitContext.Provider>
    )
}
