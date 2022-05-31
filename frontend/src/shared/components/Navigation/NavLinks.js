import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/user-actions";
import "./NavLinks.css";

const NavLinks = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };
  return (
    <ul className="nav-links">
      <li className="nav-links__social">
        <a
          href="https://api.whatsapp.com/send/?phone=905421132503&text&app_absent=0"
          target="_blank"
          rel="noopener"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </a>
        <a
          href="https://www.instagram.com/nnphotofilm/"
          target="_blank"
          rel="noopener"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
      </li>
      <li>
        <NavLink to="/" exact>
          Ana Sayfa
        </NavLink>
      </li>

      <li>
        <NavLink to="/packages">Paketlerimiz</NavLink>
      </li>

      <li>
        <NavLink to="/albums">Albümlerimiz</NavLink>
      </li>
      <li></li>
      {userInfo ? (
        <li className="dropdown">
          {!userInfo.isAdmin ? (
            <NavLink to="/profile">({userInfo.name})</NavLink>
          ) : (
            <NavLink to="/admin">({userInfo.name})</NavLink>
          )}

          <button onClick={logoutHandler}>Çıkış</button>
        </li>
      ) : (
        <li>
          <NavLink to="/login">Giriş</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
