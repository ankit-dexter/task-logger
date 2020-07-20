import React , {useState} from 'react';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../Component/Navigation/Toolbar/Tollbar';
import { connect } from 'react-redux';
import Modal from '../../Component/UI/Modal/Modal';
import * as actions from '../../Store/actions/index';
import SideDrawer from '../../Component/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const reset = () => { 
        props.resetError();
    }

    const [showSideDrawer, setShowSideDrawer] = useState(false)
    // state = {
    //     showSideDrawer: false
    // }

    const sideDrawerClosedHandler = () => {
       setShowSideDrawer(false);
       // this.setState( { showSideDrawer: false } );
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
        // this.setState( ( prevState ) => {
        //     return { showSideDrawer: !prevState.showSideDrawer };
        // } );
    }
    return (
        <Aux>
            <div className={classes.SideD}>
        <SideDrawer 
            isAuth={props.isAuth}
            open={showSideDrawer}
            closed={sideDrawerClosedHandler}
        /> 
        </div>
        <Toolbar 
            isAuth={props.isAuth}
                    drawerToggleClicked={sideDrawerToggleHandler}
        />
               
        {props.error ?
            <Modal popup={props.error}  modalClosed={() => reset()} >
                <h2 className={classes.ErrorMsg}>{props.error.message}</h2>
            </Modal>

        :
        <main className={classes.Content}>
            {props.children}
        </main>
        }

        
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        error : state.taskDB.error,
        isAuth : state.auth.token !==null
    }
}

const mapDispatcherToProps = dispatch => {
    return {
        resetError : () => dispatch(actions.resetError())
    }
}
export default React.memo(connect(mapStateToProps,mapDispatcherToProps)(layout),
(prevProps, nextProps) =>
      nextProps.children === prevProps.children
);