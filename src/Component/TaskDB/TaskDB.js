import React from 'react';
import classes from './TaskDB.css';
import Tasks from './Tasks/Tasks';
import TaskController from './TaskController/TaskController';
import axios from 'axios';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const taskDB = props => {

    return (
        <div className={classes.TaskDB}>
            <div className={classes.BreadTop}>
                <div>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                    <div className={classes.Seeds3}></div>
                </div>

            </div>
            <Tasks
                tasks={props.tasks}
                addTask={props.addTask}
                isAuth={props.isAuth}
            />
            <div className={classes.BreadBottom}>


                {props.taskAddedMsg ? <h6><center margin='8%' >

                    &nbsp;{props.taskAddedMsg}&nbsp;</center></h6> : null}
                <div>&nbsp;</div>


            </div>
            <TaskController addTask={props.addTask} isAuth={props.isAuth} />
        </div>
    );
}

export default React.memo(withErrorHandler(taskDB, axios));