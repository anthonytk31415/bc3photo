import React, { useState } from 'react';


const UserLoggedInContext = React.createContext();

/*
LoginContextProvider provides all vars to perform the login function
*/


function UserLoggedInProvider({children}) {
    //define useState vars
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  

    return (
        <UserLoggedIn.Provider value = {{
            isAuthenticated, setIsAuthenticated
            }}>
            {children}
        </UserLoggedIn.Provider>
    )
    
}

export {UserLoggedInProvider, UserLoggedInContext}