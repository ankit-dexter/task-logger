import React, {  } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../BackDrop/BackDtop';

const modal = (props) => {

    
  
        return (
            <Aux>
                <Backdrop popup={props.popup} clicked={props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: props.popup ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.popup ? '1' : '0'
                    }}
                    >
                    {props.children}
                </div>
            </Aux>
        )
    }


export default React.memo(
    modal,
    (prevProps, nextProps) =>
      nextProps.popup === prevProps.popup &&
      nextProps.children === prevProps.children
  );