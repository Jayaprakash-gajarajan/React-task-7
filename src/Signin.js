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
    <div>
      <form onSubmit={handleSubmit} className="login-form" >
                <h2 style={{margin:"15px"}}>SIGNUP</h2>
            <TextField 
            id="outlined-basic" 
            label="Username"
             variant="outlined"
             onChange={handleChange} 
             onBlur={handleBlur}
             value={values.username}
             name="username"
             /> 
  {touched.username && errors.username ? errors.username : null}
           <TextField id="outlined-basic"
           type={passwordType}
            label="Password" 
            variant="outlined" 
            onChange={handleChange} 
            value={values.password}
            onBlur={handleBlur}
            name="password"
            />   
<span className="eye" onClick={handleToggle}>{passwordIcon}</span>  

  {touched.password && errors.password ? errors.password : null}
            <Button  color={formState}
            type="submit" variant="contained">
                {formState ==="error"?"RETRY":"SIGNUP"}
                </Button>
            </form>
    </div>
  )
  }
  

export default Signin
