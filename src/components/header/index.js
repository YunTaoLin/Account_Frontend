import React from 'react';
import './index.scss';

const index = (props) => {
    return (
        <div id="header">
            <div className="menuBtn">

            </div>
            {props.children}
        </div>
    )
}

export default index

