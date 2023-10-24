import React from "react";

// this is the custom check box to show or hide the password 
function CheckBoxShowPassword({showPassword, toggleShowPassword}) {
    return (
        <div className ="CheckBoxShowPassword" onClick={toggleShowPassword}> 
            {showPassword ? 
                <img className="CheckBoxShowPassword-img" src="/images/checkbox-fill.png" alt="checkbox-blank" /> 
            :
                <img className="CheckBoxShowPassword-img" src="/images/checkbox-blank.png" alt="checkbox-blank" /> 
            }

            <p className="CheckBoxShowPassword-text"> Show Password</p>
        </div>
    )
}

export {CheckBoxShowPassword};