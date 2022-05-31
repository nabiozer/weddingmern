import React from 'react'
import { useSelector } from 'react-redux'
import Banner from '../../shared/UIElements/Banner'
import Card from '../../shared/Layout/Card'

import './AlbumPage.css'
import Loader from '../../shared/components/Loader'

const AlbumPage = () => {
  const photos = useSelector(state=> state.photo.photos)
  const loading = useSelector(state=> state.photo.isLoading)
  return (
    <>
    <Banner />
    <section className="album-section"> 
    
  
    <div className="albumlist-container">

   {loading ? <Loader> </Loader> : photos.map(item =>  
    (item.property === 'album' && <Card key={item._id} image={item.image}  />)
        
    )}
        
    </div>
  
    
    </section>
    </>
  )
}

export default AlbumPage