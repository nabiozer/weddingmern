import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {ProgressBar} from 'react-bootstrap'
import {

  getUserDetails,
  updateUserByAdmin,
} from "../../store/user-actions";


import { userActions } from "../../store/user-slice";

import Loader from "../../shared/components/Loader";
import PhotoForm from "../../user/components/PhotoForm";
import AlbumForm from "../../user/components/AlbumForm";
import AlbumOrder from "./AlbumOrder";

import "./UserDetails.css";

const UserDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const userDetails = useSelector((state) => state.user.userDetails);
  const { loading, error, user } = userDetails;

  const chosen = useSelector((state) => state.choices.chosen);

  const userUpdateByAdmin = useSelector(
    (state) => state.user.userUpdateByAdmin
  );
  const {
   
    success: successUpdate,
  } = userUpdateByAdmin;


  const [albumDelivered,setAlbumDelivered] = useState("");
  const [photoProcessed,setPhotoProcessed] = useState("");
  const [uploadVideoPercent, setUploadVideoPercent] = useState(0)
  const [uploadPhotoPercent, setUploadPhotoPercent] = useState(0)
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState("");
  const [video,setVideo] = useState("");
  const [showAlbum, setShowAlbum] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [album, setAlbum] = useState("25x65 - 2 Jumbo Cep - 50x70 poster");
  const [reservationInfo, setReservationInfo] = useState({
    date: "",
    hour: "",
    place: "Çavuşbaşı",
    packagePrice: 1750,
    advancePayment: 300,
    packageDetails: "Fotoğraf ve Video Çekimi",
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    adress: "",
    phoneNumber: "",
  });
 

  useEffect(() => {
    if (successUpdate) {
      dispatch(userActions.userUpdateByAdminReset());
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      }

      if (
        !user.isAdmin &&
        user.reservationInfo &&
        user.deliveryInfo &&
        user.chosen
      ) {
        setReservationInfo((prevState) => {
          return {
            ...prevState,
            date: user.reservationInfo.date,
            hour: user.reservationInfo.hour,
            place: user.reservationInfo.place,
            packagePrice: user.reservationInfo.packagePrice,
            advancePayment: user.reservationInfo.advancePayment,
            packageDetails: user.reservationInfo.packageDetails,
          };
        });

        setDeliveryInfo((prevState) => {
          return {
            ...prevState,
            adress: user.deliveryInfo.adress,
            phoneNumber: user.deliveryInfo.phoneNumber,
          };
        });

        setName(user.name);
        setEmail(user.email);
        setPhotos(user.photos);
        setVideo(user.video)
        setAlbumDelivered(user.albumDelivered)
        setPhotoProcessed(user.photoProcessed)
      }
    }
  }, [dispatch, user, loading, error, successUpdate,history,id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update user ?")) {
      dispatch(
        updateUserByAdmin({
          _id: id,
          name,
          email,
          reservationInfo,
          deliveryInfo,
          chosen,
          photos,
          video,
          photoProcessed,
          albumDelivered
        })
      );
    }
  };

  const uploadPhotoHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded,total} = progressEvent;
        console.log(loaded); 
        console.log(total)
        let percent = Math.round((loaded * 100) / total);
      
      
        if(percent < 100) {
          setUploadPhotoPercent(percent)
          console.log(percent)
        }
      }
    }
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploadfile", formData,options, config);

    
      setUploadPhotoPercent(100)
      setUploading(false);

      setTimeout(() => {
        setUploadPhotoPercent(0)
      },5000)

      setPhotos(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadVideoHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded,total} = progressEvent;
        console.log(loaded); 
        console.log(total)
        let percent = Math.round((loaded * 100) / total);
      
      
        if(percent < 100) {
          setUploadVideoPercent(percent)
          console.log(percent)
        }
      }
    }
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploadfile", formData,options,config);

      setVideo(data);
      setUploadVideoPercent(100)
      setUploading(false);

      setTimeout(() => {
        setUploadVideoPercent(0)
      },5000)
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <div className="color"></div>
      <section className="userdetails-section">
        <div>
          <button className="userdetails-back__btn">
            <Link to="/admin/userlist">
              Üye Listesi <i className="fa-solid fa-arrow-left"></i>{" "}
            </Link>
          </button>
        </div>

        <div className="userdetails-container">
          <button
            className="userdetails-form__button"
            onClick={() => setShowAlbum(!showAlbum)}
          >
            Album Sipariş Formu
            {!showAlbum ? (
              <i className="fa-solid fa-angle-down icon"></i>
            ) : (
              <i className="fa-solid fa-angle-up icon"></i>
            )}
          </button>

          {showAlbum &&
            (user.chosen.album.albumName &&
            user.deliveryInfo.adress &&
            user.deliveryInfo.phoneNumber &&
            user.chosen.album.colorCode ? (
              <AlbumOrder
                chosen={user.chosen}
                deliveryInfo={user.deliveryInfo}
                name={user.name}
              />
            ) : (
              <p>Seçim bekleniyor</p>
            ))}

          <button
            className="userdetails-form__button"
            onClick={() => setShowPhotos(!showPhotos)}
          >
            Fotoğraf Seçimleri
            {!showPhotos ? (
              <i className="fa-solid fa-angle-down icon"></i>
            ) : (
              <i className="fa-solid fa-angle-up icon"></i>
            )}
          </button>
          {showPhotos && user.chosen && (
            <div className="userdetails-form__chosen__container">
              <h3>Fotoğraf Seçimleri</h3>
              <ul className="userdetails-form__chosen">
                {user.chosen.photosChosen
                  .map((item) => item.photo)
                  .sort((a, b) => a - b)
                  .map((item, index) => {
                    return (
                      <li key={index}>
                        {index + 1}: {item}{" "}
                      </li>
                    );
                  })}
                <li>Kapak: {user.chosen.cover}</li>
                <li>Poster: {user.chosen.poster}</li>
              </ul>
            </div>
          )}
        </div>
       
        <div className="userdetails-form__update">
          {error && <h1>{error}</h1>}
         
          {loading && <Loader />}
          <h4>Güncelleme Formu</h4>
          
          


          <form
            onSubmit={submitHandler}
            className="userdetails-form__update__form"
          >
            <div className="login-form__group">
              <label htmlFor="image-file">Fotoğraf</label>
              {uploading &&  <ProgressBar variant="danger" animated now={uploadPhotoPercent} 
            striped={true}
            label={`${uploadPhotoPercent}%`}
          />}
              <input type="file" id="image-file" onChange={uploadPhotoHandler} />
            </div>

            

            <div className="userdetails__form__group">
              <label htmlFor="photos">Fotoğraflar</label>
              <input
                type="text"
                id="photos"
                value={photos || ''}
                onChange={(e) => setPhotos(e.target.value)}
              />
            </div>


            <div className="login-form__group">
              <label htmlFor="video-file">Video</label>
              {uploading &&  <ProgressBar now={uploadVideoPercent} 
            striped={true}
            label={`${uploadVideoPercent}%`}
          />}
              <input type="file" id="video-file" onChange={uploadVideoHandler} />
            </div>


            <div className="userdetails__form__group">
              <label htmlFor="video"></label>
              <input
                type="text"
                id="video"
                value={video || ''}
                onChange={(e) => setVideo(e.target.value)}
              />
            
            </div>

            <div className="form-group__container">
              <div className="userdetails__form__group">
                <label htmlFor="name">İsim Soyisim</label>
                <input
                  type="text"
                  id="name"
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="userdetails__form__group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="userdetails__form__group">
                <label htmlFor="date">Çekim Tarihi</label>
                <input
                  type="text"
                  id="date"
                  value={reservationInfo.date || ''}
                  onChange={(e) =>
                    setReservationInfo((prevState) => {
                      return { ...prevState, date: e.target.value };
                    })
                  }
                />
              </div>
              <div className="userdetails__form__group">
                <label htmlFor="hour">Çekim Saati</label>
                <input
                  type="text"
                  id="hour"
                  value={reservationInfo.hour || ''}
                  onChange={(e) =>
                    setReservationInfo((prevState) => {
                      return { ...prevState, hour: e.target.value };
                    })
                  }
                />
              </div>
              <div className="userdetails__form__group">
                <label htmlFor="place">Çekim Mekanı</label>
                <input
                  type="text"
                  id="place"
                  value={reservationInfo.place || ''}
                  onChange={(e) =>
                    setReservationInfo((prevState) => {
                      return { ...prevState, place: e.target.value };
                    })
                  }
                />
              </div>
              <div className="userdetails__form__group">
                <label htmlFor="packagePrice">Paket Fiyatı</label>
                <input
                  type="number"
                  id="packagePrice"
                  value={reservationInfo.packagePrice || ''}
                  onChange={(e) =>
                    setReservationInfo((prevState) => {
                      return { ...prevState, packagePrice: e.target.value };
                    })
                  }
                />
              </div>
              <div className="userdetails__form__group">
                <label htmlFor="advancePayment">Kapora</label>
                <input
                  type="number"
                  id="advancePayment"
                  value={reservationInfo.advancePayment || ''}
                  onChange={(e) =>
                    setReservationInfo((prevState) => {
                      return { ...prevState, advancePayment: e.target.value };
                    })
                  }
                />
              </div>
              <div className="userdetails__form__group">
                <label htmlFor="packageDetails">Paket Detayları</label>
                <input
                  type="text"
                  id="packageDetails"
                  value={reservationInfo.packageDetails || ''}
                  onChange={(e) =>
                    setReservationInfo((prevState) => {
                      return { ...prevState, packageDetails: e.target.value };
                    })
                  }
                />
              </div>
             

              <div className="userdetails__form__group">
                <label htmlFor="album">Album Detayları</label>
                <input
                  type="text"
                  id="packageDetails"
                  value={album || ''}
                  onChange={(e) => setAlbum(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="userdetails__form__group">
                <label htmlFor="adress">Adres</label>
                <input
                  type="text"
                  id="adress"
                  value={deliveryInfo.adress || ''}
                  onChange={(e) =>
                    setDeliveryInfo((prevState) => {
                      return { ...prevState, adress: e.target.value };
                    })
                  }
                />
              </div>
              <div className="userdetails__form__group">
                <label htmlFor="phoneNumber">Telefon</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={deliveryInfo.phoneNumber || ''}
                  onChange={(e) =>
                    setDeliveryInfo((prevState) => {
                      return { ...prevState, phoneNumber: e.target.value };
                    })
                  }
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="userdetails-back__btn">
                Güncelle
              </button>
            </div>
          </form>
          <div>
            <div>
              <PhotoForm show={true} />
            </div>
            <div>
              <AlbumForm show={true} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDetails;
