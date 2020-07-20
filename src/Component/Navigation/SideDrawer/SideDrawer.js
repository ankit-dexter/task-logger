import React from 'react';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/_Aux/_Aux';
import {NavLink} from 'react-router-dom';


const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.NavLink}>
                <NavLink 
                to="/"
                exact
                activeClassName={classes.active}> Task Logger</NavLink>
                <hr></hr>
                {!props.isAuth ? 
                 <NavLink 
                 to="/auth"
                 exact
                 activeClassName={classes.active}>Authenticate</NavLink>
                
                :
                <NavLink 
                to="/logout"
                exact
                activeClassName={classes.active}>Logout</NavLink>    
        }
        </div>
            </div>
        </Aux>
    );
};

export default React.memo(sideDrawer);