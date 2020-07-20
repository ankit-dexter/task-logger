import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Utility/Utility';

const initialState = {
    tasks: [],
    error: null,
    loading: false,
    totalTask: 0,
    touched: false,
    selectedTask: null,
    selectedTaskPointer: -1
}

//==================================SET TDB ================================

const setTDBStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
}

const setTDBSuccess = (state, action) => {
    if (!action.tasks || action.tasks === [] || action.tasks === null || action.selectPointer < 0 || !action.selectPointer) {
        return updateObject(state, { tasks: action.tasks, totalTask: action.totalTask, loading: false, touched: false, selectedTask: null });
    }
    return updateObject(state, { tasks: action.tasks, totalTask: action.totalTask, loading: false, touched: true, selectedTask: state.tasks[action.selectPointer] });
}

const setTDBFailed = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
}

//==================================ADD TASK ================================

const addTaskStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
}

const addTaskSuccess = (state, action) => {
    const newTask = updateObject(action.task, { taskId: action.taskId })
    return updateObject(state, {
        tasks: state.tasks.concat(newTask),
        totalTask: state.totalTask + 1,
        loading: false,

    })
}

const addTaskFailed = (state, action) => {
    return updateObject(state, updateObject(state, { loading: false, error: action.error }))
}

//===============================RESET ERROR==============================

const resetError = (state, action) => {
    return updateObject(state, { error: null });
}

const setError = (state, action) => {
    return updateObject(state, { error: action.error });
}

//===============================UNTOUCHED DB==============================

const untouchedDB = (state, action) => {
    return updateObject(state, {
        tasks: [],
        error: null,
        loading: false,
        totalTask: 0,
        touched: false,
        selectedTask: null
    });
}
//===============================SELECTED TASK==============================



const setSelectedTask = (state, action) => {
    return updateObject(state, { selectedTask: action.selectedTask });
}

//==================================FILL TASK================================

const fillTaskStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
}

const fillTaskSuccess = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null

    })

}

const fillTaskFailed = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
}

//==================================FILL TASK================================

const deleteTaskStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
}

const deleteTaskSuccess = (state, action) => {
    const updatedTasks = state.tasks.filter(task => action.taskId !== task.taskId);
    return updateObject(state, {
        loading: false,
        tasks: updatedTasks
    });

}

const deleteTaskFailed = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
}

//==================================ADD SUBTASK ================================

const addSubTaskStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
}


const addSubTaskSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null

    })
}

const addSubTaskFailed = (state, action) => {

    return updateObject(state, updateObject(state, { loading: false, error: action.error }))
}

export const setSelectedTaskPointer = (state, action) => {

    return updateObject(state, updateObject(state, { selectedTaskPointer: action.pointer }))
}



const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SET_TDB_START: return (setTDBStart(state, action));
        case actionTypes.SET_TDB_SUCCESS: return (setTDBSuccess(state, action));
        case actionTypes.SET_TDB__FAILED: return (setTDBFailed(state, action));

        case actionTypes.ADD_TASK_START: return (addTaskStart(state, action));
        case actionTypes.ADD_TASK_SUCCESS: return (addTaskSuccess(state, action));
        case actionTypes.ADD_TASK_FAILED: return (addTaskFailed(state, action));

        case actionTypes.SET_ERROR: return (setError(state, action));
        case actionTypes.RESET_ERROR: return (resetError(state, action));

        case actionTypes.UNTOUCHED_DB: return (untouchedDB(state, action));

        case actionTypes.SET_SELECTED_TASK: return (setSelectedTask(state, action));

        case actionTypes.FILL_TASK_START: return (fillTaskStart(state, action));
        case actionTypes.FILL_TASK_SUCCESS: return (fillTaskSuccess(state, action));
        case actionTypes.FILL_TASK_FAILED: return (fillTaskFailed(state, action));

        case actionTypes.DELETE_TASK_SUCCESS: return (deleteTaskSuccess(state, action));
        case actionTypes.DELETE_TASK_START: return (deleteTaskStart(state, action));
        case actionTypes.DELETE_TASK_FAILED: return (deleteTaskFailed(state, action));

        case actionTypes.ADD_SUBTASK_START: return (addSubTaskStart(state, action));
        case actionTypes.ADD_SUBTASK_SUCCESS: return (addSubTaskSuccess(state, action));
        case actionTypes.ADD_SUBTASK_FAILED: return (addSubTaskFailed(state, action));

        case actionTypes.SET_SELECTEDTASK_POINTER: return (setSelectedTaskPointer(state, action));
        default: return state;
    }
}

export default reducer;