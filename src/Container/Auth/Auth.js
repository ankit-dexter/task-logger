import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../Component/UI/Input/Input';
import SubmitButton from '../../Component/UI/Button/AddButton';

import classes from './Auth.css';
import * as actions from '../../Store/actions/index';
import { updateObject, checkValidity } from '../../Utility/Utility';

const auth = props =>  {

    const [controls, setcontrols] = useState({
        
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        
    })
       
        const [isSignup, setIsSignup] = useState(true)

    useEffect(() => {
        props.onSetAuthRedirectPath();
        props.onAuthCheckState();
    }, []);
   

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( controls, {
            [controlName]: updateObject( controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, controls[controlName].validation ),
                touched: true
            } )
        } );
        setcontrols(updatedControls);
        //this.setState( { controls: updatedControls } );
    }

    const submitHandler = ( event ) => {
        event.preventDefault();
        props.onAuth( controls.email.value, controls.password.value, isSignup );
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
        // this.setState( prevState => {
        //     return { isSignup: !prevState.isSignup };
        // } );
    }

    //render () {
        const formElementsArray = [];
        for ( let key in controls ) {
                formElementsArray.push( {
                id: key,
                config: controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );

       

        let errorMessage = null;

        if ( props.error ) {
            errorMessage = (
                <p>{props.error.message}</p>
            );
        }

        let authRedirect = null;
        if ( props.isAuthenticated ) {
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

    return(
            <div className={classes.Auth}>
            <form>
            {authRedirect}
                <div className={classes.ErrorMsg}>{errorMessage}</div>
                {form}
            <div className={classes.Submit}>
                <SubmitButton clicked={(event) => submitHandler(event)} taskName={isSignup ? "Sign Up" : " Log in"} />
            </div>
            </form>
            <div className={classes.Submit}>
                <SubmitButton clicked={switchAuthModeHandler} taskName={isSignup ? "Swith To LogIn" : "Switch to Sign Up"} />
            </div>
            </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
       
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) ),
        onAuthCheckState : () => dispatch(actions.authCheckState())
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( auth );