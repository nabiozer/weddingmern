import React from 'react'
import {useSelector} from 'react-redux'
import "./PackageCard.css"
const PackageCard = () => {
  const photos = useSelector(state => state.photo.photos)
  return (
      <>
    <section className="hero-section">

 <div className="card-grid">
    {photos && photos.filter(photo => photo.property === 'package').map((photo,i) => (

      <a key = {photo._id} className="card" href={`https://wa.me/905421132503?text=Merhaba%20${photo.packageName.split(" ").join("%20")}%20paketinizi%20satın%20almak%20istiyorum.`} target="_blank" rel="noreferrer">
        <div className="card__background" style={{background: `url(${photo.image})`, backgroundSize: "contain"}}></div>
        <div className="card__content">
          <p className="card__category">Paket {i + 1}</p>
          <h3 className="card__heading">{photo.packageName}</h3>
          <ul>
            {photo.ul.split(",").map((li,i) => <p key={i} className="card__category__ul">{li}</p>)}
          </ul>

          <p className="card__price" >Bilgi İçin Tıklayın</p>
    
        </div>
      </a>

    )   
    )}

   
    
    </div>
  </section>
  </>
  )
}

export default PackageCard