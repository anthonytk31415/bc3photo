import React from 'react';
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountSettingsIcon } from './components/AccountSettings/AccountSettingsIcon';



function Menu() {
    return (
        <div className="menuBar">
            
            <Link className="menuBarLink" to= "/"> 
                <img className="bc3logo" src="/images/links/bc3logo.png" alt="na" />
            </Link>
            <Link className="menuBarLink" to= "/galleries"> Galleries </Link>
            <Link className="menuBarLink" to= "/about"> About</Link>
            <Link className="menuBarLink" to= "/blog"> Blog </Link>
            <Link className="menuBarLink" to= "/faq"> FAQ </Link>
            <Link to= "/facebook">
                <img className="socialMediaLink" src="/images/links/fb-logo.png" alt="na" />
            </Link>
            <Link to= "/instagram"> 
                <img className="socialMediaLink" src="/images/links/insta-logo.png" alt="na" />
            </Link>
            <Link to= "/email">
                <img className="socialMediaLink icon-invert-color" src="/images/links/mail.png" alt="na" /> 
            
            </Link>
            <Link to= "/cart"> 
                <img className="socialMediaLink icon-invert-color cartSize" src="/images/links/shopping-cart.png" alt="na" /> 
            </Link>

            <Link to= "/#"> 
                <AccountSettingsIcon />
            </Link>


        </div>
    )
}



export { Menu }