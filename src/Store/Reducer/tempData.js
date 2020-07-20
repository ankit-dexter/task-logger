import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Utility/Utility';

const initialState = {
    tempTime: {
        hours: 1,
        minute: 1
    },
    tempNode: null
}



const settempTime = (state, action) => {
    return updateObject(state, { tempTime: action.tempTime });
}

const setsetTempNode = (state, action) => {
    return updateObject(state, { tempNode: action.tempNode });
}



const reducer = (state = initialState, action) => {

    switch (action.type) {


        case actionTypes.SET_TEMP_TIME: return (settempTime(state, action));
        case actionTypes.SET_TEMP_NODE: return (setsetTempNode(state, action));

        default: return state;
    }
}

export default reducer;