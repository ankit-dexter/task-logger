import React, {
    useState, useEffect
} from 'react';
import classes from './DataNode.css';
import { connect } from 'react-redux';
import * as actions from '../../../../Store/actions/index';
import { displayTime } from '../../../../Utility/Utility';
import UpdateDataForm from '../../DataForm/UpdateDataForm/UpdateDataForm';
import DataForm from '../../DataForm/DataForm';

const dataNode = (props) => {
    const [selectedProp, setSelectedProp] = useState(props.selectedNode.process);
    const [mode, setmode] = useState('read')
    const [isExpended, setisExpended] = useState(props.parentNode ? 'true' : props.selectedNode.isExpended);

    const [body, setBody] = useState(null)
    useEffect(() => {
        setmode('read');
        setSelectedProp(props.selectedNode.process);

    }, [props.selectedNode])

    const changeMode = (act) => {

        if (act === 'updateTask') {

            if (mode === 'update') {
                setmode('read');

            }
            else if (mode === 'addSubTask') {
                setmode('update');

            }
            else setmode('update');
            if (!isExpended) {
                setisExpended(!isExpended);
            }
        }
        else if (act === 'addSubTask') {

            if (mode === 'addSubTask') {
                setmode('read');

            }
            else if (mode === 'update') {
                setmode('addSubTask');

            }
            else setmode('addSubTask');
            if (!isExpended) {
                setisExpended(!isExpended);
            }

        }
    }


    useEffect(() => {

        switch (mode) {
            case 'read':
                setBody(<tr>
                    <td className={classes.Sidenav} colSpan='1'>
                        <div>
                            <p onClick={() => setSelectedProp(props.selectedNode.process)}> <span role='img'>🗒</span> &nbsp;&nbsp; Process</p>
                            <p onClick={() => setSelectedProp(props.selectedNode.method)}> <span role='img'>❔</span> &nbsp;&nbsp; Task Type</p>
                            <p onClick={() => setSelectedProp(displayTime(props.selectedNode.timeTaken))}><span role='img'>⏳</span> &nbsp;&nbsp; Time Taken</p>
                            <p onClick={() => setSelectedProp(props.selectedNode.toolUsed)}> <span role='img'>🔧</span> &nbsp;&nbsp;  ToolUsed</p>
                        </div>

                    </td>
                    <td className={classes.Main} colSpan='3'>
                        {selectedProp}
                    </td>
                </tr>)
                break;
            case 'addSubTask':
                setBody(<tr>
                    <td colSpan='4'><DataForm selectedNode={props.selectedNode} mode={mode} /></td>
                </tr>);
                break;
            case 'update':
                setBody(<tr>
                    <td colSpan='4'><UpdateDataForm selectedNode={props.selectedNode} mode={mode} /></td>
                </tr>);
                break;

            default:
                break;
        }
    }, [mode, selectedProp, props.selectedNode])

    const [expendBody, setexpendBody] = useState(null);
    useEffect(() => {
        if (isExpended) {
            setexpendBody(
                <tbody>
                    {body}

                    <tr className={classes.Comment}>

                        <td colSpan='4'>
                            comment  // {props.selectedNode.comment}
                        </td>
                    </tr>
                </tbody >
            );
        }
        else setexpendBody(null);
    }, [isExpended, props.selectedNode, body, props.selectedNode.mode])


    return (
        <div className={classes.DataNode}>
            <div className={classes.link}><button onClick={() => setisExpended(!isExpended)}> {isExpended ? '➖' : '➕'}</button></div>

            <table>
                <thead >
                    <tr >

                        <th colSpan='3'>
                            OBJECTIVE : {props.selectedNode.objective}
                        </th>
                        <th className={classes.Button} colSpan='1'>
                            <button
                                value={props.selectedNode.taskId}
                                onClick={() => changeMode('updateTask')}>{mode !== 'update' ? 'Update Task ♻' : 'Cancle Update 🚫'}
                            </button>
                            <button
                                value={props.selectedNode.taskId}
                                className={classes.Red}
                                onClick={() => props.onDeleteTask(props.selectedNode, props.selectedNode.taskId, props.token, props.selectedTaskPointer)}>Delete Task ✖</button>
                            <button
                                value={props.selectedNode.taskId}
                                className={classes.Green}
                                onClick={() => changeMode('addSubTask')}>{mode !== 'addSubTask' ? 'Add SubTask  ➕' : 'Cancle  🚫'}</button>

                        </th>
                    </tr>


                </thead>

                {expendBody}

                <tfoot>
                    {props.selectedNode.node || props.selectedNode.node === null

                        ?


                        <tr>
                            <td colSpan='4'>
                                {props.children}
                            </td>
                        </tr>



                        :
                        null

                    }
                </tfoot>

            </table >

        </div >



    );
}

const mapStateToProps = state => {
    return {

        token: state.auth.token,
        tasks: state.taskDB.tasks,
        selectedTask: state.taskDB.selectedTask,
        selectedTaskPointer: state.taskDB.selectedTaskPointer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteTask: (taskData, taskId, token, sP) => dispatch(actions.deleteTask(taskData, taskId, token, sP)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(dataNode);