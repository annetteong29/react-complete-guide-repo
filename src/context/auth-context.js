import React from 'react';

// create context object
// initialise context with a default value
const authContext = React.createContext(
    // gives better auto-completion in IDE
    {   authenticated: false, 
        login: () => {
        // doesn't matter what you set as a default value
    }
});

export default authContext;