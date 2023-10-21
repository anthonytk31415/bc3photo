import React, { useState, useContext } from 'react';
import { BlogPost, BlogPostBodyElement, ImageSetData} from '../../classes/BlogPost';

// import { BlogPostContainer } from './BlogPostContainer';

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { CreateBlogPostContext } from '../../providers/BlogPostProvider';

////////////////////////////////////////////////
// build macros elements holder
////////////////////////////////////////////////

function BaseElements(props){

    const {
        title, handleTitleChange,
        handleCoverUpload,
    } = useContext(CreateBlogPostContext);

    return (
        <div> 
            <p> Create your elements </p>
            <Form className="formInput">
                <Form.Group className="mb-1" controlId="formMainElements">
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Title</label>
                        <Form.Control type="text" value={title} required onChange={handleTitleChange}/>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Upload Cover</label>
                        <Form.Control type="file" accept="image/*" onChange={handleCoverUpload}/>
                    </Stack>
                </Form.Group>
            </Form>
        </div>
    )
}

// build menu for adding content elements
function BlogPostAddElementsMenu(props) {

    const {
        showAddElement, toggleShowAddElement, 
        elementType, setElementType, 
        } = useContext(CreateBlogPostContext)

    const handleElementChange = (e) => {
        setElementType(e.target.value);
        };
    
    return (
        <div>
            <p> Add Content Menu </p>
            <Button onClick={toggleShowAddElement} > {showAddElement ? "Remove Content -" : "Add Content +"}</Button>
            {showAddElement && <div> 

                <Form className="formInput">
                    <Stack direction="horizontal" gap={2}> 
                        <label className="formLabel">Select element</label>
                        <Form.Control as="select" value={elementType} onChange={handleElementChange}>
                            <option>Select an Element</option>
                            <option>h3</option>
                            <option>h4</option>
                            <option>text</option>
                            <option>imageSet</option>
                        </Form.Control>
                    </Stack>
                </Form>

                <div> 
                    {(elementType === "h3" || elementType === "h4" || elementType === "text")&& < TextOrHeaderFormElement /> }
                    {(elementType === "imageSet")&& <ImageSetElement/>}
                </div>
            </div>}

            
        </div>
    )
}
// build area to render input 

////////////////////////////////////////////////
// helper to render text or headers
////////////////////////////////////////////////


// create the functional component for the form to add blogpostElements
// and then when you submit, it'll add to the blogpostElements final array 
function TextOrHeaderFormElement(props){
    const [textInput, setTextInput] = useState('');

    const {
        elementType, resetElementAfterSubmit, 
        setBlogPostBody
    } = useContext(CreateBlogPostContext)

    function handleElementSubmit(e) {
        e.preventDefault();

        let blogPostBodyElement = new BlogPostBodyElement(
            elementType, textInput
        );

        // add logic to submit blog post to the array
        setBlogPostBody(prevValue => [...prevValue, blogPostBodyElement]);

        // reset var settings
        resetElementAfterSubmit();
        setTextInput('');
    }

    function handleInputChange(e) {
        setTextInput(e.target.value)
    }

    return (
        <div>
            <Form className="formInput" onSubmit={handleElementSubmit}>
                <Stack direction="horizontal" gap={2}> 
                    <Form.Label className="formLabel"> Input Text
                    </Form.Label>
                    <Form.Control rows={3}value={textInput} onChange={handleInputChange} as="textarea" />
                </Stack>
                <Button type="submit" disabled={!textInput}>Submit Element</Button>
            </Form>

        </div>
    )
}

// helper to render imagesets; this is the child element of the BlogBody
// note ImageSets require caption; image; in the image itself you can get the name
function ImageSetElement(props){

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);

    const {elementType, resetElementAfterSubmit, setBlogPostBody
        } = useContext(CreateBlogPostContext)

    function handleImageSetElementSubmit(e) {
        e.preventDefault();
        
        let imageSetData = new ImageSetData(caption, image);
        let blogPostBodyElement = new BlogPostBodyElement(elementType, imageSetData)
        console.log(blogPostBodyElement);

        // add logic to submit blog post to the array
        setBlogPostBody(prevValue => [...prevValue, blogPostBodyElement]);
    
        // reset vars 
        resetElementAfterSubmit();
        setCaption('');
    }

    function handleCaptionChange(e) {
        setCaption(e.target.value)
    }

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
    
        if (selectedImage) {
        // set maxfile if req'd; if (selectedImage.size <= 5 * 1024 * 1024) { ... }
        
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64ImageData = e.target.result; // Contains the base64-encoded image data
            setImage(base64ImageData);
            console.log('Image encoded as base64');
        };

        // Read the image file as data URL (base64)
        reader.readAsDataURL(selectedImage);
        }
    };

    return (
        <div>
            <Form className="formInput" onSubmit={handleImageSetElementSubmit}>
                <Form.Group className="mb-1" controlId="formMainElements">

                    <Stack direction="horizontal" gap={2}>
                        <Form.Label className="formLabel" >Upload Image</Form.Label>
                        <Form.Control type="file" accept="image/*" required onChange={handleImageUpload} />
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <Form.Label className="formLabel" >Caption</Form.Label>
                        <Form.Control type="text" value = {caption} required onChange={handleCaptionChange} />
                    </Stack>
                    <Button type="submit" disabled={!caption || !image}>Add Element</Button>
                </Form.Group>

            </Form>
        </div>
    )
}


function prepareToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Token not found.")
    }
    return token
}


// write the post to the /Blogpost path
async function formSubmit(newPost) {
    const token = prepareToken()

    // later write the post requests here.
    try {
        fetch('http://localhost:8080/blogpost', {
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



// Button to initiate the Post
// Flow: Take vars from Context, build the BlogPost; submit it to the BE

function SubmitBlogPostButton(){
    const {
        title, blogPostBody, cover
    } = useContext(CreateBlogPostContext);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('preparing submission')

        let blogPost = new BlogPost(null, title, new Date().toISOString(), blogPostBody, cover, cover.name); 
        try {
            formSubmit(blogPost)
                .then(data => {
                    console.log("Submission completed.")
                })
                .catch(e => {
                    console.error("failed formSubmit for some reason")
                    console.error(e)
                })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <Button onClick={handleSubmit}> Submit post</Button>
        </div>
    )
}

export { 
    BaseElements,
    TextOrHeaderFormElement, BlogPostAddElementsMenu, 
    ImageSetElement, 
    SubmitBlogPostButton
}