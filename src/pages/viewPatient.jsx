import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewPatient = () => {
  const api = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("token");

  const [patient,setPatient] = useState(null)

 const {id} =useParams()

 const viewInstance = axios.create({
    baseURL:api,
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    }
 })

 useEffect(()=>{

    async function handleView(){
        try{
            const response = viewInstance.get(`/user/get/${id}`)
            setPatient(response.data)
        }
        catch(error){
            toast.error(error.response.data.message || "error getting the data")
        }
    }

    handleView()

 },[])


  return(
    <>
    <form action="">
        <div>
          <label htmlFor="UserName">UserName</label>
          <input
            value={patient.UserName}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            value={patient.Email}
            readOnly
            
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password" value="********" readOnly />
        </div>
        <div>
          <label htmlFor="ContactNumber">ContactNumber</label>
          <input
            value={patient.ContactNumber}
            readOnly
            
          />
        </div>
        <div>
          <label htmlFor="Address">Address</label>
          <input
            value={patient.Address}
            readOnly
            
          />
        </div>
        <div>
          <label htmlFor="Gender">Gender</label>
          <input value={patient.gender} />
        </div>
        <div>
          <label htmlFor="DOB">Date-of-Birth</label>
          <input
            value={patient.DOB}
            readOnly
            
          />
        </div>
    </form>
    </>
  )
};

export default ViewPatient;
