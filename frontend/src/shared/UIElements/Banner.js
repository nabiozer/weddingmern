import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './Banner.css'
import {getPhotos} from '../../store/photo-actions'
import Loader from '../components/Loader'

const Banner = () => {
  const dispatch = useDispatch();
  const [showedBanner,setShowedBanner] = useState(0)
  const photos = useSelector(state => state.photo.photos)
  const loading = useSelector(state => state.photo.isLoading)
  useEffect(() => {
     if(!photos[0]) {
      dispatch(getPhotos())
     }
   
  }, [dispatch])

  const incrementHandler = () => {
    if (showedBanner + 1 === photos.filter(photo => photo.property === 'banner').length) {
      setShowedBanner(0)
    } else {
      setShowedBanner(showedBanner + 1)
    }
     
  }
  const decrementHandler = () => {
    if (showedBanner === 0) {
      setShowedBanner(photos.filter(photo => photo.property === 'banner').length - 1)
    } else {
      setShowedBanner(showedBanner - 1)
    }
     
  }

  
  return (
<>  
    {loading ? <><div className="color"></div> <Loader /></> : photos.filter(photo => photo.property === 'banner').map((photo, index) =>  (

index === showedBanner && <div className="banner" key={index}>
    <img src={photo.image} alt={photo.id} key={index}></img>
    <hr></hr>
    <i className="fa-solid fa-left-long banner-button__left" onClick={decrementHandler}></i>
    <i className="fa-solid fa-right-long banner-button__right" onClick={incrementHandler}></i>
</div>
))}
    
       
</>    
  )
}






export default Banner