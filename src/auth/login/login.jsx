import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'
import {EyeOff,Eye} from 'lucide-react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const api = import.meta.env.VITE_API_BASE_URL
    const LoginInstance = axios.create({
        baseURL:api,
        headers:{
            "Content-Type":"application/json"
        }
    })

    const navigate = useNavigate()

    const [state,setstate] = useState({
        Email:"",
        Password:"",
        Loading:false,
        showpassword:false
    })

    function handleChange(e){
        const {id,value} = e.target;
       
        setstate({
            ...state,
            [id]:value
        })
    }

    function toggleVisibility(){
      setstate((prev)=>({
        ...prev,
        showpassword:!prev.showpassword
      }))
    }

    async function handleSubmit(e){
        e.preventDefault()

        if (state.Password.length < 6) {
      toast.error("Password must be at least 6 character long");
      return;
    }

    if (!/[A-Z]/.test(state.Password)) {
      toast.error("Password must include at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(state.Password)) {
      toast.error("Password must include at least one lowercase letter.");
      return;
    }
    if (!/[@#$!%*?&]/.test(state.Password)) {
      toast.error("Password must include at least one special character.");
      return;
    }
    if (/\s/.test(state.Password)) {
      toast.error("Password cannot contain spaces.");
      return;
    }
    if (!/\d/.test(state.Password)) {
      toast.error("Password must include at least one number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.Email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    

    setstate(prev => ({ ...prev, Loading: true }));
    try{
        const response = await LoginInstance.post("/user/login",{
            email: state.Email,
            password: state.Password
        })
        console.log(response)
        toast.success("signup successful")
        Cookies.set("token", response.data.accessToken, { expires: 7 }) 
        console.log("token value:",response.data)
        navigate("/dashboard")

        setstate({
            Email:"",
            Password:"",
            Loading:false
        });
        

    }
    catch(error){
        toast.error(error.response?.data?.message||"signup failed")
    }
    finally{
        setstate(prev => ({ ...prev, Loading: false }));
    }
}

  return (
    <>
    <form onSubmit={handleSubmit}>
        <h1>login</h1>
       
        <div>
            <label htmlFor="Email" >Email</label>
            <input type="text" id='Email'  value={state.Email} onChange={handleChange} />
        </div>

        <div>
            <label htmlFor="Password">Password</label>
            <input  type={state.showpassword ? "text" : "password"} placeholder='Enter Password'name='Password' id='Password' value={state.Password} onChange={handleChange}/>
            <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
          >
            {state.showpassword ? <EyeOff size={10} /> : <Eye size={10} />}
          </button>
        </div>
        <button type="submit" onClick={handleSubmit} disabled={state.Loading}>{state.Loading ? "Logining..." : "Login"}</button>
    </form>
    <ToastContainer/>
    </>
  )
}

export default Login