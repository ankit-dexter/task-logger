import React, { } from 'react';
import AddButton from '../../../UI/Button/AddButton';
import { connect } from 'react-redux';
import * as actions from '../../../../Store/actions/index';

const task = props => {


    const selectedTaskData = (selectedTaskName) => {


        for (const taskKey in props.tasks) {
            if (props.tasks[taskKey].name === selectedTaskName) {
                props.setSelectedTaskPointer(taskKey);
                props.setSelectedTask(props.tasks[taskKey]);

                break;
            }
        }

    }

    return (
        <div>
            <AddButton taskName={props.taskName} clicked={() => selectedTaskData(props.taskName)} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        tasks: state.taskDB.tasks,
        selectedTask: state.taskDB.selectedTask
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedTask: (selectedTask) => dispatch(actions.setSelectedTask(selectedTask)),
        setSelectedTaskPointer: (pointer) => dispatch(actions.setSelectedTaskPointer(pointer))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(task);