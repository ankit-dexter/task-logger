import React, { useState } from 'react';

import Modal from '../../Component/UI/Modal/Modal';
import Aux from '../_Aux/_Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {
        const [error, setError] = useState(null);

        // state = {
        //     error: null
        // }

        //componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                setError(null);
                //this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, err => {
                setError(err);
                //this.setState( { error: error } );
            } );
        //}

        //componentWillMount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        //}

        const errorConfirmedHandler = () => {
            setError(null);
            //this.setState( { error: null } );
        }

        //render () {
            return (
                <Aux>
                    <Modal
                        show={error}
                        modalClosed={errorConfirmedHandler}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
       // }
    }
}

export default withErrorHandler;