import React from 'react'
import {NavLink} from 'react-router-dom'
import './CheckOutSteps.css'

const CheckOutSteps = ({step1, step2, step3}) => {
  return (
    <nav className='checkout-container'>
    <ul>
            <li>
            {step1 ? (
                <NavLink to='/profile/albumform' style={{color: 'white',backgroundColor: 'rgb(11, 72, 49)'}}>
                    Album Seçimi
                </NavLink>
            ) : (<NavLink to='/profile/albumform'  style={{textDecoration: 'none',pointerEvents:'none',border:'none',color:'gray'}} d>Album Seçimi</NavLink>)}
            </li>


        <li>
            {step2 ? (
                <NavLink to='/profile/photoform' style={{color: 'white',backgroundColor: 'rgb(11, 72, 49)'}}>
                    Fotoğraf Seçimi 
                </NavLink>
            ) : (<NavLink to='/profile/photoform' style={{textDecoration: 'none',pointerEvents:'none',border:'none', color:'gray'}} >Fotoğraf Seçimi</NavLink>)}
            </li>


        <li>
            {step3 ? (
                <NavLink to='/profile/choicesform'style={{color: 'white',backgroundColor: 'rgb(11, 72, 49)'}}>
                    Onay
                </NavLink>
            ) : (<NavLink to='/profile/albumform' style={{textDecoration: 'none',pointerEvents:'none',border:'none',color:'gray'}}>Onay</NavLink>)}
            </li>
            </ul>
    </nav>
  )
}

export default CheckOutSteps