import React, {useState} from 'react';

// build use context: variable manager!
const CreateGalleryPhotoContext = React.createContext();

// small: `Print size: 10″ x 18″ ; Paper size: 14″ x 22″ ; Framed size 16″ x 24″`, 
// medium: `Print size: 16.5″ x 30″ ; Paper size: 20.5″ x 34″ ; Framed size 22.5″ x 36″`, 
// large: `Print size: 22.5″ x 40″ ; Paper size: 28.5″ x 46″ ; Framed size 30.5″ x 48″`,


// dont forget to handle authentication to view the page


function CreateGalleryPhotoProvider({children}) {

    // default values for prices and productDims; consider moving into its own module later
    const defaultPrices = {
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
    }

    const defaultProductDims = {            
        printSize: {
            small: `10″ x 18″`, 
            medium: `16.5″ x 30"`, 
            large: `22.5″ x 40″`,
        }, 
        paperSize: {
            small: `14″ x 22″`, 
            medium: `20.5″ x 34″`, 
            large: `28.5″ x 46″`,
        }, 
        framedSize: {
            small: `16″ x 24″`, 
            medium: `22.5″ x 36″`, 
            large: `30.5″ x 48″`,
        }
    }

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [blurb, setBlurb] = useState('');
    const [prices, setPrices] = useState({...defaultPrices});
    const [productDims, setProductDims] = useState({...defaultProductDims});
    const [isArialPhoto, setIsArialPhoto] = useState(false);        
    const [country, setCountry] = useState('');
    const [subImage1, setSubImage1] = useState(null);
    const [subImage2, setSubImage2] = useState(null);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleIsArialPhoto() {
        setIsArialPhoto(prevValue => !prevValue)
    }

    function handleImageUpload(event, setImageFn) {
        const selectedImage = event.target.files[0];
        if (selectedImage) {        
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64ImageData = e.target.result;    // Contains the base64-encoded image data
            setImageFn(base64ImageData);
            console.log('Image encoded as base64');
        };

        reader.readAsDataURL(selectedImage);            // Read the image file as data URL (base64)
        }
    };

    function handleBlurbChange(e) {
        setBlurb(e.target.value);
    }

    const handlePricesChange = (category, size, newValue) => {
        setPrices((prevValues) => ({
            ...prevValues,
            [category]: {
            ...prevValues[category],
            [size]: newValue,
          },
        }));
    };

    const handleProductDimsChange = (category, size, newValue) => {
        setProductDims((prevValues) => ({
            ...prevValues,
            [category]: {
            ...prevValues[category],
            [size]: newValue,
          },
        }));
    };

    function setInitialGalleryPhotoNull() {
        setName('');
        setImage(null)
        setBlurb('')
        setPrices({...defaultPrices})
        setProductDims({...defaultProductDims})
        setIsArialPhoto(false);
        setCountry('');
        setSubImage1(null);
        setSubImage2(null);
    }


    function handleCountryChange(e) {
        setCountry(e.target.value); 
    }

    // function handlePrices

    return (
        <CreateGalleryPhotoContext.Provider value={{
            name, setName, handleNameChange,
            image, setImage, handleImageUpload,
            blurb, setBlurb, handleBlurbChange,
            prices, setPrices, handlePricesChange,
            productDims, setProductDims, handleProductDimsChange,
            isArialPhoto, setIsArialPhoto, handleIsArialPhoto,
            country, setCountry, handleCountryChange,

            subImage1, setSubImage1, 
            subImage2, setSubImage2,
            setInitialGalleryPhotoNull,
        }}>
            {children}
        </CreateGalleryPhotoContext.Provider>
    )
}


export {CreateGalleryPhotoProvider, CreateGalleryPhotoContext};