import React, { } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Store/actions/index';

import classes from './Input.css';
import { updateObject } from '../../../Utility/Utility';
const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    const changeHours = (event) => {
        const updatedTime = updateObject(props.tempTime, { minute: props.tempTime.minute, hours: event.target.value });
        props.onsettempTime(updatedTime);

    }

    const changeMinute = (event) => {
        const updatedTime = updateObject(props.tempTime, { hours: props.tempTime.hours, minute: event.target.value });
        props.onsettempTime(updatedTime);

    }



    if (props.invalid && props.shouldValidate && props.touched) {

        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('email'):
            inputElement = <input
                type="email"
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ('timeTaken'):

            inputElement = (
                <div className={classes.Time}>

                    <div>Time Taken : </div>

                    <div>
                        <input
                            type="number"
                            className={inputClasses.join(' ')}


                            onChange={(event) => changeHours(event)}
                            placeholder={props.value.hours ? props.value.hours + 'hours' : 'hours'}
                            required
                            min='0' />

                        <input
                            type="number"
                            className={inputClasses.join(' ')}


                            onChange={(event) => changeMinute(event)}
                            placeholder={props.value.minute ? props.value.minute + 'minute' : 'minute'}
                            required
                            min='0'
                            max='59' />
                    </div>
                </div>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

const mapStateToProps = state => {
    return {
        tempTime: state.tempData.tempTime,
        selectedTask: state.taskDB.selectedTask
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onsettempTime: (updatedTime) => dispatch(actions.settempTime(updatedTime))

    }
}


export default React.memo(connect(mapStateToProps, mapDispatchToProps)(input));