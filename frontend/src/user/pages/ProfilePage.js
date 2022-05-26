import React, { useEffect } from "react";
import {

  useHistory,
 
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails ,listUsers} from "../../store/user-actions";


import "./RegisterPage.css";
import Loader from "../../shared/components/Loader";
import "./ProfilePage.css";
import ReservationInfo from "../components/ReservationInfo";


import Choices from "../components/Choices";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userDetails = useSelector((state) => state.user.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.user.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (!user.name) {
      dispatch(getUserDetails("profile"));
    }

    
  }, [history, userInfo, user, dispatch]);

  return (
    <>
      <div className="color"></div>
      {loading ? <Loader/> : 
      <div className="profile-container">
        <div className="profile-container__reservationheader">
          
            <div className="profile-container__reservation">
              <ReservationInfo />
            </div>

            <div className="profile-container__choices">
              <Choices />
            </div>

            <div >{user.photos && <a href={user.photos} className='profile-container__download' >Fotoğrafları indir</a> }</div>
            <div >{user.video && <a href={user.video} className='profile-container__download' >Video Klibi indir</a> }</div>
          
        </div>
      </div>
      
      }
      
    </>
  );
};

export default ProfilePage;
