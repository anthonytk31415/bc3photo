import React, { useState, useContext } from 'react';
import { BlogPost, BlogPostBody, BlogPostBodyElement, ImageSetData} from '../classes/BlogPost';



// build use context: variable manager!
const CreateBlogPostContext = React.createContext();

function BlogPostProvider({children}) {

    const [blogPostBody, setBlogPostBody] = useState([]);
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState(null);

    const [elementType, setElementType] = useState('');
    const [showAddElement, setShowAddElement] = useState(false);

    function toggleShowAddElement(e) {
        setShowAddElement(prevValue => !prevValue)
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleCoverUpload(e) {
        const selectedImage = e.target.files[0];
    
        if (selectedImage) {        
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64ImageData = e.target.result;    // Contains the base64-encoded image data
            setCover(base64ImageData);
            console.log('Image encoded as base64');
        };

        reader.readAsDataURL(selectedImage);            // Read the image file as data URL (base64)
        }
    };

    function submitElement() {
        console.log(`submitting element with type: ${elementType}`);
    }

    function resetElementAfterSubmit(){
        setElementType('');
        setShowAddElement(false);

    }

    return (
        <CreateBlogPostContext.Provider value={{
            blogPostBody, setBlogPostBody,
            title, setTitle, handleTitleChange,
            cover, setCover, handleCoverUpload,

            showAddElement, setShowAddElement, toggleShowAddElement,
            elementType, setElementType, submitElement, resetElementAfterSubmit,


        }}>
            {children}
        </CreateBlogPostContext.Provider>
    )
}

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
            <form action ={submitButton} method="POST"> 
                <label for="author">Author:
                    <input type="text" id="title" name="title" value="Billy" required></input>

                </label> 
                <label for="title">Title:
                    <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required></input>
                </label> 
                <br></br>

                <label>
                    <input
                        type="file"
                        accept="image/*" // Allow only image files to be selected
                        onChange={handleCoverUpload}
                    />
                </label>

            </form>
        </div>

    )
}

// build menu for adding content elements

function BlogPostAddElementsMenu(props) {

    const {
        showAddElement, toggleShowAddElement, 
        elementType, setElementType, 
        title, cover, 
    
    } = useContext(CreateBlogPostContext)

    const handleElementChange = (e) => {
        setElementType(e.target.value);
      };
    
    return (
        <div>
            <p> Add Content Menu </p>
            <button onClick={toggleShowAddElement} > {showAddElement ? "Remove Content" : "Add Content"} + </button>
            {showAddElement && <div> 
                <select value={elementType} onChange={handleElementChange}>
                    <option value="">Select a blog element</option>
                    <option value="h3">h3</option>
                    <option value="h4">h4</option>
                    <option value="text">text</option>
                    <option value="imageSet">imageSet</option>
                </select>

                <div> 
                    {(elementType === "h3" || elementType === "h4" || elementType === "text")&& < TextOrHeaderFormElement /> }
                    {(elementType === "imageSet")&& <ImageSetElement/>}
                </div>
            </div>}



            <p> preview your content: (PLACEHOLDER) </p> 
            <div> 
                {cover && <img src={cover} alt="cover-placeholder" />}
                <h1> {title}</h1>
                

                <BodyElements/>
            </div>
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

    function handleSubmit(e) {
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
        <form onSubmit={handleSubmit}> Input Text/Header
            <label for="textInput">    
                <textarea 
                    id = "textInput"
                    name = "textInput"
                    value = {textInput}
                    onChange = {handleInputChange}
                    rows={4}
                    cols={40}                
                />
            </label>
            <button type="submit" disabled={!textInput}>Add Element</button>
        </form> 
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
        
        <form onSubmit={handleImageSetElementSubmit}> 
            <label for="filenameInput">File name
                <input 
                    id = "filename"
                    name = "filename"
                    value = {filename}
                    onChange = {handleFilenameInput}               
                />
            </label>
            <br></br>
            <label>
                <input
                    type="file"
                    accept="image/*" // Allow only image files to be selected
                    onChange={handleImageUpload}
                />
            </label>


            <label for="caption">Caption
                <textarea 
                    id = "caption"
                    name = "caption"
                    value = {caption}
                    onChange = {handleCaptionChange}
                    rows={4}
                    cols={40}                
                />
            </label>
            <button type="submit" disabled={!caption || !filename}>Add Element</button>
        </form> 
    )
}


// given an array, return the elementsl

function BodyElements(props) {
    
    const {blogPostBody} = useContext(CreateBlogPostContext);

    let arr = []
    for (let i = 0; i < blogPostBody.length; i ++) {
        let element; 
        let entry = blogPostBody[i]
        let msg = entry.data
        switch (entry.type) {
            case 'h3': 
                element = <h3>{msg}</h3>
                break
            case 'h4': 
                element = <h4>{msg}</h4>
                break
            case 'text': 
                element = <p>{msg}</p>
                break
            case 'imageSet':
                element =   <div> 
                                <img src={msg.file} alt="uploaded" />
                                <p>{msg.caption}</p>
                            </div>
                break

            default: 
                element = null
        }

        if (element) {
            arr.push(element);
        }
            
    }
    return (
        <div> 
            {arr}
        </div>
    )
}

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

// currently, defauliting author to billy
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
            <button onClick={handleSubmit}> Submit your post</button>
        </div>
    )
}

export { 
    BlogPostProvider, BaseElements,
    TextOrHeaderFormElement, BlogPostAddElementsMenu, 
    ImageSetElement, BodyElements, 
    SubmitBlogPostButton
}