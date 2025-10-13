import React from "react";
import { Search, Moon, LogOut,Sun } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Navbar = ({islight,togglemode}) => {

    const navigate = useNavigate()

    const [text,setText] = useState("")

    async function handleSearch(e){
        e.preventDefault()
    }
    function handleLogout(){
      Cookies.remove("Token",{path:"/"})
      navigate("/login")
    }

  return (
    <>
      <section className={`flex justify-between items-center p-4 ${islight ? "bg-gray-100 text-black" : "bg-gray-800 text-white"}`}>
        <span>
          <input type="text" name="text" id="text" placeholder="search" value={text} onChange={(e)=>{setText(e.target.value)}} />
          <button type="submit" onClick={handleSearch}>
            <Search />
          </button>
        </span>
        <span>
          <button onClick={togglemode}>
            {islight? <Moon/>:<Sun /> }
          </button>
          <button onClick={handleLogout}>
            <LogOut />
          </button>
        </span>
      </section>
    </>
  );
};

export default Navbar;
