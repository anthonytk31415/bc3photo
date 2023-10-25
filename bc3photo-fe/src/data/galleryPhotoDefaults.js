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

export {defaultPrices, defaultProductDims}