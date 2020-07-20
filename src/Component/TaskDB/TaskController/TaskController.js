import React from 'react';
import AddButton from '../../UI/Button/AddButton';
import classes from './TaskController.css';

const taskController = props => {



    return (
        <div className={classes.TaskController}>
            <div><AddButton taskName={props.isAuth ? "ADD TASK 🗃" : "Login 🧞‍♂️"} clicked={props.addTask} /></div>
        </div>

    );
}

export default taskController;