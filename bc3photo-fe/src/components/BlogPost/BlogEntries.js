import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import { formatDateString } from "../../helperFunctions/dates";

function BlogBlurbBS({blogPost}) {
    let blogPath = `/blog/${blogPost._id}`; 
    return (
        <Link to={blogPath} className="BlogBlurbBS"> 
            <Card style ={{width: '20rem'}}> 
                <Card.Img variant="top" src={blogPost.cover} />
                <Card.Body >
                    <Card.Title>{blogPost.title}</Card.Title>
                    <Card.Text>{blogPost.blurb}</Card.Text>
                    <Card.Text>{formatDateString(blogPost.date)}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

function BlogEntries({blogData}) {

    let elements = []
    for (let i = 0; i < blogData.length; i ++) {
        elements.push(
            <BlogBlurbBS blogPost={blogData[i]}/>
        )
    }

    return (
        <div className='blogPostContainer'>
            {elements}
            <p>Sample Card Below</p>
            <Card style ={{width: '20rem'}}> 
                <Card.Img variant="top" src="/images/AntelopeBeampost2-1200x800.jpg" />
                <Card.Body >
                    <Card.Title>My Title</Card.Title>
                    <Card.Subtitle className="blogPostPreviewDate">Date</Card.Subtitle>
                    <Card.Text>What?</Card.Text>
                </Card.Body>
            </Card>
            
            
        
        </div>
    )
}

export {BlogEntries}