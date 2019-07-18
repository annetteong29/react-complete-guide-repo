import React from 'react';

// return functional component
const withClass = (WrappedComponent, className) => {
    // need to pass props to the WrappedComponent using spread
    return props => ( 
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
};

export default withClass;