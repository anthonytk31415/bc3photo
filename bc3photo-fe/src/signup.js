import React, { useContext } from 'react'
import { Routes, Route, } from 'react-router-dom';
import { LoginPage} from  './login';
import { LoginContext } from "./providers/LoginContextProvider"
import { CustomFormInput } from './components/AccountSettings/CustomFormInput';
import { AccountTitle } from './components/AccountSettings/AccountTitle';
import { AccountBody } from './components/AccountSettings/AccountBody';
import { CheckBoxShowPassword } from './components/AccountSettings/CheckBoxShowPassword';


// writing Signup logic here
function fetchSignup(newPost) {
    fetch('/signup', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost)
    })
        .then((response) => {
            response.json()
            console.log('Signup completed')
        })        
        .catch((error) => console.error(error))
};

function SignupMenu() {
    const {      
        email, 
        emailError, 
        password,
        passwordError, 
        passwordConfirm, setPasswordConfirm,
        passwordConfirmError, setPasswordConfirmError,
        
        handleEmailChange, handleEmailBlur, handleEmailEntryFocus,
        handlePasswordChange, handlePasswordBlur, handlePasswordEntryFocus,

        showPassword, toggleShowPassword,
        

        } = useContext(LoginContext);


    function handlePasswordConfirmChange(e){
        setPasswordConfirm(e.target.value);
        setPasswordConfirmError('');
    }

    function handlePasswordConfirmEntryFocus(e){
        e.target.placeholder = 'Confirm your Password, fools!';
        setPasswordConfirmError('')
    }

    function handlePasswordConfirmBlur(e) {
        console.log(e.target.value)
        if (e.target.value !== password) {
            setPasswordConfirmError('Your passwords do not match!');
        }
    }

    // handle a real submit; do some print for now
    function handleSubmit(e){
        e.preventDefault();
        if (!emailError && !passwordError && !passwordConfirmError){
            // write the login flow
            const newSignup = {email, password};

            fetchSignup(newSignup);
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
                {passwordError && <p className="showInputError-text">{passwordError}</p>}


                <label>

                    <CustomFormInput
                        name="passwordConfirm-input"
                        type="Confirm Password"
                        value={passwordConfirm}
                        onChangeFn = {handlePasswordConfirmChange}
                        onBlurFn ={handlePasswordConfirmBlur}
                        onFocusFn ={handlePasswordConfirmEntryFocus}
                        placeholder = 'Confirm your password'
                        className = "inputText"
                        showPassword = {showPassword}
                    />


                </label>
                
                <CheckBoxShowPassword showPassword={showPassword} toggleShowPassword={toggleShowPassword}/>

                {passwordConfirmError && <p className='showInputError-text'>{passwordConfirmError}</p>}

                <button disabled={!(!emailError && !passwordError && !passwordConfirmError)} type='submit' className='formButton'>Sign Up</button>
            </form> 
            <br></br>
    </div>
    )
}




function SignupPage() {
    const {
        setShowLogin, 
        closeLoginWindow
        } = useContext(LoginContext);


    function switchLogin() {
        closeLoginWindow()
        setShowLogin(true)
    }

    return (
        <div className = "account-container">
            <AccountTitle
                title="Sign up"
                closeLoginWindowFn = {closeLoginWindow}
            />

            <AccountBody 
                ChildComponent={SignupMenu}
                childClassName= 'loginMenu'
                clickFn = {switchLogin}
                linkMsg = "Already a member?"
                linkMsgCta = "Log in!"
            />

            <Routes>
                <Route key='login' path='login' element={<LoginPage/>}/> 
            </Routes>
        </div>
    )
}

export { SignupPage }