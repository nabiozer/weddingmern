import React from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useSelector,useDispatch } from 'react-redux'

import {updateUserProfile,getUserDetails} from '../../store/user-actions'
import {useHistory} from 'react-router-dom'
import './Confirmation.css'

const Confirmation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const updateInfo = useSelector(state => state.user.userLogin.userInfo)
  const chosen = useSelector((state) => state.choices.chosen);




  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({id: updateInfo._id, chosen }))
    dispatch(getUserDetails('profile'))
    setTimeout(function() {
      history.push('/')
    }, 1000);
   
    
  }

  return (
    <>
    <div className="color"></div>
    <CheckOutSteps step1 step2 step3/>
    <section className="choice-form__confirmation">
    <p>Seçimlerinizi Onaylayın</p>
    <form onSubmit={submitHandler} className="choice-form">
     
      
        <div className="choice-form__confirmation__album">
        <h4>Albüm Seçimleri</h4>
          <div className="choice-form__confirmation__album"> 
              <p>Album: {chosen.album.albumName} - {chosen.album.colorCode}</p>
              <p>Kapak Yazısı : { chosen.coverText}</p>
              <p>Kapak Fotoğrafı : { chosen.cover}</p>
              <p>Poster Fotoğrafı : { chosen.poster}</p>
           </div>
           <h4>Fotoğraf Seçimleri</h4>
           <div className="choice-form__confirmation__photo">
           
           <ul className="choice-form_confirmation__photolist">
              {chosen.photosChosen !== null &&

               
                 
                chosen.photosChosen.map(item => item.photo).sort((a,b) => a-b).map((item,index) => {
                  return (<li key={index}>{index + 1}: {item} </li>)
                })}
            </ul>

           </div>
        </div>
      
    
    
    
    
      <button className="choice-form__confirmation__btn" type="submit">Onayla Ve İşlem İçin Gönder</button>
     </form>
    </section>

    </>
  )
}

export default Confirmation