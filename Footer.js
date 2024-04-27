import React from 'react'
import Kju from './Imagini/Logo_cu_fundal.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';
import './footer.css'
const Footer  = () =>{
    const year=new Date().getFullYear();
    console.log(year);
    return(
        <footer>
            <div className='footer_container'>
                <div className='footr_details_one'>
                    <h3>Get to Know us</h3>
                    <Link to="/about-us">Despre Noi</Link>
                    <p>Career</p>
                    <p>Press Releaes</p>
                   
                </div>
                <div className='footr_details_one forres'>
                    <h3>Connect with Us</h3>
                    
                   
    
    <p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon style={{ color: '#3b5998', margin: '0 5px' }}/> Facebook
        </a>
    </p>
     <div className='footer_details_one forres'>
    <h3>Connect with Us</h3>
    <p>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon style={{ color: '#E4405F', margin: '0 5px' }}/> Instagram
        </a>
    </p>
    
</div>

                    
                </div>
               

            </div>
            <div className='lastdetails'>
                <img src={Kju} alt=""></img>
                <p><Link to="/conditions-of-use">Conditions of Use</Link> &nbsp; &nbsp; &nbsp;       Privacy Notice  &nbsp; &nbsp; &nbsp;     Interest-Based Ads   &nbsp; &nbsp; &nbsp;    @2023-{year}, Kju_Art.com</p>
            </div>
        </footer>
    )
}

export default Footer