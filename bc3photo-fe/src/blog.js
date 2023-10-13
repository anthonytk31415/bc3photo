import React, {useState, useEffect} from 'react';
import { BlogEntries } from './components/BlogPost/BlogEntries';


function Blog() {
    const [blogData, setBlogData] = useState([]);
    useEffect(() => {
        console.log('initiating load.');
        fetch('/blogdata', {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                console.log('reponse received');
                return response.json();
            })
            .then(data => {
                console.log("viewing data...")
                console.log(data)
                setBlogData(data);
                console.log('Data received successfully!');
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <div>
            this is the blog entries
            <BlogEntries blogData={blogData}/>
        </div>
    )
}

export { Blog }