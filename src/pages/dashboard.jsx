import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { UserRound,CalendarCheck,UsersRound,Hospital } from 'lucide-react'
import Piechart from '../components/charts/piechart'
import Barchart from '../components/charts/barchart'


const Dashboard = () => {

    const [state,setstate] = useState({
        doctor:0,
        appointments:0,
        patient:0,
        hospital:{},
    })

    const token = Cookies.get("token")

    const api = import.meta.env.VITE_API_BASE_URL
    const dashboardInstance = axios.create({
        baseURL : api,
        headers:{
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        }
    })

    useEffect(()=>{
        async function dashboardData(){
            // doctor number api fetch
         try{
            const doctorRes = await dashboardInstance.get("/api/doctor/show")
            console.log("doc data is:",doctorRes.data)
            setstate(prev=>({...prev,doctor:doctorRes.data.length}))


         }  
         
         catch(error){
            console.log("doctor api failed :",error)
         }

         // appointments number api fetch
         try{
            const appointmentRes = await dashboardInstance.get("/api/user-appointment/show")
            console.log("appointments:",appointmentRes.data)
            setstate(prev=>({...prev,appointments:appointmentRes.data.length}))
            

         }  
         
         catch(error){
            console.log("appointment api failed :",error)
         }
         
         // patients/users number api fetch
         try{
            const patientRes = await dashboardInstance.get("/user/get")
            const patients = patientRes.data?.data ?? []
            console.log("patients number:",patients)
            setstate(prev=>({...prev,patient:patients.length}))

         }  
         
         catch(error){
            console.log("patients api failed :",error)
         }
         
         // hospital name api fetch
         try{
            const hospitalRes = await dashboardInstance.get("/api/hospital/show")
            setstate(prev=>({...prev,hospital:hospitalRes.data[0]}))

         }  
         
         catch(error){
            console.log("hospital api failed :",error)
         }
        }
        dashboardData()
    },[])

    // for piechart

    const pieData = [
        {name:"Doctors",value:state.doctor},
        {name:"Appointments",value:state.appointments},
        {name:"Patient",value:state.patient}
    ]

  return (
    <>
    <section>
        <div>
            <UserRound />
            <div>
                {state.doctor}
                <p>Doctors</p>
            </div>
        </div>
        <div>
            <CalendarCheck />
            <div>
                {state.appointments}
                <p>Appointments</p>
            </div>
        </div>
        <div>
            <UsersRound />
            <div>
                {state.patient}
                <p>Patients</p>
            </div>
        </div>
        <div>
            <Hospital />
            <div>
                {state.hospital?.name || "hospital name not available"}
                {state.hospital?.address || "hospital address not available"}
            </div>
        </div>
        <div>
            <div className='w-[400px] h-[400px] '>
                <Piechart data={pieData}/>
            </div>
        
        <div className='w-[400px] h-[400px] '>
            <Barchart data={pieData} />
        </div>
        </div>
    </section>
    </>
  )
}

export default Dashboard