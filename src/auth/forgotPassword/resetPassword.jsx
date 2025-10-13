import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const ResetPassword = () => {

  const navigate = useNavigate()
  const [state,setstate] = useState({
    email:"",
    loading:false
  })

  const api = import.meta.env.VITE_API_BASE_URL
  const resetInstance = axios.create({
    baseURL : api,
    headers:{
      "Content-Type":"application/json"

    }
  })


  async function handleSubmit(e){
    e.preventDefault()

     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
          toast.error("Please enter a valid email address");
          return;
        }
        setstate(prev=>({...prev,loading:true}))
    try{
      const response = await resetInstance.post("/user/forgetpassword",{
        email:state.email
      })
      toast.success("Check your email")
      setstate({
        email:"",
        loading:false
      })
      navigate("/Otp",{
       state:{ email:state.email}
      })
    }
    catch(error){
      toast.error(error.response.data.message || "email otp not sent")
    }
    finally{
      setstate(prev => ({ ...prev, Loading: false }));
    }
  }

  return (
    <>
    <section>
        <div>
            <label htmlFor="Email">Email</label>
            <input type="text" id='email' value={state.email} onChange={(e)=>setstate(prev=>({...prev,email:e.target.value}))}/>
        </div>
        <button type="submit" onClick={handleSubmit} disabled={state.loading}>
          {state.loading ? "sending..." : "send otp"}
        </button>
    </section>
    <ToastContainer/>
    </>
  )
}

export default ResetPassword