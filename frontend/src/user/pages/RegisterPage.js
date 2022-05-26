import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../store/user-actions";
import {listUsers} from '../../store/user-actions'
import "./RegisterPage.css";
import Loader from "../../shared/components/Loader";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userRegister = useSelector((state) => state.user.userRegister);
  const { loading, error, userInfo ,success} = userRegister;
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const [message, setMessage] = useState(null);
  

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        setMessage('Password Do not Match')
    } else {
        dispatch(register(name, email, password, reservationInfo, deliveryInfo,album));
        dispatch(listUsers())
        
          history.push('/admin/userlist')
        
       
    }
    
  };

  return (
    <section className='register-form__section'>
    <div className="color"></div>
      {error && <h1>{error}</h1>}
      {message && <p>{message}</p>}
      {loading && <Loader />}
      <form onSubmit={submitHandler} className='register-form'>
        <div className="register-form__container">
          <div className="register-form__group">
            <label htmlFor="name">İsim Soyisim</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="register-form__group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="register-form__group">
          <label htmlFor="password">Şifre</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register-form__group">
          <label htmlFor="confirmpassword">Şifre Tekrar</label>
          <input
            type="text"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          
          <div className="register-form__group">
            <label htmlFor="date">Çekim Tarihi</label>
            <input
              type="text"
              id="date"
              value={reservationInfo.date}
              onChange={(e) => setReservationInfo((prevState) => {
                  return {...prevState,date:e.target.value}
              })}
            />
          </div>
          <div className="register-form__group">
            <label htmlFor="hour">Çekim Saati</label>
            <input
              type="text"
              id="hour"
              value={reservationInfo.hour}
              onChange={(e) => setReservationInfo((prevState) => {
                  return {...prevState,hour:e.target.value}
              })}
            />
          </div>
          <div className="register-form__group">
            <label htmlFor="place">Çekim Mekanı</label>
            <input
              type="text"
              id="place"
              value={reservationInfo.place}
              onChange={(e) => setReservationInfo((prevState) => {
                  return {...prevState,place:e.target.value}
              })}
            />
          </div>
          <div className="register-form__group">
            <label htmlFor="packagePrice">Paket Fiyatı</label>
            <input
              type="number"
              id="packagePrice"
              value={reservationInfo.packagePrice}
              onChange={(e) => setReservationInfo((prevState) => {
                  return {...prevState,packagePrice:e.target.value}
              })}
            />
          </div>
          <div className="register-form__group">
            <label htmlFor="advancePayment">Kapora</label>
            <input
              type="number"
              id="advancePayment"
              value={reservationInfo.advancePayment}
              onChange={(e) => setReservationInfo((prevState) => {
                  return {...prevState,advancePayment:e.target.value}
              })}
            />
          </div>
          <div className="register-form__group">
            <label htmlFor="packageDetails">Paket Detayları</label>
            <input
              type="text"
              id="packageDetails"
              value={reservationInfo.packageDetails}
              onChange={(e) => setReservationInfo((prevState) => {
                  return {...prevState,packageDetails:e.target.value}
              })}
            />
          </div>

          <div className="register-form__group">
            <label htmlFor="album">Album Detayları</label>
            <input
              type="text"
              id="packageDetails"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
          </div>
        </div>
        <div>
          
          <div className="register-form__group">
            <label htmlFor="adress">Adres</label>
            <input
              type="text"
              id="adress"
              value={deliveryInfo.adress}
              onChange={(e) => setDeliveryInfo((prevState) => {
                  return {...prevState,adress:e.target.value}
              })}
            />
          </div>
          <div className="register-form__group">
            <label htmlFor="phoneNumber">Telefon</label>
            <input
              type="text"
              id="phoneNumber"
              value={deliveryInfo.phoneNumber}
              onChange={(e) => setDeliveryInfo((prevState) => {
                  return {...prevState,phoneNumber:e.target.value}
              })}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="userdetails-back__btn">Kullanıcı Oluştur</button>
        </div>

        
      </form>
    </section>
  );
};

export default RegisterPage;

