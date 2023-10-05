import React, { useState } from 'react';
import { BlogPost, BlogPostBody } from './classes/BlogPost';


function addH3Element(){
    return 
}



function CreateBlogPost() {
    // const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState(''); // need to figure out how to "upload"


    const [blogPost, setBlogPost] = useState(new BlogPost());
    const [body, setBody] = useState(new BlogPostBody()) ;

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleCoverChange(e) {
        setCover(e.target.value);
    }

    function submitButton() {
        console.log("submitted")
    }

    return (
        <div> 
            <p> Create your elements </p>
            <form action ={submitButton} method="POST"> 
                <label for="author">Author:
                    <input type="text" id="title" name="title" value="Billy" required></input>

                </label> 
                <label for="title">Title:
                    <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required></input>
                </label> 
                <label for="cover">Cover:
                    <input type="text" id="cover" name="cover" value={cover} onChange={handleCoverChange} required></input>
                </label> 

            </form>
            <div>
                <p> Add Content: </p>

            </div>


            <p> preview your content: </p> 
            <div> 

            </div>

        </div> 
    )
}



export { CreateBlogPost }