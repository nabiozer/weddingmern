import React from 'react'
import './Card.css'

const Card = (props) => {
  return (
    <div className="card-container-img ">
        <img src={props.image} />
        
    </div>
  )
}

export default Card