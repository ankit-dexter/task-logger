import React from 'react';
import classes from './Logo.css'
import TBLogo from '../../../Assets/TBLogger.svg';

const Logo = props => (
    <div className={classes.Logo}>
        <img src={TBLogo} alt="TaskBase Logo" />
    </div>
)

export default Logo;