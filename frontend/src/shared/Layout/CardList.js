
import React from 'react'
import {useSelector}  from "react-redux";


import Card from './Card'
import './CardList.css'



const CardList = () => {
    const photos = useSelector(state => state.photo.photos)
  return (
    <div className="cardlist-container">

    {photos.map(item =>  
    (item.property === 'home' && <Card key={item._id} image={item.image}  />)
        
    )}
        
    </div>
  )
}

export default CardList