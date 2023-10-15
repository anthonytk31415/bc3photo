import React, {useEffect, useContext} from 'react';
import { BaseElements,
        BlogPostAddElementsMenu,
        SubmitBlogPostButton  } from './components/BlogPost/BlogPostElements';

import { BlogPostContainer } from './components/BlogPost/BlogPostContainer'
        
import { BlogPostProvider } from './providers/BlogPostProvider'
import { UserLoggedInContext } from './providers/UserLoggedInContextProvider';

// later add to centralized fetch functions?

function verifyToken() {

    /* this can be put in a function 
    purpose: verify token and retrieve it */
    const token = localStorage.getItem('token');
    console.log('retrieving token...')
    console.log(token);
    if (!token) {
        // token not found and route to 
        console.log('bad token')
        return 
    }
    fetch('http://localhost:8080/verifyauthentication', { 
        method: 'GET', 
        headers: {  
            Authorization: `Bearer ${token}`,
        }})
        .then((response) => {
            console.log(response)
            console.log('fetch successful!')
        }
        )
        .catch(error => console.error(error));
}


function CreateBlogPost() {

    const {isAuthenticated, setIsAuthenticated} = useContext(UserLoggedInContext)

    /// flow: verify auth, if true: then render page; if not, redirect to "need to auth"
    useEffect(() => {
        console.log('initiating CreateBlogPost page load.');
        verifyToken();
    }, []);

    return (
        <BlogPostProvider>
            <div className="BlogPostProviderContainer"> 
                <BaseElements/>
                <BlogPostAddElementsMenu/>
                <SubmitBlogPostButton/>

            </div> 
            <p> preview your content: (PLACEHOLDER) </p> 
            <BlogPostContainer />
        </BlogPostProvider>
    )
}



export { CreateBlogPost }