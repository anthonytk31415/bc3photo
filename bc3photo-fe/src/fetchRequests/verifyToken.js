

function prepareToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Token not found.")
    }
    return token
}



// grab token from local storage
function getToken() {
    const token = localStorage.getItem('token');
    return token ;
}

// send fetch request to verify token
function verifyToken(token) {
    return fetch('http://localhost:8080/verifyauthentication', { 
        method: 'GET', 
        headers: {  
            Authorization: `Bearer ${token}`,
        }})
        .then((response) => {
            if (response.ok) {
                response.json()
            } else {
                throw new Error('Token validation failed')
            }
        });
}

//success portion of handle verification
function handleVerificationSuccess(response, setFunction) {
    console.log("Successful verification"); 
    setFunction(true); 

}
// error portion of handle verification
function handleVerificationFailure(error, setFunction) {
    console.error('Token validation error', error);
    setFunction(false);
}


//////////////////////////////////////////////////////
// main function to be used on pages 
//////////////////////////////////////////////////////
function handleVerification(setFunction) {
    const token = getToken();
    if (token) {
        verifyToken(token)
            .then((response) => {
                handleVerificationSuccess(response, setFunction)
            })
            .catch((e) => {
                handleVerificationFailure(e, setFunction);
            })
    } else {
        setFunction(false)
    }
}



export {handleVerification, prepareToken}