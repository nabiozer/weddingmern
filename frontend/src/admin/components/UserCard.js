import React from "react";
import {Link} from 'react-router-dom';
import './UserCard.css'
import {useDispatch} from 'react-redux'

import {deleteUser} from '../../store/user-actions'


const UserCard = ({
  email,
  name,
  reservationInfo,
  albumDelivered,
  chosen,
  deliveryInfo,
  album,
  id,
  myKey
}) => {


  const dispatch = useDispatch();



  const deleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete ?')) {
      dispatch(deleteUser(id))
    }
   
  }
  return (
    <>
 
   
        <tr key={myKey}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{reservationInfo.date}</td>
            <td>{reservationInfo.hour}</td>
            <td>{reservationInfo.place}</td>
            <td>{reservationInfo.packageDetails}1</td>
            <td>{reservationInfo.packagePrice}</td>
            <td>{reservationInfo.advancePayment}</td>
            <td>{reservationInfo.packagePrice - reservationInfo.advancePayment}</td>
           
            <td><Link to={`/admin/user/${id}/edit`}>
              <button>
                <i className='fas fa-edit' style={{color:'green'}}></i>
              </button>
            </Link>
            <button onClick={() => deleteHandler(id)}><i className='fas fa-trash' style={{color:'red'}}></i></button></td>
        </tr>








     
        
     
    </>
  );
};

export default UserCard;
