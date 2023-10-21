import React, {useEffect, useState} from 'react';
import {BlogPostContainer} from './components/BlogPost/BlogPostContainer';
import { useParams } from 'react-router-dom';


function BlogEntry() {

    const [title, setTitle] = useState('');
    const [cover, setCover] = useState(null)
    const [blogPostBody, setBlogPostBody] = useState([]);
    const [blogDate, setBlogDate] = useState('');

    let {blog_id}  = useParams();

    // (1) fetch request to grab data based on the blog id
    // (2) will need to get the blog id on the backend to make it a link
    // (3) write the BE the path
    useEffect( () => {
        fetch(`http://localhost:8080/blog/${blog_id}`, {
            method: 'GET', 
            headers: {"Content-Type": "application/json", 
        }})
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTitle(data.title)
                setCover(data.cover)
                setBlogPostBody(data.blogBody)
                setBlogDate(data.date)
            })
            .catch(error => console.error(error));

    }, );

    return (
        <div> 
            <p> this is my blog post: {blog_id} </p>
            <p> Date: {blogDate} </p>
            {title && cover && blogPostBody && <BlogPostContainer title={title} cover ={cover} blogPostBody={blogPostBody}/>}
            

        </div>
    )

}

export {BlogEntry}