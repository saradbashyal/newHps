import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'
import {EyeOff,Eye} from 'lucide-react'
const Signup = () => {

    const api = import.meta.env.VITE_API_BASE_URL
    const signupInstance = axios.create({
        baseURL:api,
        headers:{
            "Content-Type":"application/json",
  
        }
    })



    const [state,setstate] = useState({
        UserName:"",
        Email:"",
        ContactNumber:"",
        Address:"",
        Gender:"",
        DOB:"",
        Password:"",
        ConfirmPassword:"",
        Loading:false,
        showpassword:false
    })

    function handleChange(e){
        const {id,value,type} = e.target;
        if(type==="radio"){
            setstate({
                ...state,
                Gender:value
            })
        }
        else{
            setstate({
            ...state,
            [id]:value
        })
        }
    }

    function togglePasswordVisibility(){
        setstate(prev => ({
            ...prev,
            showpassword: !prev.showpassword
        }))
    }

    async function handleSubmit(e){
        e.preventDefault()

        if (state.Password.length < 6) {
      toast.error("Password must be at least 6 character long");
      return;
    }
    if (state.Password !== state.ConfirmPassword) {
      toast.error("Passwords do not match");
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

    if (!/^\+?\d{10}$/.test(state.ContactNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.Email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    

    setstate(prev => ({ ...prev, Loading: true }));
    try{
        const response = await signupInstance.post("/user/register",{
            UserName: state.UserName,
            Email: state.Email,
            ContactNumber: state.ContactNumber,
            Address: state.Address,
            Gender: state.Gender,
            DOB: state.DOB,
            Password: state.Password
        })
        toast.success("signup successful")
        setstate({
            UserName:"",
            Email:"",
            ContactNumber:"",
            Address:"",
            Gender:"",
            DOB:"",
            Password:"",
            ConfirmPassword:"",
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
        <h1>Create an Account</h1>
        <div>
            <label htmlFor="UserName" >UserName</label>
            <input type="text" id='UserName'  value={state.UserName} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="Email" >Email</label>
            <input type="text" id='Email'  value={state.Email} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="ContactNumber" >ContactNumber</label>
            <input type="text" id='ContactNumber'  value={state.ContactNumber} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="Address" >Address</label>
            <input type="text" id='Address'  value={state.Address} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="Gender" >Gender</label>
            <div>
            <label htmlFor="Male">Male</label>
            <input type="radio" name="Gender" id="Male" value="Male" checked={state.Gender === "Male"} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="Female">Female</label>
            <input type="radio" name="Gender" id="Female" value="Female" checked={state.Gender === "Female"} onChange={handleChange} />
            </div>
        </div>
        <div>
            <label htmlFor="DOB">Date-of-Birth</label>
            <input type="date" name="DOB" id="DOB" value={state.DOB} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="Password">Password</label>
            <input  type={state.showpassword ? "text" : "password"} placeholder='Enter Password'name='Password' id='Password' value={state.Password} onChange={handleChange}/>
            <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
          >
            {state.showpassword ? <EyeOff size={10} /> : <Eye size={10} />}
          </button>
        </div>
        <div>
            <label htmlFor="ConfirmPassword">Password</label>
            <input  type={state.showpassword ? "text" : "password"} placeholder='Confirm Password'name='ConfirmPassword' id='ConfirmPassword' value={state.ConfirmPassword} onChange={handleChange}/>
            <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
          >
            {state.showpassword ? <EyeOff size={10} /> : <Eye size={10} />}
          </button>
        </div>
        <button type="submit" onClick={handleSubmit} disabled={state.Loading}>{state.Loading ? "Creating Account..." : "Create Account"}</button>
    </form>
    <ToastContainer/>
    </>
  )
}

export default Signup