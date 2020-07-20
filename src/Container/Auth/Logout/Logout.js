

import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Store/actions/index';

const logout = props => {

    useEffect(() => {
        props.onLogout();
        props.untouchedDB();
    }, []);

   
    
    return (
        <div>
            {alert('logged Out SuccessFully !')}
          return <Redirect to="/"/>;
        </div>
    );
    
}
const mapStateToProps = state => {
    return {
        isAuth : state.auth.token !==null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        untouchedDB : () => dispatch(actions.untouchedDB())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(logout);