import React from 'react';
import classes from './AddButton.css';

const addButton = props => {
    return (
        <div>
            <button className={classes.button} disabled={props.disabled} onClick={props.clicked}>{props.taskName}</button>
        </div>
    );
}

export default addButton;