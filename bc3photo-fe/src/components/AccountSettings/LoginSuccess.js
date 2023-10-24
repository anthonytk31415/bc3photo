import React, { useContext } from 'react';


import { LoginContext } from '../../providers/LoginContextProvider';

// show "auth successful"



function LoginSuccess(){

    const {
        closeShowLoginSuccess
        } = useContext(LoginContext);




    return (
        <div className = "account-container">
            <p> Auth Successful!</p>
            <button className='formButton' onClick={closeShowLoginSuccess}> Proceed </button>
        </div>
    )
}

export { LoginSuccess }