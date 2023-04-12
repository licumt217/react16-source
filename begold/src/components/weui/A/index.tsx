/* eslint-disable jsx-a11y/anchor-is-valid */

export default function A(props: any) {
    return (
        <a href="#" onClick={(e) => e.preventDefault()} {...props}>
            {props.children}
        </ a >
    )
}