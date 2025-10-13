import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate,useLocation } from 'react-router-dom'
const Otp = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email

  const [state,setstate] = useState({
    otp:"",
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

        setstate(prev=>({...prev,loading:true}))
    try{
      const response = await resetInstance.post("/user/verify-otp",{
        email,
        otp:state.otp
      })
      toast.success("otp successful")
      setstate({
        otp:"",
        loading:false
      })
      navigate("/confirmpassword",{
        state:{
            email,
            otp:state.otp
        }
      })
    }
    catch(error){
      toast.error(error.response.data.message || "wrong otp")
    }
    finally{
      setstate(prev => ({ ...prev, loading: false }));
    }
  }

  return (
    <>
    <section>
        <div>
            <label htmlFor="otp">OTP</label>
            <input type="text" id='otp' value={state.otp} onChange={(e)=>setstate(prev=>({...prev,otp:e.target.value}))}/>
        </div>
        <button type="submit" onClick={handleSubmit} disabled={state.loading}>
          {state.loading ? "confirming otp..." : "confirm otp"}
        </button>
    </section>
    <ToastContainer/>
    </>
  )
}

export default Otp