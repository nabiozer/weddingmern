import React from 'react'
import './LoginForm.css'
const LoginForm = () => {
  return (
    <>
	<form >
      <div className='control-group'>
        <div >
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
          />
          
        </div>
        <div >
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
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