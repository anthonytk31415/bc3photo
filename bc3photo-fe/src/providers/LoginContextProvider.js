import React, {useState, useContext} from 'react';


const LoginContext = React.createContext();


function LoginContextProvider({children}) {

    //define useState vars
    const [myVar, setMyVar] = useState('');


    return (
        <LoginContext.Provider value={{
            myVar, setMyVar

        }}>
            {children}
        </LoginContext.Provider>
    )
    
}


export {LoginContextProvider}