import React from 'react';
function logProps(WrappedComponent) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log("old props:", prevProps)
            console.log("new props:", this.props)
        }
        render() {
            const { forwardedRef, ...props } = this.props;
            return <WrappedComponent {...props} ref={forwardedRef} />
        }
    }
    return React.forwardRef((props, ref) => {
        return <LogProps {...props} forwardedRef={ref} />
    });
}

export default logProps;