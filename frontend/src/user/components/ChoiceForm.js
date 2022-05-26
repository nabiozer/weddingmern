import React from "react";
import Banner from "../../shared/UIElements/Banner";
import AlbumForm from "./AlbumForm";
import PhotoForm from "./PhotoForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { choiceActions } from "../../store/choice-slice";
import {updateUserProfile} from '../../store/user-actions'
import "./ChoiceForm.css";

const ChoiceForm = () => {
  const dispatch = useDispatch();
  const updateInfo = useSelector(state => state.user.userLogin.userInfo)
  const choices = useSelector((state) => state.choices);
  const deletePhotoHandler = (id) => {
    dispatch(choiceActions.removePhotoFromPhotos(id));
  };

  const deleteAlbumHandler = () => {
    dispatch(choiceActions.deleteChoices());
    dispatch(choiceActions.removePhotos());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({id: updateInfo._id, chosen : choices.chosen}))
   
  }



  return (
    <>
      <Banner src="../assets/images/banner1.JPG" />
      <section className="choice-form">
     
        <div>
          <div >
            <AlbumForm />
          </div>
          <div>
            <PhotoForm />
          </div>
        </div>
        <div>
          <h3>Fotoğraf Seçimleri</h3>

          {choices.error && <p>{choices.error}</p>}
          <div>
            <ul>
              {choices.photosChosen !== null &&
                choices.chosen.photosChosen.map((item) => {
                  return (
                    <li key={item.id}>
                      {item.photo}
                      <button onClick={() => deletePhotoHandler(item.id)}>
                        Çıkar
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <h3>Albüm Seçimleri</h3>
            <p>
              Albüm : {choices.chosen.album.albumName}-
              {choices.chosen.album.colorCode}{" "}
            </p>
            <p>Kapak Yazıcı : {choices.chosen.coverText} </p>
            <p>Kapak Fotoğrafı : {choices.chosen.poster} </p>
            <p>Poster Fotoğrafı : {choices.chosen.cover} </p>
            
          </div>
          <button onClick={deleteAlbumHandler}>Seçimleri Temizle</button>
        </div>
        <div>
          <button  onClick={submitHandler}>Seçimleri İşleme Gönder</button>
        </div>
       
      </section>
    </>
  );
};

export default ChoiceForm;
