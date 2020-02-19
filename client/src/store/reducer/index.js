// ACTIONS
import * as Actions from '../actions';

// Initial state
const INITIAL_STATE = { };

// Socket reducer
function socketReducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
        // case Actions.UPDATE_FLAGS:
        //     reduced = Object.assign({}, state, {
        //         flags: action.flags
        //     })
        //     break;
        default:
            reduced = state;
    }
    return reduced;
}

export default socketReducer;
