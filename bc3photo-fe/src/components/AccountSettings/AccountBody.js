import React from 'react';
import { Link } from 'react-router-dom';

function AccountBody({
    ChildComponent, 
    childClassName, 
    clickFn, 
    linkMsg, 
    linkMsgCta, 

    }) {
    return (
        <div className = "account-body"> 
            <div className = "account-body-container">
                <h3 className="login-welcome" >Welcome to BC3 Photography</h3>
                <ChildComponent className = {childClassName}/> 
                <br></br>
                <div >
                    <p>{linkMsg}{' '} 
                        <Link to="#" onClick={clickFn} > {linkMsgCta} </Link> 
                    </p>
                </div>
            </div>
        </div>
    )
}

export {AccountBody};