import React, {useState} from 'react';

// build use context: variable manager!
const CreateGalleryPhotoContext = React.createContext();

function CreateGalleryPhotoProvider({children}) {

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [blurb, setBlurb] = useState('');
    const [subImages, setSubImages] = useState([]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleImageUpload(e) {
        const selectedImage = e.target.files[0];
        if (selectedImage) {        
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64ImageData = e.target.result;    // Contains the base64-encoded image data
            setImage(base64ImageData);
            console.log('Image encoded as base64');
        };

        reader.readAsDataURL(selectedImage);            // Read the image file as data URL (base64)
        }
    };
    function handleBlurbChange(e) {
        setBlurb(e.target.value);
    }

    return (
        <CreateGalleryPhotoContext.Provider value={{
            name, setName, handleNameChange,
            image, setImage, handleImageUpload,
            blurb, setBlurb, handleBlurbChange,
        }}>
            {children}
        </CreateGalleryPhotoContext.Provider>
    )
}


export {CreateGalleryPhotoProvider, CreateGalleryPhotoContext};