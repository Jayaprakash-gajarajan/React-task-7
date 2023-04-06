import React from 'react'
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { API } from './global';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import {FaEye, FaEyeSlash} from 'react-icons/fa'
const movieValidationShema = yup.object({
    username: yup.string().required(),
    password:yup.string().required().min(8),
  })
  function Signin() {
    const handleToggle=()=>{
        if(passwordType==="password"){
          setPasswordType("text");
          setPasswordIcon(<FaEye/>)
        }
        else{
          setPasswordType("password");
          setPasswordIcon(<FaEyeSlash/>)
        }
      }
          const [passwordType,setPasswordType]=useState("password");
          const [passwordIcon,setPasswordIcon]=useState(<FaEyeSlash/>);

    const [formState,setFormState]=useState("success");
    const navigate=useNavigate();
    const {handleChange,values,handleSubmit,handleBlur, touched, errors}=useFormik({
        initialValues:{username:"",password:""},
        validationSchema: movieValidationShema,
        onSubmit:async(values)=>{
            console.log(values);
         const data = await fetch(API+"/"+"signup",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(values),
            });
            if(data.status==401){
                console.log("username already exist");
                setFormState("error")
                
            }
            else{
                const result= await data.json()
                console.log("success",result);
                localStorage.setItem("token",result.token)
                localStorage.setItem("roleId",result.roleId)
                navigate("/login")
            }
          
        },
  });
  return (
    <div className="center">
      <h1>Create a Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input type="text" required=""
           onChange={handleChange} 
           onBlur={handleBlur}
           value={values.username}
           name="username"
          />
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input type={passwordType} required=""
          onChange={handleChange} 
          onBlur={handleBlur}
          value={values.password}
          name="password"
          />
          <span></span>
          <label>Password</label>
          <span className="eye"  onClick={handleToggle}>{passwordIcon}</span>
        </div>
        <button className='signup__button'
        color={formState}
        type="submit" variant="contained">
          {formState ==="error"?"Retry":"Signup"}
          </button>
      </form>
    </div>
  )
  }
  

export default Signin
