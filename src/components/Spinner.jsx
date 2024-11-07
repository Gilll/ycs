import React from 'react';
import spinner from "../assets/img/spinner.webp";

const Spinner = () => {
    return (
        <div className="loading-spinner">
            <img src={spinner} alt="loading"/>
        </div>
    );
};

export default Spinner;