const e = React.createElement;
const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;
const useLayoutEffect = React.useLayoutEffect;
const Fragment = React.Fragment;

const dom = document.getElementById("app")
const root = ReactDOM.createRoot(dom)
const store = window.store;
const useSelector = ReactRedux.useSelector;
const useDispatch = ReactRedux.useDispatch;
const connect = ReactRedux.connect;

const selectValue = state => state.value;
const Provider = ReactRedux.Provider;



function Parent() {
    const dispatch = useDispatch();
    const value = useSelector(selectValue)
    debugger

    return e('div', null, `parentValue:${value}`, e('button', {
        onClick: () => {
            dispatch({
                type: 'counter/increment'
            })
        }
    }, '点击我'))

}

function Child() {
    return e('div', null, 'child')
}

class MyClassComponent extends React.Component {
    render() {
        debugger
        return e('div', null, `parentValue:${this.props.value}`, e('button', {
            onClick: () => {
                this.props.add()
            }
        }, '点击我'))
    }
}

const mapStateToProps = state => {
    return {
        value: state.value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add() {
            dispatch({
                type: 'counter/increment'
            })
        }
    }
}

MyClassComponent = connect(mapStateToProps)(MyClassComponent);



// root.render(e(Hook2));
root.render(e(Provider, { store }, e(MyClassComponent)));