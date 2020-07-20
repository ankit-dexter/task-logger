import * as actionTypes from './actionTypes';

import axios from 'axios';
import { updateObject } from '../../Utility/Utility';


const setTDBSuccess = (tasks, totalTask, selectPointer) => {
    return {
        type: actionTypes.SET_TDB_SUCCESS,
        tasks: tasks,
        totalTask: totalTask,
        selectPointer: selectPointer
    }
}

const setTDBStart = () => {
    return {
        type: actionTypes.SET_TDB_START,
    }
}

const setTDBFailed = (error) => {
    return {
        type: actionTypes.SET_TDB_SUCCESS,
        error: error,
    }
}

export const setTDB = (token, userId, selectPointer) => {

    return dispatch => {
        dispatch(setTDBStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('https://task-logger-db.firebaseio.com/tasks.json' + queryParams)
            .then(response => {
                if (response.data !== null) {
                    const totalTask = Object.keys(response.data).length;
                    const tasks = [];
                    for (let key in response.data) {
                        tasks.push({
                            ...response.data[key],
                            taskId: key
                        });
                    }
                    dispatch(setTDBSuccess(tasks, totalTask, selectPointer));
                    dispatch(setSelectedTask(tasks[selectPointer]));

                }
                else {
                    dispatch(setTDBSuccess([], 0, -1));
                    dispatch(setSelectedTask(null));
                }

            })
            .catch(err => dispatch(setTDBFailed(err)));
    }
}

const addTaskStart = () => {
    return {
        type: actionTypes.ADD_TASK_START,
        loading: true
    }
}

const addTaskSuccess = (taskId, task) => {
    return {
        type: actionTypes.ADD_TASK_SUCCESS,
        task: task,
        taskId: taskId
    }
}

const addTaskFailed = (error) => {
    return {
        type: actionTypes.ADD_TASK_FAILED,
        loading: false,
        error: error
    }
}

export const addTask = (task, token, previousTasks, selectPointer) => {

    return dispatch => {
        dispatch(addTaskStart());
        let duplicate = false;
        if (!previousTasks || previousTasks === null || previousTasks === []) {
            axios.post('https://task-logger-db.firebaseio.com/tasks.json?auth=' + token, task)
                .then(response => {
                    dispatch(addTaskSuccess(response.data.name, task));
                    dispatch(setTDB(token, task.userId, selectPointer));
                })
                .catch(err => dispatch(addTaskFailed(err)))
        }
        else {
            duplicate = Object.keys(previousTasks).find(prevTaskKey => {

                return task.name === previousTasks[prevTaskKey].name;
            })

            if (!duplicate) {
                axios.post('https://task-logger-db.firebaseio.com/tasks.json?auth=' + token, task)
                    .then(response => {

                        ('added data ');
                        dispatch(addTaskSuccess(response.data.name, task));
                        dispatch(setTDB(token, task.userId, selectPointer));
                    })
                    .catch(err => dispatch(addTaskFailed(err)));
            }
            else {
                dispatch(addTaskFailed({ message: task.name + " already present" }));
            }
        }


    };
}

export const resetError = () => {
    return {
        type: actionTypes.RESET_ERROR,
        loading: false
    }
}

export const setError = (error) => {
    return {
        type: actionTypes.RESET_ERROR,
        error: error
    }
}

export const untouchedDB = () => {
    return {
        type: actionTypes.UNTOUCHED_DB
    }
}


export const setSelectedTask = (selectedTask) => {
    return {
        type: actionTypes.SET_SELECTED_TASK,
        selectedTask: selectedTask
    }
}


export const fillTaskStart = () => {
    return {
        type: actionTypes.FILL_TASK_START
    }
}

export const fillTaskSuccess = (taskData, taskId) => {
    return {
        type: actionTypes.FILL_TASK_SUCCESS,
        taskId: taskId,
        taskData: taskData
    }
}

export const fillTaskFailed = (error) => {
    return {
        type: actionTypes.FILL_TASK_FAILED,
        error: error
    }
}

export const fillTask = (taskData, taskId, token, selectPointer) => {
    return dispatch => {
        dispatch(fillTaskStart());
        let url = '';
        const updateData = updateObject(taskData, { mode: 'read' });
        switch (taskData.mode) {

            case 'blank':

                url = 'https://task-logger-db.firebaseio.com/tasks/' + taskData.url + taskId + '.json?auth=' + token
                axios.put(url, updateData)
                    .then(response => {
                        dispatch(fillTaskSuccess(updateData, taskId));
                        dispatch(setTDB(token, updateData.userId, selectPointer));
                    })
                    .catch(err => dispatch(fillTaskFailed(err)));

                break;
            case 'incomplete':
                url = 'https://task-logger-db.firebaseio.com/tasks/' + taskData.url + taskData.taskId + '.json?auth=' + token
                axios.put(url, updateData)
                    .then(response => {
                        dispatch(fillTaskSuccess(updateData, taskId));
                        dispatch(setTDB(token, taskData.userId, selectPointer));

                    })
                    .catch(err => dispatch(fillTaskFailed(err)));

                break;
            default: url = 'https://task-logger-db.firebaseio.com/tasks/' + taskData.url + '/' + taskId + '.json?auth=' + token
                axios.put(url, updateData)
                    .then(response => {
                        dispatch(fillTaskSuccess(updateData, taskId));
                        dispatch(setTDB(token, taskData.userId, selectPointer));

                    })
                    .catch(err => dispatch(fillTaskFailed(err)));
                break;
        }



    }
}




export const deleteTaskStart = () => {
    return {
        type: actionTypes.DELETE_TASK_START
    }
}

export const deleteTaskSuccess = (taskId) => {
    return {
        type: actionTypes.DELETE_TASK_SUCCESS,
        taskId: taskId,
    }
}

export const deleteTaskFailed = (error) => {
    return {
        type: actionTypes.DELETE_TASK_FAILED,
        error: error
    }
}

export const deleteTask = (taskData, taskId, token, selectPointer) => {
    return dispatch => {
        dispatch(deleteTaskStart());

        const url = 'https://task-logger-db.firebaseio.com/tasks/' + taskData.url + taskId + '.json?auth=' + token;
        axios.delete(url)
            .then(response => {

                alert('! Task deleted ');
                dispatch(deleteTaskSuccess(taskId));
                dispatch(setTDB(token, taskData.userId, selectPointer));

            })
            .catch(err => dispatch(deleteTaskFailed(err)));
    }
}

export const addSubTaskStart = () => {
    return {
        type: actionTypes.ADD_SUBTASK_START
    }
}

export const addSubTaskSuccess = () => {
    return {
        type: actionTypes.ADD_SUBTASK_SUCCESS,
    }
}

export const addSubTaskFailed = (err) => {
    return {
        type: actionTypes.ADD_SUBTASK_FAILED,
        error: err
    }
}
export const addSubTask = (taskData, taskId, token, selectPointer) => {
    return dispatch => {
        dispatch(addSubTaskStart())
        const url = 'https://task-logger-db.firebaseio.com/tasks/' + taskData.url + taskData.taskId + '/node.json?auth=' + token
        axios.post(url, taskData)
            .then(response => {

                const updatedData = updateObject(taskData, { taskId: response.data.name, mode: 'incomplete', url: taskData.url + taskData.taskId + '/node/' });
                dispatch(addSubTaskSuccess());
                dispatch(fillTask(updatedData, taskId, token, selectPointer));

            })
            .catch(err => dispatch(addSubTaskFailed(err)))
    }
}





export const setSelectedTaskPointer = (pointer) => {
    return {
        type: actionTypes.SET_SELECTEDTASK_POINTER,
        pointer: pointer
    }
}