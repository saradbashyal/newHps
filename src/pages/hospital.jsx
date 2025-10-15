import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Cookie } from 'lucide-react'

const Hospital = () => {

    const [state,setstate] = useState({
        hospital:{},
        loading:true
    })

    const api = import.meta.env.VITE_API_BASE_URL

    const token = Cookie.set(token)
    

    const hospitalInstance = axios.create({
        baseURL: api,
        headers : {
            "Content-type" : "application/json",
            Authorization:`Bearer ${token}`
        }
    })

    useEffect(()=>{
        async function loadHospital(){
            try{
                const response = await hospitalInstance.get("/api/categoryHospital/show")
            }
            catch(error){

            }
            finally{

            }
        }
    },[])

  return (
    <div>Hospital</div>
  )
}

export default Hospital