import React from 'react';
class MyErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
    componentDidCatch(error, errorInfo) {
        // 将错误日志上报给服务器
        // logErrorToMyService(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <h1>soming is wrong!</h1>
        } else {
            return this.props.children;
        }
    }
}

export default MyErrorBoundary;