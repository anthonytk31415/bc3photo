import React from 'react'; 
import {Carousel} from 'react-bootstrap'

// does the year have to be the current year it is copywrited in? 

function FrontPage() {

    let carousel = [
        'harbor-mist.jpeg', 
        'ascension.jpeg', 
        'the-walkway.jpeg', 
        'mangrove-sunset.jpeg',
        'waimea-pier.jpeg',
        'big-corona-reflections.jpeg'  
    ]

    let carouselFolder = '/images/cover/';
 
    let carouselArr = []
    for (let i = 0; i < carousel.length; i ++) {
        carouselArr.push(
        <Carousel.Item>
            <Carousel.Caption>
                <p style={{color: 'white'}}>item ${i}</p>
            </Carousel.Caption>

        </Carousel.Item>)
    }


    return (

        <div > 
            <Carousel className = "coverImgContainer" indicatorsClassName="carousel-indicators">
                {carousel.map((item, index) => (
                <Carousel.Item key={index}> 
                    <div className="carousel-image-wrapper"> 
                        <img className="carousel-image d-block w-100" src={carouselFolder+item} alt="na"/>
                    </div>
                </Carousel.Item>
            
                ))}
                </Carousel>


        </div>
    )
}



export { FrontPage };