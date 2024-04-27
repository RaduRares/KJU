import React, { useState } from 'react';
import './Login.css'
import {Link,useNavigate} from "react-router-dom"
import logo1 from "./Imagini/Logo_kju.png"
import {auth}from "./firebase"
import { NavLink } from 'react-router-dom';

function Login() {
    const [logdata, setData] = useState({
      email: "",
      password: ""
    });
  
    const navigate = useNavigate();
  
    const signIn = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:9000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: logdata.email,
            parola: logdata.password,
          }),
        });
  
  
        if (response.ok) {
            const data = await response.json();
            console.log('Autentificare cu succes:', data);
          navigate('/'); // navighează către pagina de start după autentificare
        } else {
            const errorText = await response.text();
            console.error('Eroare la autentificare:', errorText);
        }
      } catch (error) {
        console.error('Eroare la trimiterea datelor:', error);
      }
    };
  
    const register = () => {
      // navighează către pagina de înregistrare
      navigate('/register');
    };
  
    const adddata = (e) => {
      const { name, value } = e.target;
      setData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    return(
        <div className='login'>
            <Link to='/'>
                
            <img className='login__logo' src={logo1}/>
            </Link>
            <div className='login__container'>
            <h1>Sign-in</h1>
            <form>
                <label htmlFor='email'>E-mail</label>
                <input type='text'name='email'
                onChange={adddata}
                value={logdata.email}
                id='email'/>
                
                <label htmlFor='password'>Password</label>
                <input type='password'  placeholder='Macar 6 caractere'name='password'
                onChange={adddata}
                value={logdata.password}
                id='password' />
               
                <button onClick={signIn} type='submit' className='login__signInButton'>
                    Sign In
                </button>
                </form>
                <p>
                    By signing-in you agree to the Kju_art Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                
                <button onClick={register} className='login__registerButton'>
                    <NavLink to="/register"> 
                    Create your KJU Account
                    </NavLink>
                </button>
           
            </div>
        </div>
    )
}
export default Login;
