import React from 'react'
import './forgot.css'
import { Link } from 'react-router-dom'

export default function Forgotpassword() {
  return (
    <div id="forgot-bg">

      {/* <h3>forgotten</h3> */}
      <div id="forgot-card">

        <input type="email" className='form form-control' id="forgot-inputs"
          placeholder='Email ID ' />
          <input type="text" className='form form-control' id="forgot-inputs"
          placeholder='OTP' />
        <input type="text" className='form form-control' id="forgot-inputs"
          placeholder=' New Password ' />
        <input type="password" className='form form-control' id="forgot-inputs"
          placeholder='Confirm Password' />
        <div id="forgot-buttons">
          <button className="btn btn-primary" id="otp-btn-forgot">Generate Otp</button>
          <button className="btn btn-success" id="sign-btn-forgot">Change Passoword</button>
          <Link to="/login" ><h6 id="forgot-login"><img src="Images/leftarrow.png" alt="left arrow image" id="left-arrow-forgot" />&nbsp;<span style={{color:'black'}}>Back</span></h6></Link>

        </div>

      </div>
      <div>

      </div>
    </div>
  )
}
