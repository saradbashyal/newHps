import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'


    function userAuth(){
        const token = Cookies.get("token")
        return !!token;
        }

function ProtectedRoute(){
    const isAuth = userAuth()
    return isAuth? <Outlet/>: <Navigate to="/login"/>
}
export default ProtectedRoute