import React, { useState } from 'react';


const UserLoggedInContext = React.createContext();

/*
LoginContextProvider provides all vars to perform the login function
*/


function UserLoggedInContextProvider({children}) {
    //define useState vars
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    return (
        <UserLoggedInContext.Provider value = {{
            isAuthenticated, setIsAuthenticated
            }}>
            {children}
        </UserLoggedInContext.Provider>
    )
    
}

export {UserLoggedInContextProvider, UserLoggedInContext}