import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { SignupPage} from  './signup';

import { AccountTitle } from './components/AccountSettings/AccountTitle';
import { CustomFormInput } from './components/AccountSettings/CustomFormInput';
import { AccountBody } from './components/AccountSettings/AccountBody';
import { CheckBoxShowPassword } from './components/AccountSettings/CheckBoxShowPassword';



import { LoginContext, LoginContextProvider } from './providers/LoginContextProvider';

// currently WIP: 
// - need to build how to get a token, store the token, and use the token 
//   - where to store the token? 
// - also need to build the backend logic - do you build a separate 
//   router for token authentication for protected data sources and make that
//   router call for each data-protected path? 


// writing login logic here
// we attempt a login; if it is successful, then we store
// the jwt token in local storage. 
function fetchLogin(newLogin) {
    fetch('/login', {
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
        return response.json()

    })        
    .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token)
        // now potentially redicrect to authenticated route or perform other actions
        // potentially go to some page afterwards for a redirect. Example below:
        // window.location.href = '/authenticated-route'; // Replace with your route
    })
    .catch((error) => {
        console.error(error);
        alert('Login failed. Please check your credentials.')
    });
        
        
};



function LoginMenu(){

    const {
        signupBool, setSignupBool, 
        email, setEmail, 
        emailError, setEmailError, 
        password, setPassword, 
        passwordError, setPasswordError,

        handleEmailChange, handleEmailBlur, handleEmailEntryFocus,
        handlePasswordChange, handlePasswordBlur, handlePasswordEntryFocus,

        showPassword, toggleShowPassword,

        } = useContext(LoginContext);

    function handleSubmit(e){
        e.preventDefault();
        if (!emailError && !passwordError){
            
            // write the login flow; 
            // *** currently disabled ***
            const newLogin = {email, password};
            fetchLogin(newLogin);
            console.log('Form Submitted!');
            return;
        }else {
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
                {/* {!emailError && <div style={{height: '10px'}}></div>} */}

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
                {/* <div style={{height: '12px', backgroundColor: 'transparent'}}/> */}
                <CheckBoxShowPassword showPassword={showPassword} toggleShowPassword={toggleShowPassword}/>
                {/* <div style={{height: '10px'}}/> */}
                {passwordError && <p className="showInputError-text">{passwordError}</p>}
                {/* {!passwordError && <div style={{height: '10px'}}/>} */}

                <button type='submit' className='formButton'>Continue</button>
            </form> 
            <br></br>

        </div>
    )
}




function LoginPage(){

    const {
        setShowLogin, 
        setEmail, setPassword,
        setShowSignup, 
        closeLoginWindow, 
        showPassword, toggleShowPassword

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