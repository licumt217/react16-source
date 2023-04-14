/* eslint-disable jsx-a11y/anchor-is-valid */

import { useContext } from "react";
import { FormSubmitContext } from "../Form";

export default function A(props: any) {

    const formSubmitContext = useContext(FormSubmitContext)

    const { onClick, submit, ...otherProps } = props;

    const handleClick = (e: any) => {
        e.preventDefault();
        if (submit) {
            formSubmitContext.current && formSubmitContext.current.click();
        } else {
            onClick && onClick();
        }
    }

    return (
        <a type="submit" href="#" onClick={handleClick} {...otherProps}>
            {props.children}
        </ a >
    )
}