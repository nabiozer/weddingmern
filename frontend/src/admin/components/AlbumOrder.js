import React from 'react'
import './AlbumOrder.css'
const AlbumOrder = ({deliveryInfo,chosen,name}) => {
  return (
    <div className='album-form'>

    {deliveryInfo && chosen &&
    
        <div className='album-form__container'>
          <p className='album-form__model'>{chosen.album.albumName && chosen.album.albumName} - {chosen.album.albumName && chosen.album.colorCode} </p>
          <p className='album-form__ebat'> 25x65 </p>
          <p className='album-form__set' >2 Jumbo Cep -50x70 poster</p>
          <p className='album-form__cover'>{chosen.coverText}</p>
          <div className='album-form__adres' >  
          <p> {deliveryInfo.adress}</p>
          <p> {name}-{deliveryInfo.phoneNumber}</p>
          </div>
        </div>}
    </div>
  )
}

export default AlbumOrder



