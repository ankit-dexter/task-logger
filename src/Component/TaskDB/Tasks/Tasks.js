import React from 'react';
import classes from './Tasks.css';
import Task from './Task/Task';
import { connect } from 'react-redux';

const tasks = props => {


    let trnsformedTasks = null;
    let taskNo = props.totalTask;

    if (props.isAuth) {
        if (props.tasks !== [] && props.tasks !== '' && taskNo !== 0 && props.tasks) {
            trnsformedTasks = Object.keys(props.tasks).map(taskId => {

                return (<Task
                    key={taskId}
                    taskName={props.tasks[taskId].name}
                />);
            });
        }

        else {
            trnsformedTasks = <div>
                <h3><center>No Task Found ! Please Add Task</center></h3>
            </div>
        }
        console.log(trnsformedTasks);
    }
    else {
        trnsformedTasks = <div>
            <h3><center>Please authenticate first</center></h3>
        </div>
    }



    let c = null;
    if (taskNo > 4) c = "ScrollTasks";
    else c = "Tasks";


    return (
        <div className={classes[c]}>
            {trnsformedTasks}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        totalTask: state.taskDB.totalTask
    }
}

export default connect(mapStateToProps)(tasks);