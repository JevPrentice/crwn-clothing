import React from "react";
import Spinner from "../spinner/spinner.component";

const WithSpinner = WrappedComponent => {
    const result = ({isLoading, ...otherProps}) => {
        return isLoading
            ? <Spinner/>
            : <WrappedComponent {...otherProps} />;
    };
    return result;
};

export default WithSpinner;
