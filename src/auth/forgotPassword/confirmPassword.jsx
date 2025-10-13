import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate,useLocation } from 'react-router-dom'

const ConfirmPassword = () => {

    const api = import.meta.env.VITE_API_BASE_URL
    const confirmInstance = axios.create({
        baseURL : api,
        headers: {
            "Content-Type":"application/json"
        }
    })

    const [state,setstate] = useState({
        password:"",
        confirmPassword:"",
        loading:false,
    })

    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email
    const otp = location.state?.otp

    async function handleSubmit(e){
        e.preventDefault()
        setstate(prev=>({...prev,loading:true}))
        try{
            const response = confirmInstance.post("/user/reset-password",{
                email,
                otp,
                newpassword:state.password
            })
            toast.success("password changed")
            setstate({
                password:"",
        confirmPassword:""
            })
            navigate("/login")
        }
         catch(error){
            toast.error(error.response.data.message || "reset password failed")
        }
        finally{
         setstate(prev => ({ ...prev, Loading: false }));   
        }
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="password">New password</label>
            <input type="text" id='password' value={state.password} onChange={(e)=>setstate(prev=>({...prev,password:e.target.value}))} />
        </div>
         <div>
            <label htmlFor="password">New password</label>
            <input type="text" id='password' value={state.password} onChange={(e)=>setstate(prev=>({...prev,password:e.target.value}))} />
        </div>
        <button type="submit" disabled={state.loading}>
            {state.loading?"reseting password...":"reset password"}
        </button>
    </form>
    <ToastContainer/>
    </>
    )
}

export default ConfirmPassword