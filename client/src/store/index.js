import { createStore, combineReducers, compose } from 'redux';

// REDUCERS
import reducer from './reducer';

// Root reducer
const rootReducer = combineReducers({
    state: reducer
});

// Store
let store;
if(process.env.REACT_APP_PRODUCTION === 'false'){
    store = createStore(
        rootReducer,
        compose(
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    );
} else {
    store = createStore(
        rootReducer
    );
}

export default store;