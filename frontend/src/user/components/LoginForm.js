import React from 'react'
import './LoginForm.css'
const LoginForm = () => {
  return (
    <>
	<form >
      <div className='control-group'>
        <div >
          <label htmlFor='email'>First Name</label>
          <input
            type='email' required
            id='email'
          />
          
        </div>
        <div >
          <label htmlFor='pass'>Last Name</label>
          <input
            type='password' required minLength='6'
            id='pass'
          />
         
        </div>
      </div>
      <div >
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='text'
          id='name'
        
        
        />
      </div>
      <div className='form-actions'>
        <button >Submit</button>
      </div>
    </form>
	

		</>
  )
};

export default LoginForm;