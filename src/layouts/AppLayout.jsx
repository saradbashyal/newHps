import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../shared/navbar'
import Sidebar from '../shared/sidebar'

const AppLayout = () => {
    const [islight,setIslight] = useState(true) 
  return (
    <>
    <div className={islight ? "bg-white text-black min-h-screen" : "bg-gray-900 text-white min-h-screen"}>
    <Navbar islight={islight} togglemode={()=>{setIslight(!islight)}}/>
      <div className='flex'>
      <Sidebar/>
      <main className='flex-1 p-6'>
        <Outlet/>
    </main>
    </div>
    </div>
    </>
  )
}

export default AppLayout