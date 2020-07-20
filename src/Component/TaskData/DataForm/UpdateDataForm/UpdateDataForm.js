import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../../UI/Input/Input';
import SubmitButton from '../../../UI/Button/AddButton';

import classes from './UpdateDataForm.css';
import * as actions from '../../../../Store/actions/index';
import { updateObject } from '../../../../Utility/Utility';

const updateDataForm = props => {

    const [time] = useState(
        {
            elementType: 'timeTaken',
            elementConfig: {
                type: 'timeTaken',
            },
            value: {
                hour: props.selectedNode.timeTaken.hours,
                minute: props.selectedNode.timeTaken.minute
            },
            valid: false,
            touched: true
        },
    )
    const [controls, setcontrols] = useState({

        //     toolsUsed : '',
        objective: {
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'current Objective : ' + props.selectedNode.objective
            },
            value: props.selectedNode.objective,
            validation: {
                required: true,
                maxLength: 100
            },
            valid: true,
            touched: true
        },
        process: {
            elementType: 'textarea',
            elementConfig: {
                type: 'textarea',
                placeholder: 'current Process : ' + props.selectedNode.process
            },
            value: props.selectedNode.process,
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },

        method: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'Auto', displayValue: 'Auto' },
                    { value: 'Manual', displayValue: 'Manual' }
                ],

            },
            value: props.selectedNode.method,
            validation: {},
            valid: true
        },
        comment: {
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'Current Comments : ' + props.selectedNode.comment
            },
            value: props.selectedNode.comment,
            validation: {
                required: false,
                maxLength: 100
            },
            valid: true,
        },
        toolUsed: {
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'Currently Tool used :' + props.selectedNode.toolUsed
            },
            value: props.selectedNode.toolUsed,
            validation: {
                required: true,
                maxLength: 20
            },
            valid: true,
            touched: true
        }

    })


    useEffect(() => {
        props.onSetAuthRedirectPath();
        props.onAuthCheckState();

    }, []);
    const [formIsValid, setformIsValid] = useState(true);

    const inputChangedHandler = (event, inputIdentifier) => {

        const finalValue = typeof (event.target.value) === 'object' ? updateObject(controls[inputIdentifier].value, event.target.value) : event.target.value;
        const updatedFormElement = updateObject(controls[inputIdentifier], {
            value: finalValue,
            valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(controls, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        setcontrols(updatedOrderForm);

        setformIsValid(formIsValid);
        //this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid && props.tempTime) {
            props.onfillTask(
                {
                    objective: controls['objective'].value,
                    timeTaken: props.tempTime,
                    process: controls['process'].value,
                    toolUsed: controls['toolUsed'].value,
                    method: controls['method'].value,
                    name: props.selectedNode.name,
                    userId: props.selectedNode.userId,
                    comment: controls['comment'].value,
                    taskId: props.selectedNode.taskId,
                    mode: 'read',
                    node: props.selectedNode.node,
                    url: props.selectedNode.url,
                    isExpended: false
                }

                , props.selectedNode.taskId, props.token, props.selectedTaskPointer);


        }
        else {
            props.setError('invalid Form');
        }




    }



    //render () {

    const formElementsArray = [];
    for (let key in controls) {

        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }


    const timeTakenField = <Input

        elementType={time.elementType}
        elementConfig={time.elementConfig}
        value={time.value}
        invalid={!time.valid}
        shouldValidate={true}
        touched={time.touched}
    />


    let form = (
        <div>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
        </div>

    );


    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {timeTakenField}
            <form>
                {authRedirect}

                <div className={classes.ErrorMsg}>{errorMessage}</div>
                {form}
                <div className={classes.Submit}>
                    <SubmitButton clicked={(event) => submitHandler(event)} disabled={!formIsValid} taskName="Submit" />
                </div>
            </form>

        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        authRedirectPath: state.auth.authRedirectPath,
        selectedTask: state.taskDB.selectedTask,
        tempTime: state.tempData.tempTime,
        dbError: state.taskDB.error,
        tasks: state.taskDB.tasks,
        selectedTaskPointer: state.taskDB.selectedTaskPointer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onAuthCheckState: () => dispatch(actions.authCheckState()),
        onfillTask: (taskData, taskId, token, sT) => dispatch(actions.fillTask(taskData, taskId, token, sT)),
        addTaskFailed: (error) => dispatch(actions.setError(error)),
        onSetSelectedTask: (task) => dispatch(actions.setSelectedTask(task)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(updateDataForm);