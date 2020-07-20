import React from 'react';
import classes from './Background.css';
import Image from '../../../Assets/TBLogger.svg';

const background = () => {
    return (
        <div className={classes.Wavecontainer}>
            <img src={Image} alt="TaskBase Logo" />
        </div>
    );
}

export default background;