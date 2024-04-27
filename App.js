import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout"
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Pusher from 'pusher-js';
import axios from "./axios";
import Footer  from "./Footer";
import SignUp from './SignUp';
import ProductDetail from './ProductDetail';
import  VerifyMail  from './VerifyMail';
import AboutUs from './AboutUs';
import ConditionsOfUse  from "./ConditionsOfUse";
import AdminProductList from "./AdminProductList";
import User from './User'
function App() {
  const [messages , setMessages]=useState([]);
  function verifyCode(code) {
    // Trimite codul la server pentru verificare
    fetch('/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ verificationCode: code })
    })
    .then(response => response.json())
    .then(data => {
      // Manipulează răspunsul, de exemplu, închide fereastra de verificare și autentifică utilizatorul
    })
    .catch((error) => {
      // Manipulează erorile, de exemplu, afișează un mesaj că codul este incorect
    });
  }
  
useEffect(()=>{
  axios.get("/produse/sync")
  .then((response) => {
    setMessages(response.data);
  })
  .catch((error) => {
    console.error("Network Error:", error); // Log the error for debugging
    // Display an error message to the user, e.g., "Failed to connect to server. Please try again later."
  });
},[]);

  useEffect(() =>{
    const pusher = new Pusher('201af38afbea08fac47a', {
      cluster: 'eu' 
    });

    const channel = pusher.subscribe('produse');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });

  }, []);

console.log(messages);
  useEffect(()=>{
   const pusher = new Pusher('201af38afbea08fac47a', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('produse');
    channel.bind('inserted', function(data) {
      alert(JSON.stringify(data));
    });

  },[]);
  return (
    <Router>
      <div className="app">
      
        <Routes>
        <Route path="/login" element=
         { <Login/>
       
  }/>
    <Route path="/register" element=
         { <SignUp/>
       
  }/>
   <Route path="/verify-email" element=
         { <VerifyMail/>
}/>

<Route path="/conditions-of-use" element={
            
            <>
              <Header/>
            <ConditionsOfUse/>
            <Footer/>
            </>
            
            } />

   <Route path="/about-us" element={<><Header/> 
   <AboutUs/>   <Footer/> </>
   }/>
          <Route path="/checkout" element=
          {<>
            <Header/>
          <Checkout/>
          </>
        } />    
        
        <Route path="/product/:id" element={
            
            <>
              <Header/>
            <ProductDetail/>
            <Footer/>
            </>
            
            } />
            
          <Route path="/" element={
            
          <>
            <Header/>
          <Home/>
          <Footer/>
          </>
          
          } />
            <Route path="/User" element={
            
            <>
              <Header/>
            <User/>
            <Footer/>
            </>
            
            } />
          <Route path="admin" element={
            
            <>
              <Header/>
            <AdminProductList/>
            <Footer/>
            </>
            
            } />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
