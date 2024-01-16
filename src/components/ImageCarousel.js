import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Item from "./Item"
import slider from "../slider.json"
import "../index.css"

function ImageCarousel() {
  return (
    <Carousel className='carousel'>
      {
        slider.map( item => <Item key={item.id} item={item}/>)
      }
    </Carousel>
  )
}

export default ImageCarousel
