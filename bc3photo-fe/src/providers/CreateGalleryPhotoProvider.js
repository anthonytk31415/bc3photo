import React, {useState} from 'react';

// build use context: variable manager!
const CreateGalleryPhotoContext = React.createContext();

function CreateGalleryPhotoProvider({children}) {

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [blurb, setBlurb] = useState('');
    const [subImages, setSubImages] = useState([]);
    const [prices, setPrices] = useState({
        basePrices: {
          small: 125,
          medium: 250,
          large: 400,
        },
        framedPrices: {
          small: 275,
          medium: 550,
          large: 875,
        },
        productDims: {
            small: `Print size: 10″ x 18″ ; Paper size: 14″ x 22″ ; Framed size 16″ x 24″`, 
            medium: `Print size: 16.5″ x 30″ ; Paper size: 20.5″ x 34″ ; Framed size 22.5″ x 36″`, 
            large: `Print size: 22.5″ x 40″ ; Paper size: 28.5″ x 46″ ; Framed size 30.5″ x 48″`,
        }
      });
    



    
    


    const [isArialPhoto, setIsArialPhoto] = useState(false); 
    const [country, setCountry] = useState('');

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

    // function handlePrices

    return (
        <CreateGalleryPhotoContext.Provider value={{
            name, setName, handleNameChange,
            image, setImage, handleImageUpload,
            blurb, setBlurb, handleBlurbChange,

            subImages, setSubImages, 
            prices, setPrices, 

            isArialPhoto, setIsArialPhoto,
            country, setCountry,

        }}>
            {children}
        </CreateGalleryPhotoContext.Provider>
    )
}


export {CreateGalleryPhotoProvider, CreateGalleryPhotoContext};