import React,{} from 'react';

import classes from './Toolbar.css';
import Logo from '../../UI/Logo/Logo';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';



const toolbar = ( props ) => {


    const style = props.loadingDB ? classes.ActiveToolbar : classes.Toolbar;
    
    return(<div>
     
    <div className={style}>

        <div className={classes.NavigationItems}><NavigationItem link="/" exact>TaskLogger</NavigationItem></div>
        <div onClick={props.drawerToggleClicked}>
        {props.loadingDB || props.loadingAuth ? <Spinner /> : <Logo />}
        </div>
        {!props.isAuth ? 
        <div className={classes.NavigationItems}><NavigationItem link="/auth">Authenticate</NavigationItem></div>
        :
        <div className={classes.NavigationItems}><NavigationItem link="/logout">Logout</NavigationItem></div>}
        
        
    </div>
    </div>
)};

const mapStateToProps = state => {
    return {
        loadingDB : state.taskDB.loading,
        loadingAuth :state.auth.loading
    }
}

export default React.memo(connect(mapStateToProps)(toolbar));