import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { choiceActions } from '../../store/choice-slice';
import { getUserDetails } from "../../store/user-actions";

import {Link} from 'react-router-dom'

import './AlbumForm.css'
import CheckOutSteps from './CheckOutSteps';
const AlbumForm = (props) => {
  const history =  useHistory();
    
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


    const albumAddPushHandler = (e) => {
      e.preventDefault();
      dispatch(choiceActions.addAlbumCoices({albumName,colorCode,coverText,poster,cover}))
      history.push('/profile/photoform')
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
                  <label htmlFor="albumname">Alb??m Ad??</label>
                  <input type="text" id="albumname" value={albumName} onChange={(e) => SetAlbumName(e.target.value)}/>
                </div>

                <div className="album-form__form__group">
                  <label htmlFor="color" >Alb??m Renk Kodu</label>
                  <input type="text" id="color"  value={colorCode} onChange={(e) => SetColorCode(e.target.value)}/>
                </div>

                <div className="album-form__form__group">
                  <label htmlFor="covertext" >Kapak Yaz??s??</label>
                  <input type="text" id="covertext" value={coverText} onChange={(e) => SetCoverText(e.target.value)}/>
                </div>

                <div className="album-form__form__group">
                  <label htmlFor="cover" >Kapak Foto??raf??</label>
                  <input type="text" id="cover" value={cover} onChange={(e) => SetCover(e.target.value)}/>
                </div>
                <div className="album-form__form__group">
                  <label htmlFor="poster" >Poster Foto??raf??</label>
                  <input type="text" id="poster" value={poster} onChange={(e) => SetPoster(e.target.value)}/>
                </div>

                <button type="submit"> {choices.albumName ?  'Se??imleri G??ncelle' : 'Se??imleri Ekle'} </button>
              </div>
            
        </form>
        <div className='album-form__choices'>
        <div className='album-form__choices__first'>
            <h3>Alb??m Se??imleri</h3>
            <p>
              Alb??m : {choices.album.albumName ? choices.album.albumName : albumName}-
              {choices.album.colorCode ? choices.album.colorCode : colorCode}{" "}
            </p>
            <p>Kapak Yaz??c?? : {choices.coverText ? choices.coverText : coverText} </p>
            <p>Kapak Foto??raf?? : {choices.poster ? choices.poster : poster} </p>
            <p>Poster Foto??raf?? : {choices.cover ? choices.cover : cover} </p>
       
          </div>
          <button onClick={deleteAlbumHandler}>Se??imleri Temizle</button>

        </div>
        </div>
          {!props.show && <Link to='photoform' className='album-form-list__link' onClick={albumAddPushHandler}>Se??imleri Onayla ve Foto??raf Se??imine ??lerle</Link>}
        </section>
        </>
  )
}

export default AlbumForm