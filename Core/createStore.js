export default function createStore (reducer, initialState, enhancer) {

    let _activeState;
    let _reducer = reducer;
    let _listeners = [];

    _init();

    function _init(){
        _activeState = _reducer(initialState, {});
    }

    function getState () {
        return _activeState;
    }

    function subscribe (listener) {
        _listeners.push(listener);
        return unsubscribe(_listeners.length-1);
    }

    function dispatch (action) {
        _activeState = _reducer(_activeState, action);
        _listeners.forEach(cb => cb());
    }

    function unsubscribe(index) {
        return function () {
            _listeners = _listeners.filter((listener, i) => i!==index);
        }
    }

    return {
        getState,
        subscribe,
        dispatch: enhancer({getState, dispatch})
    };
};