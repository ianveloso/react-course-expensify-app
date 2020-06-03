import { createStore } from 'redux'; 

// Action Generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
        type: 'INCREMENT',
        incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const reset = () => ({
    type: 'RESET'
});

const set = ({ count } = {}) => ({
    type: 'SET',
    count
});

// Reducers
// 1. Reducers are pure functions (output as a result only of input)
// 2. Never change state or action (i.e. read-only inputs)

 const countReducer = (state = { count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + (action.incrementBy ? action.incrementBy : 1)
            };
        case 'DECREMENT':
            return {
                count: state.count - (action.decrementBy ? action.decrementBy : 1)
            };
        case 'SET': 
            return { 
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(decrementCount());

store.dispatch(reset());

store.dispatch(set({ count: 102 }));

store.dispatch(set());