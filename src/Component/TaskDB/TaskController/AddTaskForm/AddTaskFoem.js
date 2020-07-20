import React, { useState } from 'react';
import Input from '../../../UI/Input/Input';
import { updateObject } from '../../../../Utility/Utility';
import Submit from '../../../UI/Button/AddButton';
import { connect } from 'react-redux';
import * as actions from '../../../../Store/actions/index';
import classes from './AddTaskFoem.css'

//import { Redirect } from 'react-router-dom';

const addTaskForm = props => {

    const [taskName, setTaskName] = useState({
        elementType: 'input',
        value: '',
        validations: {
            required: true,
            maxLength: 20
        },
        valid: false,
        touched: false,
        elementConfig: {
            placeholder: 'Task Name'
        }
    });
    const [errorMsg, seterrorMsg] = useState('')

    const validateForm = (value, validations) => {
        let isValid = true;

        if (!validations) {
            return true;
        }
        if (validations.required) {
            isValid = value.trim() !== '' && isValid;
            if (value.length === 0) {
                seterrorMsg('! please Enter Task Name');
            }
            if (value.trim().length > 0 && value.trim().length < 13) {
                seterrorMsg('');
            }


        }
        if (validations.maxLength) {
            isValid = value.trim().length <= validations.maxLength && isValid;
            if (value.trim().length > validations.maxLength) {

                seterrorMsg(" ! Task name must be less then 21 characters");

            }
            else if (value.trim().length !== 0) {
                seterrorMsg('');
            }
        }


        return isValid;

    }

    const onchangeHandler = (event, element) => {


        const updatedName = updateObject(taskName, {
            ...taskName,
            value: event.target.value,
            touched: true
        })

        const updatedForm = updateObject(updatedName,
            updateObject(updatedName, {
                valid: validateForm(event.target.value, element.validations)
            })
        )

        setTaskName(updatedForm);
    }

    const submitHandler = (event, taskName) => {
        event.preventDefault();

        const task = {
            name: taskName.value,
            userId: props.userId,
            objective: null,
            isTaskManual: true,
            timeTaken: 0,
            toolUsed: '',
            process: '',
            comments: '',
            mode: 'blank',
            node: null,
            url: '',
            isExpend: true
        }

        if (taskName.valid) {
            props.addTask(task, props.token, props.previousTasks, props.selectedTaskPointer);
            props.addingTask();
        }
        else if (taskName.value.trim().length === 0) {
            seterrorMsg('  PLEASE ! Enter Task Name');
        }


        //props.history.push('/');
    }

    let form = <form>
        <Input
            elementType={taskName}
            invalid={!taskName.valid}
            shouldValidate={taskName.validations}
            touched={taskName.touched}
            changed={(event) => onchangeHandler(event, taskName)}
            elementConfig={taskName.elementConfig}
        />
        <Submit clicked={(event) => submitHandler(event, taskName)} taskName="Submit" />
    </form>

    if (!props.isAuth) {
        form = <h2><center>! Please Autanticate First</center></h2>
    }
    return (
        <div>

            <div className={classes.ErrorMsg}>{errorMsg}</div>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        previousTasks: state.taskDB.tasks,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuth: state.auth.token !== null,
        selectedTaskPointer: state.taskDB.selectedTaskPointer
    }
}

const mapDispatcherToProps = dispatch => {
    return {
        addTask: (task, token, previousTasks) => dispatch(actions.addTask(task, token, previousTasks)),
        setTempNode: (tn) => dispatch(actions.setTempNode(tn))
    }
};
export default React.memo(connect(mapStateToProps, mapDispatcherToProps)(addTaskForm));