import { useState } from "react"

const Register= () =>{
  const [formData,setFromData] = useState({
    email:"",
    password:"",
    confirmPassword:"",
    role:"customer",
  });

  const[errors,setErrors] = useState({});

  const handleChange = (e) =>{

  };
}