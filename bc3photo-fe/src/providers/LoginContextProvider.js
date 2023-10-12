import React, {useState, useContext} from 'react';


const LoginContext = React.createContext();


function LoginContextProvider({children}) {
    //define useState vars

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const [signupBool, setSignupBool] = useState(false);
  
    const [showPassword, setShowPassword] = useState(false);
  
    function toggleShowPassword(e) {
      console.log("pw clicked");
      setShowPassword(prevValue => !prevValue);
    }
  
    function signupClick(e) {
      setSignupBool(true);
    }
  
    function loginClick(e) {
        setSignupBool(false);
    }
  
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
  
    function handlePasswordChange(e){
        setPassword(e.target.value);
        setPasswordError('');
    }
  
    function handleEmailEntryFocus(e){
        e.target.placeholder = 'Enter Email, fools!'
        setEmailError('')
    }
  
    function handlePasswordEntryFocus(e){
        e.target.placeholder = 'Enter Password, fools!';
        setPasswordError('')
    }
  
    function handlePasswordBlur(e){
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (e.target.value !== '' && !e.target.value.match(passwordRegex)) {
          setPasswordError('PW requires 1 Upper, 1 Lower, 1 number, 1 char, and 8 chars long.');
        }
      }
  
    function handleEmailBlur(e) {
        if (e.target.value !== '' && !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          setEmailError('Please enter a valid email address');
        }
    }
  
    function closeLoginWindow() {
      setEmail('');
      setEmailError('');
      setPassword('');
      setPasswordError('');
      setPasswordConfirm('');
      setPasswordConfirmError('');
      setShowLogin(false);
      setShowSignup(false);
      setShowPassword(false);
    } 

    return (
        <LoginContext.Provider value = {{
            email, setEmail, 
            emailError, setEmailError,
            password, setPassword,
            passwordError, setPasswordError, 
            showLogin, setShowLogin, 
      
            passwordConfirm, setPasswordConfirm,
            passwordConfirmError, setPasswordConfirmError,
            showSignup, setShowSignup,
            signupBool, setSignupBool,
        
            handleEmailChange, handleEmailBlur, handleEmailEntryFocus,
            handlePasswordChange, handlePasswordBlur, handlePasswordEntryFocus,
        
            closeLoginWindow,
      
            showPassword, toggleShowPassword,
      
            }}>
            {children}
        </LoginContext.Provider>
    )
    
}

export {LoginContextProvider, LoginContext}