export default function combineReducers(reducers) {
    return function (_activeState, action) {
        return Object.keys(reducers).reduce((state, reducer) => {
            const currentState = _activeState ? _activeState[reducer] : _activeState;
            state[reducer] = reducers[reducer](currentState, action);
            return state;
        }, {})
    }
}
