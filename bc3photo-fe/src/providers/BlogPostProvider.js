import React, {useState} from 'react';


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


export {BlogPostProvider, CreateBlogPostContext};