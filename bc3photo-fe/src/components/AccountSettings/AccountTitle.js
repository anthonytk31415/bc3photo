import React from 'react';

// Upper bar of the Account Settings 
function AccountTitle ({title, closeLoginWindowFn}) {
    return (
        <div className = "account-title-container"> 
            <div className='account-title-left' onClick={closeLoginWindowFn}> 
                <div className='account-title-left-spacer'> </div>
                <div className='x-circle'>
                    <img src='/images/close_x.png' alt="close-x"/>
                </div>
            </div>
            <div className='account-title-mid'>
                <h4 className='account-title-mid-header'>{title}</h4>
            </div>
            <div className='account-title-right'></div>
        </div>
    )
};

export {AccountTitle}