import React, {useEffect, useContext} from 'react';
import { BaseElements,
        BlogPostAddElementsMenu,
        SubmitBlogPostButton  } from './components/BlogPost/BlogPostElements';

import { BlogPostPreviewContainer } from './components/BlogPost/BlogPostContainer'
        
import { BlogPostProvider } from './providers/BlogPostProvider'
import { UserLoggedInContext } from './providers/UserLoggedInContextProvider';

// later add to centralized fetch functions?



// when you do verifyToken, do you actually have to do 
// 2 separate calls? can't you just provide the fetch request 
// with the token itself and handle the logic from the backend?  
function verifyToken() {

    return new Promise((resolve, reject) => {

        /* this can be put in a function 
        purpose: verify token and retrieve it */
        const token = localStorage.getItem('token');
        console.log('retrieving token...')
        console.log(token);
        if (!token) {
            // token not found and route to 
            console.log('bad token');
            resolve(false);
        }
        fetch('http://localhost:8080/verifyauthentication', { 
            method: 'GET', 
            headers: {  
                Authorization: `Bearer ${token}`,
            }})
            .then((response) => {
                console.log(response)
                if (response.ok ) {
                    console.log('fetch successful! and token is valid');
                    resolve(true);
                } else {
                    console.log('token delivered but login unsuccessful');
                    resolve(false);
                }
            }
            )
            .catch(error => {
                console.error(error);
                reject(error);
            });
});
}

function CreateBlogPost() {

    const {isAuthenticated, setIsAuthenticated} = useContext(UserLoggedInContext)

    /// flow: verify auth, if true: then render page; if not, redirect to "need to auth"
    useEffect(() => {
        console.log('initiating CreateBlogPost page load.');

        if (verifyToken()) {
            setIsAuthenticated(true);
            console.log(isAuthenticated, "true for isauth");
        } else {
            console.log("false statement")
            setIsAuthenticated(false);
        };
    });

    return (
        <div>
            {isAuthenticated && (<BlogPostProvider>
                <div className="BlogPostProviderContainer"> 
                    <BaseElements/>
                    <BlogPostAddElementsMenu/>
                    <SubmitBlogPostButton/>

                </div> 
                <p> preview your content: (PLACEHOLDER) </p> 
                <BlogPostPreviewContainer />
            </BlogPostProvider>
        )}
        </div>
    )
}



export { CreateBlogPost }