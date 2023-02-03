const initialState = {
    value: 1
}

function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'counter/increment':
            return { ...state, value: state.value + 1 }
        case 'counter/decrement':
            return { ...state, value: state.value - 1 }
        default:
            return state;
    }
}

const loggerMiddleware = function (storeApi) {
    return function (next) {
        return function (action) {
            debugger
            console.log("action1:" + JSON.stringify(action));

            let result = next(action);

            console.log("next state1:" + JSON.stringify(storeApi.getState()))

            return result;
        }
    }
}

const loggerMiddleware2 = function (storeApi) {
    return function (next) {
        return function (action) {
            debugger
            console.log("action2:" + JSON.stringify(action));

            let result = next(action);

            console.log("next state2:" + JSON.stringify(storeApi.getState()))

            return result;
        }
    }
}

const loggerMiddleware3 = function (storeApi) {
    return function (next) {
        return function (action) {
            debugger
            console.log("action3:" + JSON.stringify(action));

            let result = next(action);

            console.log("next state3:" + JSON.stringify(storeApi.getState()))

            return result;
        }
    }
}

const enhancer = Redux.applyMiddleware(loggerMiddleware, loggerMiddleware2, loggerMiddleware3)

const store = Redux.createStore(counterReducer, enhancer);

const valueEl = document.getElementById("value");
const increment = document.getElementById("increment");
const decrement = document.getElementById("decrement");

increment.addEventListener('click', function () {
    store.dispatch({
        type: 'counter/increment'
    })
})

decrement.addEventListener('click', function () {
    store.dispatch({
        type: 'counter/decrement'
    })
})

function render() {
    const state = store.getState();
    valueEl.innerHTML = state.value;
}

render();

store.subscribe(render);