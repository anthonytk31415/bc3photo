import React, { useState, useContext } from 'react';
import { BlogPost, BlogPostBody, BlogPostBodyElement, ImageSetData} from '../classes/BlogPost';

// import { BlogPostContainer } from './BlogPostContainer';

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { CreateBlogPostContext } from '../providers/BlogPostProvider';

////////////////////////////////////////////////
// build macros elements holder
////////////////////////////////////////////////

function BaseElements(props){

    const {
        title, handleTitleChange,
        cover, handleCoverUpload,
    } = useContext(CreateBlogPostContext);

    function submitButton() {
    }

    return (
        <div> 
            <p> Create your elements </p>
            <Form className="formInput">
                
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel" >Author</label>
                        <Form.Control type="text" value="Billy" required />

                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Title</label>
                        <Form.Control type="text" value={title} required onChange={handleTitleChange}/>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <label className="formLabel">Upload Cover</label>
                        <Form.Control type="file" accept="image/*" onChange={handleCoverUpload}/>
                    </Stack>

            </Form>
        </div>
    )
}

// build menu for adding content elements
function BlogPostAddElementsMenu(props) {

    const {
        showAddElement, toggleShowAddElement, 
        elementType, setElementType, 
        title, cover, blogPostBody,
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

function TextOrHeaderFormElement(props){
    const [textInput, setTextInput] = useState('');

    const {
        elementType, resetElementAfterSubmit, 
        blogPostBody, setBlogPostBody
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

// helper to render imagesets
function ImageSetElement(props){
    const [filename, setFilename] = useState('');
    const [caption, setCaption] = useState('');

    const [image, setImage] = useState(null);

    const {elementType, resetElementAfterSubmit, setBlogPostBody
        } = useContext(CreateBlogPostContext)

    function handleImageSetElementSubmit(e) {
        e.preventDefault();
        let imageSetData = new ImageSetData(filename, caption, image);

        console.log('image processed')
        let blogPostBodyElement = new BlogPostBodyElement(elementType, imageSetData)
        console.log(blogPostBodyElement);

        // add logic to submit blog post to the array
        setBlogPostBody(prevValue => [...prevValue, blogPostBodyElement]);
    
        // reset vars 
        resetElementAfterSubmit();
        setFilename('');
        setCaption('');
    }

    function handleCaptionChange(e) {
        setCaption(e.target.value)
    }
    function handleFilenameInput(e) {
        setFilename(e.target.value)
    }

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
    
        // Check if an image was selected
        if (selectedImage) {
        // You can set a maximum file size here if needed
        // For example, to limit to 5MB: if (selectedImage.size <= 5 * 1024 * 1024) { ... }
        
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

                    <Stack direction="horizontal" gap={2}>
                        <Form.Label className="formLabel" >Filename</Form.Label>
                        <Form.Control type="text" value={filename} required onChange={handleFilenameInput} />
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <Form.Label className="formLabel" >Upload Image</Form.Label>
                        <Form.Control type="file" accept="image/*" required onChange={handleImageUpload} />
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <Form.Label className="formLabel" >Caption</Form.Label>
                        <Form.Control type="text" value = {caption} required onChange={handleCaptionChange} />
                    </Stack>
                    <Button type="submit" disabled={!caption || !filename}>Add Element</Button>

            </Form>
        </div>
    )
}


// write the post to the backend
function formSubmit(newPost) {
    // later write the post requests here.
    fetch('/blogpost', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost)
    })
        .then((response) => {
            response.json()
            console.log('transfer complete')
        })
        .catch((error) => console.error(error));
};

// Button to initiate the Post
function SubmitBlogPostButton(){
    const author = "Billy"
    const {
        title, blogPostBody, cover
    } = useContext(CreateBlogPostContext);

    function handleSubmit(e) {
        e.preventDefault();
        console.log('preparing submission')
        
        const now = new Date();
        const timestamp = now.toISOString();

        let blogPost = new BlogPost(author, title, timestamp, blogPostBody, cover); 
        formSubmit(blogPost);
        console.log(blogPost);
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