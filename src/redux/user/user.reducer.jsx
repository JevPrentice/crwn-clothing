import {UserActionTypes} from "./user.types";

const INITIAL_STATE = {
    currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state; // every reducer is actually run every time! that means this return default state is NB
    }
};

export default userReducer;
