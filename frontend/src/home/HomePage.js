import React,{useEffect} from 'react'
import CardList from '../shared/Layout/CardList'
import Banner from '../shared/UIElements/Banner'
import { useDispatch,useSelector } from 'react-redux';
import {getPhotos} from '../store/photo-actions'
import Loader from '../shared/components/Loader';

const HomePage = () => {

 
    const dispatch = useDispatch()
    const loading = useSelector(state => state.photo.loadingPhotos)

    useEffect(() => {
     
      dispatch(getPhotos())

    }, [dispatch])
    
  return (
    <div>
      <Banner />
      {loading ? <Loader /> : <CardList />}
      
    </div>
  )
}

export default HomePage