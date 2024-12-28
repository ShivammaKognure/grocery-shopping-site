import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom"
import AboutUs from "./AboutUs"
import Cart from "./Cart"
import ContactUs from "./ContactUs"
import Home from "./Home"
import NonVeg from "./NonVeg"
import PurchaseHistory from "./PurchaseHistory"
import Veg from "./Veg"
import "./App.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar"
import { GoogleOAuthProvider } from "@react-oauth/google"
import GoogleLoginComponent from "./GoogleLoginComponent"


function App(){
  
  return(
    <>
    <GoogleOAuthProvider clientId="240990201004-fqmnrj7b93emn4o24ractn6pa2as74jk.apps.googleusercontent.com">
     
    
    
    <BrowserRouter>
    <Navbar/>{/*this is navbar compenet contains links*/ }
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/veg' element={<Veg />}/>
      <Route path='/nonveg' element={<NonVeg />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/purchasehistory' element={<PurchaseHistory />} />
      <Route path='/aboutus' element={<AboutUs />}/>
      <Route path='/contactus' element={<ContactUs />} />
      <Route path="/login" element={<GoogleLoginComponent />}/>
      
    </Routes>

    </BrowserRouter>
    </GoogleOAuthProvider>
    
    </>
  )
}

export default App
