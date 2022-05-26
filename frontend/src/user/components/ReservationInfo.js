import React from 'react'
import { useSelector } from 'react-redux';
import './ReservationInfo.css'
const ReservationInfo = () => {
    const userDetails = useSelector((state) => state.user.userDetails);
  const { loading, error, user } = userDetails;

  return (
      <div className='reservation-section'>
    {user.name && (
        <>
        <h3>Çekim Bilgileri</h3>
        <div className="reservation-container">
          <div>
            
            <p>Tarih:<span>{user.reservationInfo.date}</span></p>
          </div>
          <div>
          
            <p>Saat: <span>{user.reservationInfo.hour}</span></p>
          </div>
          <div>
            
            <p>Mekan : <span>{user.reservationInfo.place}</span></p>
          </div>
          <div>
          
            <p> Paket : <span>{user.reservationInfo.packageDetails}</span></p>
          </div>
          <div>
        
            <p> Paket Fiyatı :<span>{user.reservationInfo.packagePrice}</span></p>
          </div>
          <div>
            
            
            <p>Ön Ödeme : <span> {user.reservationInfo.advancePayment}</span></p>
          </div>
          <div>
            
            <p>Kalan Ödeme : <span>{user.reservationInfo.packagePrice -
              user.reservationInfo.advancePayment}</span></p>
          </div>
        </div>
        </>
      )}
      </div>
  )
}

export default ReservationInfo