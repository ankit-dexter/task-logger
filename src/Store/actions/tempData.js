import * as actionTypes from './actionTypes';

export const settempTime = (updateTime) => {


    return {
        type: actionTypes.SET_TEMP_TIME,
        tempTime: updateTime
    }
}

export const setTempNode = (tempNode) => {
    return {
        type: actionTypes.SET_TEMP_NODE,
        tempNode: tempNode
    }
}