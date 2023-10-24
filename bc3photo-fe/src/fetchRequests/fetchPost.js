import { prepareToken } from "./verifyToken";

// hit the backend with this address
const basePath = 'http://localhost:8080'

// use this to make post requests with a token
// eg. path = '/blogpost'
async function fetchPostBackend(newPost, path) {
    const token = prepareToken()

    // later write the post requests here.
    try {
        fetch(`${basePath}${path}`, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newPost)
        })
        .then(response => {
            console.log('transfer complete');
            console.log(response);                  
        })
        .catch(() => {
            console.error("error triggered during fetch request")
        })
    } catch(error) {
        console.error("post error occurred.")
        console.error(error)
    }

};


export { fetchPostBackend }