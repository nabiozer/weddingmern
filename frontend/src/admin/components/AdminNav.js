import React from "react";
import { NavLink ,useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import './AdminNav.css'

const AdminNav = (props) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.userLogin);
  const { userInfo } = userLogin;


  return (
    <ul className="admin-navlinks">
      <li className="admin-navlinks__item">
        <NavLink to="/admin/userlist" exact>
          Kullanıcılar
        </NavLink>
      </li>

      <li className="admin-navlinks__item">
        <NavLink to="/admin/expenses">Gelir</NavLink>
      </li>

      <li className="admin-navlinks__item">
        <NavLink to="/admin/photolist">Fotoğrafları Düzenle</NavLink>
      </li>
     
    </ul>
  );
};

export default AdminNav