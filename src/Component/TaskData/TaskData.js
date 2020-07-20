import React, { useEffect } from 'react';
import classes from './TaskData.css';
import { connect } from 'react-redux';
import DataNodes from './DataNodes/DataNodes';
import DataForm from './DataForm/DataForm';
import * as actions from '../../Store/actions/index';
import ButtonName from '../UI/Button/AddButton';
import Background from '../UI/Background/Background';

const taskData = props => {
    useEffect(() => {
        if (props.selectedTaskPointer < 0 || props.selectedTaskPointer) { props.setTDB(props.token, props.userId, -1); }
        else props.setTDB(props.token, props.userId, props.selectedTaskPointer);
    }, [props.selectedTaskPointer])
    return (
        <div className={classes.TaskData}>
            {props.selectedTask ?
                props.selectedTask.mode === 'blank' ?
                    <div>
                        <ButtonName className={classes.taskName} taskName={props.selectedTask.name} />
                        <div>
                            <DataForm selectedNode={props.selectedTask} />
                        </div>
                    </div>
                    :
                    <div>
                        <ButtonName className={classes.taskName} taskName={props.selectedTask.name} />
                        <div>
                            <DataNodes selectedNode={props.selectedTask} />
                        </div>
                    </div>

                :
                <div><Background /></div>

            }


        </div>
    );
}

const mapStateToProps = state => {
    return {
        task: state.taskDB.tasks,
        selectedTask: state.taskDB.selectedTask,
        selectedTaskPointer: state.tempData.selectedTaskPointer

    }
}
const mapDispatchToProps = dispatch => {
    return {

        onSetSelectedTask: (task) => dispatch(actions.setTempNode(task)),
        setTDB: (token, userId) => dispatch(actions.setTDB(token, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(taskData);