
import React, { useContext, useState, useEffect, useRef} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LoginPage} from  '../../login';
import { SignupPage} from  '../../signup';
import { LoginContext } from "../../providers/LoginContextProvider"

function AccountSettingsIcon() {

    const divRef = useRef(null);
    const [showAccountSettings, setShowAccountSettings] = useState(false);
 
    const {
        showSignup, setShowSignup,
        showLogin, setShowLogin
        } = useContext(LoginContext);

    function toggleLogin() {
        setShowAccountSettings(false)
        setShowLogin(true)
    }

    function toggleSignup() {
        setShowAccountSettings(false)
        setShowSignup(true);
    }

    function toggleAccountSettings(event) {
        event.preventDefault();
        if (1) {
            setShowAccountSettings((prevState) => !prevState);
        }
    }

    useEffect(() =>  {
        const handleClickOutside = (e) => {
            if (divRef.current && !divRef.current.contains(e.target)){
                setShowAccountSettings(false);
            }
        }; 

        document.addEventListener('click', handleClickOutside);


        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, []); 


    return (
        <div> 
            <div ref={divRef} className='accountSettingsContainer' onClick={toggleAccountSettings}>  
                    <div className="accountSettingsIcon" >
                        <img src="/images/hamburger.png" alt="account circle icon" className='icon-invert-color'/>
                        <img src="/images/account_circle.png" alt="account circle icon" className='icon-invert-color'/>
                    </div>
                
                    <div onClick={(e) => {e.stopPropagation()}}> 
                        {showAccountSettings && ( 
                            <div className='box'> 
                                <div className='boxDivider'>
                                    <Link className={'boxTextContainer text-bold'} to="#" onClick={toggleSignup} > 
                                        <p className="boxLinkText">Sign up</p>
                                    </Link>
                                    <Link className={'boxTextContainer'} to="#" onClick={toggleLogin} > 
                                        <p className="boxLinkText">Log in</p>
                                    </Link>
                                    
                                </div>
                            </div>
                        )}

                        {showLogin && (
                            <div className={"background-gray show-background"} >
                                <div className = "background-login">
                                <LoginPage />
                                </div>
                            </div>
                        )}  

                        {showSignup && (
                            <div className={"background-gray show-background"} >
                                <div className = "background-login">
                                <SignupPage />
                                </div>
                            </div>
                        )}

                    </div>

                <Routes>
                    <Route key='login' path='/login' element={<LoginPage/>}/> 
                    <Route key='signup' path='/signup' element={<SignupPage/>}/> 
                </Routes>
            
            </div>
        </div>
    );
}

export {AccountSettingsIcon}