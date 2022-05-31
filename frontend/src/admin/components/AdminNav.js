import React from "react";
import { NavLink} from "react-router-dom";


import './AdminNav.css'

const AdminNav = (props) => {



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