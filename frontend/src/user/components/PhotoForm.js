import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { choiceActions } from '../../store/choice-slice';
import { getUserDetails } from "../../store/user-actions";
import CheckOutSteps from './CheckOutSteps'
import './PhotoForm.css'

const PhotoForm = (props) => {

    const dispatch = useDispatch();
    const [photo, setPhoto] = useState('')

    const choices = useSelector((state) => state.choices);
    const user = useSelector((state) => state.user.userDetails.user)
  useEffect(() => {



    if(user.name) {
      dispatch(choiceActions.getPhotos(user.chosen.photosChosen))
    } 

  },[dispatch,user])
    const addHandler = () => {
        dispatch(choiceActions.addPhotoToPhotos({photo:photo , id:photo}))
        setPhoto('')
    }

    const deletePhotoHandler = (id) => {
      dispatch(choiceActions.removePhotoFromPhotos(id));
    };
  return (
    <>
     {!props.show &&<div className="color"></div>}
    <div className="photo-form__section">
    
    {!props.show && <CheckOutSteps step1 step2 />}
        
        <div className="photo-form__form__group"> 
                <label htmlFor="name">Fotoğraf Ekle</label>
                <input type="text" id="name" value={photo} maxLength='4' minLength='4'
                onChange={(e) => setPhoto(e.target.value)}

                />
       
        <button onClick={addHandler} disabled={photo.length < 4}>Ekle</button>
        </div>

        <ul className="photoform-list">
              {choices.photosChosen !== null &&
                choices.chosen.photosChosen.map((item,index) => {
                  return (
                    <li key={item.id} className="photoform-list__item">
                      {index + 1}  -  {item.photo}
                      <button onClick={() => deletePhotoHandler(item.id)}>
                        Çıkar
                      </button>
                    </li>
                  );
                })}
            </ul>
       
        {!props.show && <div>
        <Link to='confirmation' className="photoform-list__link">Fotoğraf Seçimleri Onayla ve Kontrol Et</Link>
        </div>}
    </div>
    </>
  )
}

export default PhotoForm