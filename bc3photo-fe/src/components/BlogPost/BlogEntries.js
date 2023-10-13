import React from "react";
import Card from 'react-bootstrap/Card';

function BlogBlurbBS({blogPost}) {
    return (
        <Card style ={{width: '20rem'}}> 
            <Card.Img variant="top" src={blogPost.cover} />
            <Card.Body >
                <Card.Title>{blogPost.title}</Card.Title>
                <Card.Text>What?</Card.Text>
                <Card.Text>Date Here</Card.Text>
            </Card.Body>
        </Card>
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
            <Card style ={{width: '20rem'}}> 
                <Card.Img variant="top" src="/images/AntelopeBeampost2-1200x800.jpg" />
                <Card.Body >
                    <Card.Title>My Title</Card.Title>
                    <Card.Subtitle className="blogPostPreviewDate">Date</Card.Subtitle>
                    <Card.Text>What?</Card.Text>
                </Card.Body>
            </Card>
            
            
            {/* // blogPost={{title: "My Title", cover:"/images/AntelopeBeampost2-1200x800.jpg"}} /> */}
        </div>
    )
}

export {BlogEntries}