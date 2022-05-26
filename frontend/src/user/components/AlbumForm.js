import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { choiceActions } from '../../store/choice-slice';
import { getUserDetails } from "../../store/user-actions";
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

import './AlbumForm.css'
import CheckOutSteps from './CheckOutSteps';
const AlbumForm = (props) => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const choices = useSelector((state) => state.choices.chosen)
    const user = useSelector((state) => state.user.userDetails.user)
    const [albumName, SetAlbumName] = useState('');
    const [colorCode, SetColorCode] = useState('');
    const [coverText, SetCoverText] = useState('');
    const [cover, SetCover] = useState('');
    const [poster, SetPoster] = useState('');

   useEffect(() => {
    
    if(!user.name ) {
      dispatch(getUserDetails('profile'))
    } else {
      
       
      SetAlbumName(user.chosen.album.albumName)
      SetColorCode(user.chosen.album.colorCode)
      SetCoverText(user.chosen.coverText)
      SetCover(user.chosen.cover)
      SetPoster(user.chosen.poster)
     }
   }, [dispatch,user]);
    

    const albumSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(choiceActions.addAlbumCoices({albumName,colorCode,coverText,poster,cover}))
    }


    const deleteAlbumHandler = () => {
      dispatch(choiceActions.deleteChoices());
      
      
    };
   
  return (
    <>
    
    {!props.show && <div className="color"></div>}
    {!props.show && <CheckOutSteps step1 />}
    <section className="album-form__section">
    <div className="album-form__section_album">
    <form onSubmit={albumSubmitHandler}>
  
              <div className="album-form__form">
                
                <div className="album-form__form__group">
                  <label htmlFor="albumname">Albüm Adı</label>
                  <input type="text" id="albumname" value={albumName} onChange={(e) => SetAlbumName(e.target.value)}/>
                </div>

                <div className="album-form__form__group">
                  <label htmlFor="color" >Albüm Renk Kodu</label>
                  <input type="text" id="color"  value={colorCode} onChange={(e) => SetColorCode(e.target.value)}/>
                </div>

                <div className="album-form__form__group">
                  <label htmlFor="covertext" >Kapak Yazısı</label>
                  <input type="text" id="covertext" value={coverText} onChange={(e) => SetCoverText(e.target.value)}/>
                </div>

                <div className="album-form__form__group">
                  <label htmlFor="cover" >Kapak Fotoğrafı</label>
                  <input type="text" id="cover" value={cover} onChange={(e) => SetCover(e.target.value)}/>
                </div>
                <div className="album-form__form__group">
                  <label htmlFor="poster" >Poster Fotoğrafı</label>
                  <input type="text" id="poster" value={poster} onChange={(e) => SetPoster(e.target.value)}/>
                </div>

                <button type="submit"> {choices.albumName ?  'Seçimleri Güncelle' : 'Seçimleri Ekle'} </button>
              </div>
            
        </form>
        <div className='album-form__choices'>
        <div className='album-form__choices__first'>
            <h3>Albüm Seçimleri</h3>
            <p>
              Albüm : {choices.album.albumName ? choices.album.albumName : albumName}-
              {choices.album.colorCode ? choices.album.colorCode : colorCode}{" "}
            </p>
            <p>Kapak Yazıcı : {choices.coverText ? choices.coverText : coverText} </p>
            <p>Kapak Fotoğrafı : {choices.poster ? choices.poster : poster} </p>
            <p>Poster Fotoğrafı : {choices.cover ? choices.cover : cover} </p>
       
          </div>
          <button onClick={deleteAlbumHandler}>Seçimleri Temizle</button>

        </div>
        </div>
          {!props.show && <Link to='photoform' className='album-form-list__link'>Seçimleri Onayla ve Fotoğraf Seçimine İlerle</Link>}
        </section>
        </>
  )
}

export default AlbumForm