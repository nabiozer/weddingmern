import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import './UserList.css'
import {Link} from 'react-router-dom' 

import {listUsers} from '../../store/user-actions'
import UserCard from './UserCard';
import AdminNav from './AdminNav';
import Loader from '../../shared/components/Loader'

const UserList = () => {


  
    const dispatch = useDispatch();
    const userList = useSelector(state => state.user.userList)
   const [showByMonth,setShowByMonth] = useState('all')
    
    const userDelete = useSelector((state) => state.user.userDelete)
const {success: successDelete ,loading:loadingDelete} = userDelete
 
    const {error,success,users} = userList;
  
    useEffect(() => {
      dispatch(listUsers())
      
    }, [dispatch,successDelete,loadingDelete,showByMonth]);
   

    const sortByDate = (a, b) => {

      a = a.reservationInfo.date.split('.').reverse().join('');
      b = b.reservationInfo.date.split('.').reverse().join('');
      return a.localeCompare(b)
      
  
    }

    const filterHandler = (e) => {
      setShowByMonth(e.target.value)
      console.log(e.target.value)
     
    }

  
  return (
    <div>

<div className="color"></div>
<AdminNav />
<div className="filter-container">
<button className='userlist-new'>
      <Link to="/admin/register" >Yeni Kullanıcı</Link></button>
<div>
<label htmlFor="month">Aya Göre Filtrele</label>

<select onChange={filterHandler} name="month" id="month" className="userlist-filter">
<optgroup label="Aylar" className="userlist-as">
  <option value="all">Hepsi</option>
  <option value="01">Ocak</option>
  <option value="02">Şubat</option>
  <option value="03">Mart</option>
  <option value="04">Nisan</option>
  <option value="05">Mayıs</option>
  <option value="06">Haziran</option>
  <option value="07">Temmuz</option>
  <option value="08">Ağustos</option>
  <option value="09">Eylül</option>
  <option value="10">Ekim</option>
  <option value="11">Kasım</option>
  <option value="12">Aralık</option>
  </optgroup> 
</select>
</div>
</div>
{userList.loading ? <Loader/> :
<div className="table-container">
<table className="fl-table">
        <thead>
        <tr>
            <th>isim</th>
            <th>email</th>
            <th>tarih</th>
            <th>saat</th>
            <th>mekan</th>
            <th>paket</th>
            <th>fiyat</th>
            <th>kapora</th>
            <th>kalan</th>
            <th>düzenle</th>
        </tr>
        </thead>
        <tbody>
      
        {!error && success &&  ( showByMonth === 'all' ? 
        
        
        [...users].sort(sortByDate).map((user,index) =>  {
          return (
            
         user.name !== 'Admin User' &&
        <UserCard key={index}
        email = {user.email} 
        name = {user.name} 
        reservationInfo = {user.reservationInfo} 
        albumDelivered = {user.albumDelivered}
        chosen = {user.chosen}
        album = {user.album}
        deliveryInfo = {user.deliveryInfo}
        id={user._id} /> 
        
        )
   
    
        }) : 
        
        
        [...users].sort(sortByDate).filter(user => user.reservationInfo.date.split('.')[1] === showByMonth).map((user,index) =>  {
          return (
            
       
        <UserCard key={index}
        email = {user.email} 
        name = {user.name} 
        reservationInfo = {user.reservationInfo} 
        albumDelivered = {user.albumDelivered}
        chosen = {user.chosen}
        album = {user.album}
        deliveryInfo = {user.deliveryInfo}
        id={user._id} /> 
        
        )
   
    
        }))
          
        }
     
    
        </tbody>
    </table>
      
           

       
    </div>
     
  }
    </div>
  )
}

export default UserList