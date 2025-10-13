import './App.css'
import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Signup from './auth/signup/signup'
import Login from './auth/login/login'
import ResetPassword from './auth/forgotPassword/resetPassword'
import Otp from './auth/forgotPassword/OTP'
import ConfirmPassword from './auth/forgotPassword/confirmPassword'
import Navbar from './shared/navbar'
import Sidebar from './shared/sidebar'

function App() {
  const [islight,setIslight] = useState(true) 

  return (
    <>
    <div className={islight ? "bg-white text-black min-h-screen" : "bg-gray-900 text-white min-h-screen"}>
    <BrowserRouter>
    <Navbar islight={islight} togglemode={()=>{setIslight(!islight)}}/>
      <div className='flex'>
      <Sidebar/>
      <main className='flex-1 p-6'>

      
    <Routes>
     <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgotpassword' element={<ResetPassword/>}></Route>
      <Route path='/verifyOtp' element={<Otp/>}></Route>
      <Route path='/confirmpassword' element={<ConfirmPassword/>}></Route>
      <Route path='/resetpassword' element={<ResetPassword/>}></Route>
    </Routes>
    </main>
    </div>
    

    </BrowserRouter>
    </div>
    </>
  )
}

export default App
