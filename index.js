import createStore  from './Core/createStore.js';
import combineReducers from './utils/combineReducers.js';
import applyMiddleware from './utils/applyMiddleware.js';

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT_TOMATO':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

function tomatoCounter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT_TOMATO':
            return state + 1
        case 'DECREMENT_TOMATO':
            return state - 1
        default:
            return state
    }
}


function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}


const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}


const nothingHasToBeChanged = function(store){
    return function(next){
        return function(action){
            return next(action);
        }
    }
}

const ping = store => next => action => {
    console.log(`Тип события: ${action.type}, дополнительные данные события: ${action.payload}`)
    return next(action)
}

const reducer = combineReducers({counter, tomatoCounter, todos });
const initialState =   {counter: 20, tomatoCounter:5};

let store = createStore(
    reducer,
    initialState,
    applyMiddleware(logger, nothingHasToBeChanged, ping)
);

console.log(store)

store.subscribe(() =>
    console.log(store.getState())
)

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1


store.dispatch({ type: 'INCREMENT_TOMATO' })
