import React, { useState } from 'react';
import './Login.css';

import logo1 from "./Imagini/Logo_kju.png";

import './SignUp.css';
import VerifyEmailModal from './VerifyMail';
import emailjs from 'emailjs-com';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [udata, setUdata] = useState({ email: "", password: "", cpassword: "" });
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const navigate = useNavigate();

  const adddata = (e) => {
    const { name, value } = e.target;
    setUdata(prevUdata => ({
      ...prevUdata,
      [name]: value
    }));
  };

  const verifyCode = async (email, userCode) => {
    try {
        const response = await fetch('http://localhost:9000/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, code: userCode })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Verification successful:', data);
        } else {
            throw new Error('Failed to verify code.');
        }
    } catch (error) {
        console.error('Failed to fetch:', error);
        alert('Failed to connect to the server: ' + error.message);
    }
};

  const register = async (e) => {
    e.preventDefault();
    if (udata.password !== udata.cpassword) {
        alert('Parolele nu se potrivesc!');
        return;
    }

    try {
        const response = await fetch('http://localhost:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: udata.email, password: udata.password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registration successful:', data);

            // Send verification email using EmailJS
            const templateParams = {
                to_name: udata.email,
                from_name: 'Your Website Name',
                message: `Your verification code is: ${data.verificationCode}`,
                reply_to: 'your_email@example.com'
            };

            emailjs.send('rares', 'template_iylvkhg', templateParams, 'AZyj7gM1XpAkM9GGY')
                .then((emailResponse) => {
                    console.log('Email sent:', emailResponse);
                    setShowVerifyModal(true); // Open verification modal
                })
                .catch((emailError) => {
                    console.error('Error sending email:', emailError);
                });

        } else {
            const errorResponse = await response.json();
            console.error('Registration failed:', errorResponse);
            alert('Eroare la înregistrare: ' + errorResponse.message);
        }
    } catch (error) {
        console.error('Failed to fetch:', error);
        alert('Failed to connect to the server: ' + error.message);
    }
};

  return (
    <div className='login'>
      <Link to='/'>
        <img className='login__logo' src={logo1} />
      </Link>
      <div className='login__container'>
        <h1>Sign UP</h1>
        <form onSubmit={register}>
          <label htmlFor='email'>E-mail</label>
          <input type='text' name='email' onChange={adddata} value={udata.email} id='email' />

          <label htmlFor='password'>Password</label>
          <input type='password' placeholder='Macar 6 caractere' name='password' onChange={adddata} value={udata.password} id='password' />

          <label htmlFor='password'>Password AGAIN</label>
  <input type='password' name='cpassword' onChange={adddata} value={udata.cpassword} id='cpassword' />
  <button type='submit' className='login__signInButton'>Continue</button>
</form>

{showVerifyModal && (
  <VerifyEmailModal
    onSubmit={verifyCode} // Pass the verification code handling function
  />
)}

<p>Already have an account?</p>
<div className="signin_info">
  <NavLink to="/login">Sign in</NavLink>
</div>
</div>
</div>
);
}

export default SignUp;