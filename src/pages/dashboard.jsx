import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Dashboard = () => {

    const [state,setstate] = useState({
        doctor:"",
        appointments:"",
    })

    const api = import.meta.env.VITE_API_BASE_URL
    const dashboardInstance = axios.create({
        baseURL : api,
        headers:{
            "Content-Type":"application/json"
        }
    })

    useEffect(()=>{
        async function dashboardData(){
         try{
            const doctorRes = dashboardInstance.get("/api/doctor/show")

         }  
         
         catch(error){

         }

        }
    },[])

  return (
    <>
    <section>
        <div>

        </div>
    </section>
    </>
  )
}

export default Dashboard