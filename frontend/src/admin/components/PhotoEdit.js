import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {getPhotoById,updatePhoto} from '../../store/photo-actions'
import {useHistory,useParams,Link} from 'react-router-dom'
import {photoActions} from '../../store/photo-slice'

import './PhotoEdit.css'
const PhotoEdit = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const history = useHistory()

  const [description,setDescription] = useState('')
  const [property,setProperty] = useState('')
  const [image,setImage] = useState('')
  const [ul,setUl] = useState('')
  const [packageName,setPackageName] = useState('')
  const [packagePrice,setPackagePrice] = useState('')
  const [uploading,setUploading] = useState(false)

  const photoDetails = useSelector(state=> state.photo.photoDetails)
  const {loading,error,detailsPhoto} = photoDetails

  const photoUpdate = useSelector(state=> state.photo.photoUpdate)
  const {loading:loadingUpdate,success:successUpdate, error:errorUpdate } = photoUpdate

  useEffect(() => {

    if(successUpdate) {
      dispatch(photoActions.photoUpdateReset())
      history.push('/admin/photolist')
    }
    if(!detailsPhoto.image || detailsPhoto._id) {
      dispatch(getPhotoById(id))
     
      setDescription(detailsPhoto.description)
      setProperty(detailsPhoto.property)
      setImage(detailsPhoto.image)
      setUl(detailsPhoto.ul)
      setPackageName(detailsPhoto.packageName)
    }
    
  }, [dispatch,id,detailsPhoto.image,detailsPhoto.description,loadingUpdate,successUpdate])
  

  const updatePhotoHandler = (e) => {
    dispatch(updatePhoto({_id:id , property, description,image,ul,packageName,packagePrice}))
    e.preventDefault()
  }
  const propertyChangeHandler = (e) => {
    setProperty(e.target.value)
    console.log(e.target.value)
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }


  return (
    <>
    <div className="color"></div>  
    <div>
          <button className="userdetails-back__btn" style={{margin:'1rem',height:'3rem'}}>
            <Link to="/admin/photolist">
              Fotoğraf Listesi <i class="fa-solid fa-arrow-left"></i>{" "}
            </Link>
          </button>
        </div>
    <section className="photoedit-section">
        

      
        <div className="img-container">
        {detailsPhoto && 
        <div>
          <img src={`/${detailsPhoto.image}`} style={{width:'60%'}}/>
          <p>{detailsPhoto.description}</p>
          <p>{detailsPhoto.property}</p>
        </div>
        }
        
         

          </div>
        <form  className="photoedit-form" style={{width: '300px'}} onSubmit={updatePhotoHandler}>
        <div className='photoedit-form__group'>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" 
            value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div className='photoedit-form__group'>
            <label htmlFor="property">Property</label>
            <input type="text" id="property" 
            value={property} onChange={propertyChangeHandler} />
          </div>
        
        <div className='photoedit-form__group'>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" 
            value={description} onChange={(e) => setDescription(e.target.value)}
          />
        </div>


         
          {property ==='package' && 
          
        <div style={{width: '100%'}}>
          <div className='photoedit-form__group' >
          <label htmlFor="ul">Paket Adı</label>
          <input type="text" id="ul" 
            value={packageName} onChange={(e) => setPackageName(e.target.value)}
          />
        </div>
          
          
          <div className='photoedit-form__group'>
          <label htmlFor="ul">Paket İçeriği</label>
          <input type="text" id="ul" 
            value={ul} onChange={(e) => setUl(e.target.value)}
          />
        </div>

        <div className='photoedit-form__group'>
          <label htmlFor="packageprice">Paket Fiyatı</label>
          <input type="text" id="packageprice" 
            value={packagePrice} onChange={(e) => setPackagePrice(e.target.value)}
          />
        </div>
        </div>}
          
          
          
          
          
       
        <div className="form-actions">
          <button type="submit" className='photoedit-form__btn'>Güncelle</button>
        </div>
        <div className='photoedit-form__group'>
          <label htmlFor="image-file">Fotoğraf</label>
        <input type="file"
       id="image-file" 
      
         onChange={uploadFileHandler}
       />
       </div>
        
      </form>
   
    </section>
    </>
  )
}

export default PhotoEdit