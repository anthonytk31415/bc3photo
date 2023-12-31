import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { SignupPage} from  './signup';

import { AccountTitle } from './AccountTitle';
import { CustomFormInput } from './CustomFormInput';
import { AccountBody } from './AccountBody';
import { CheckBoxShowPassword } from './CheckBoxShowPassword';

import { LoginContext } from '../../providers/LoginContextProvider';

function fetchLogin(newLogin, closeLogin, openSuccess) {
    fetch('http://localhost:8080/login', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newLogin)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        // close login window
        closeLogin();
        // open success window
        openSuccess();
        return response.json()

    })        
    .then(response => {
        // store token
        const token = response.data.token;
        localStorage.setItem('token', token);

        // store user id
        const user_id = response.data.user_id;
        localStorage.setItem('user_id', user_id);
        console.log('token and user id retrieval successful!');
    })
    .catch((error) => {
        console.error(error);
        alert('Login failed. Please check your credentials.')
    });
};



function LoginMenu(){

    const {
        email,  
        emailError,  
        password,  
        passwordError, 

        handleEmailChange, handleEmailBlur, handleEmailEntryFocus,
        handlePasswordChange, handlePasswordBlur, handlePasswordEntryFocus,

        showPassword, toggleShowPassword,
        openShowLoginSuccess, closeLogin,
        } = useContext(LoginContext);

    function handleSubmit(e){
        e.preventDefault();
        if (!emailError && !passwordError){
            
            // write the login flow; 
            // *** currently disabled ***
            const newLogin = {email, password};
            fetchLogin(newLogin, closeLogin, openShowLoginSuccess);
            console.log('Form Submitted!');
            return;
        } else {
            console.log('form error')
        }
    }

    return (
        <div>
            
            <form onSubmit={handleSubmit} className='loginMenu'>
                <label> 
                    <CustomFormInput
                        name="email-input"
                        type="Email"
                        value={email}
                        onChangeFn = {handleEmailChange}
                        onBlurFn ={handleEmailBlur}
                        onFocusFn ={handleEmailEntryFocus}
                        placeholder = 'Enter your email'
                        pattern = "^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        className = "inputText"
                    />
                </label>

                {emailError && <p className="showInputError-text">{emailError}</p>}

                <label>
                    <CustomFormInput
                        name="password-input"
                        type="Password"
                        value={password}
                        onChangeFn = {handlePasswordChange}
                        onBlurFn ={handlePasswordBlur}
                        onFocusFn ={handlePasswordEntryFocus}
                        placeholder = 'Enter your password'
                        className = "inputText"
                        showPassword = {showPassword}
                    />
                </label>

                <CheckBoxShowPassword showPassword={showPassword} toggleShowPassword={toggleShowPassword}/>
                {passwordError && <p className="showInputError-text">{passwordError}</p>}
                <button type='submit' className='formButton'>Continue</button>
            
            </form> 
            <br></br>
        </div>
    )
}

function LoginPage(){

    const {
        setShowSignup, 
        closeLoginWindow, 

        } = useContext(LoginContext);

    function switchSignup() {
        closeLoginWindow()
        setShowSignup(true)
    }

    return (
        <div className = "account-container">
            <AccountTitle
                title="Log in"
                closeLoginWindowFn = {closeLoginWindow}
            />

            <AccountBody 
                ChildComponent={LoginMenu}
                childClassName= 'loginMenu'
                clickFn = {switchSignup}
                linkMsg = "Not a member?"
                linkMsgCta = "Sign up!"
            />
            
            <Routes>
                <Route key='signup' path='signup' element={<SignupPage/>}/> 
            </Routes>

        </div>
    )
}

export {LoginPage}