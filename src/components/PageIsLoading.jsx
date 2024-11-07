import React from 'react';
import spinner from "../assets/img/spinner.webp"

const PageIsLoading = () => {
    return (
        <div className="page-is-loading">
            <img src={spinner} alt="loading"/>
        </div>
    );
};

export default PageIsLoading;