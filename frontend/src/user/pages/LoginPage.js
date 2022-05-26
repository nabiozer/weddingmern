import React,{useState,useEffect} from "react";
import { Link ,useLocation,useHistory} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {login,getUserDetails,listUsers} from '../../store/user-actions'
import Banner from "../../shared/UIElements/Banner";

import "./LoginPage.css";
import Loader from "../../shared/components/Loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector(state => state.user.userLogin)
  const {loading,error,userInfo} = userLogin;
  const location = useLocation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
      if(userInfo) {
        history.push(redirect)
      }
    
  },[history,userInfo,redirect]);

 
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password))
    
  }
  
  return (
    <section className="login-section">
      {error && <h1>{error}</h1>}
      {loading && <Loader />}
      <form onSubmit={submitHandler} className="login-form">
        
          <div className='login-form__group'>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" 
            value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        
        <div className='login-form__group'>
          <label htmlFor="password">Şifre</label>
          <input type="password" id="password" 
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className='login-form__btn'>Giriş</button>
        </div>

        
      </form>
    </section>
  );
};

export default LoginPage;
