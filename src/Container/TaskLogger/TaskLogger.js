import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/_Aux/_Aux';
import TaskDB from '../../Component/TaskDB/TaskDB';
import TaskData from '../../Component/TaskData/TaskData';
import classes from './TaskLogger.css';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import axios from 'axios';
import Modal from '../../Component/UI/Modal/Modal';
import AddTaskForm from '../../Component/TaskDB/TaskController/AddTaskForm/AddTaskFoem';
import { Redirect } from 'react-router-dom';


const taskLogger = props => {


    const [addingTask, setAddingTask] = useState(false);
    const [taskAddedMsg, settaskAddedMsg] = useState(null);
    const [redirect, setredirect] = useState(<div></div>);


    useEffect(() => {
        props.onAuthCheckState();

        setredirect(null);



    }, []);

    useEffect(() => {
        props.setTDB(props.token, props.userId, -1);
        if (!props.error && props.totalTask !== 0) {
            settaskAddedMsg(<div>Updating</div>);
            setTimeout(() => {
                settaskAddedMsg(<div>Updating.</div>);
            }, 300);
            setTimeout(() => {
                settaskAddedMsg(<div>Updating..</div>);
            }, 600);
            setTimeout(() => {
                settaskAddedMsg(<div>Updating...</div>);
            }, 900);
            setTimeout(() => {
                settaskAddedMsg(<div>Updating....</div>);
            }, 1200);
            setTimeout(() => {
                settaskAddedMsg(<div><b>UPDATED</b></div>);
            }, 2000);

            setTimeout(() => {
                settaskAddedMsg(null);
            }, 3500);

        }

    }, [props.totalTasks])



    const addTaskHandler = () => {
        if (!props.isAuth) {
            setredirect(<div><Redirect to='/auth' /></div>);

        }
        else {
            setAddingTask(true);
        }

    }

    const cancelAddingTaskHandler = () => {
        setAddingTask(false);
    }




    return (
        <Aux >
            {redirect}
            <Modal popup={addingTask} modalClosed={cancelAddingTaskHandler}>
                <AddTaskForm addingTask={cancelAddingTaskHandler} />
            </Modal>
            <div className={classes.TaskLogger} >
                <TaskDB
                    tasks={props.tasks}
                    addTask={addTaskHandler}
                    taskAddedMsg={taskAddedMsg}
                    isAuth={props.isAuth}
                />
                <TaskData className={classes.TaskD} />
            </div>
        </Aux>
    );
}


const mapStateToProps = state => {
    return {
        tasks: state.taskDB.tasks,
        totalTasks: state.taskDB.totalTask,
        loading: state.taskDB.loading,
        error: state.taskDB.error,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuth: state.auth.token !== null,
        touchedDB: state.taskDB.touched,
        selectedTaskPointer: state.taskDB.selectedTaskPointer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTDB: (token, userId) => dispatch(actions.setTDB(token, userId)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onAuthCheckState: () => dispatch(actions.authCheckState()),
        onSetSelectedTask: (task) => dispatch(actions.setTempNode(task)),
        setSelectedTaskPointer: (pointer) => dispatch(actions.setSelectedTaskPointer(pointer))

    }
}


export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(taskLogger, axios)));

