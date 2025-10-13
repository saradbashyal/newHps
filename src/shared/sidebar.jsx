import React, { useState } from "react";
import { House,Stethoscope,HeartPulse,Hospital,ClipboardClock,Users,Settings2,ShieldUser,UserRound,PanelRightOpen,PanelRightClose } from 'lucide-react'
import { NavLink } from "react-router-dom";
const Sidebar = () => {

    const [open,setOpen] = useState(true)

  const links = [
    { name: "Dashboard", icon: <House />, path: "/dashboard" },
    { name: "Services", icon: <HeartPulse />, path: "/services" },
    { name: "Hospitals", icon: <Hospital />, path: "/hospitals" },
    { name: "Doctors", icon: <Stethoscope />, path: "/doctors" },
    { name: "Appointments", icon: <ClipboardClock />, path: "/Appointments" },
    { name: "Patients", icon: <Users />, path: "/Patients" },
    { name: "Category", icon: <Settings2 />, path: "/Category" },
    { name: "Security", icon: <ShieldUser />, path: "/Security" },
    { name: "Profile", icon: <UserRound />, path: "/Profile" },
  ];

  return (
    <>
      <section>
        <div className={`${open?"w-64":"w-20"}bg-gray-300 min-h-screen transition-all duration-300`}>
            <div className='flex items-center justify-between p-4 border-b border-gray-700'>
                <h1 className={`${!open&& "hidden"}`}>
                    HealthCare
                </h1>
                <button onClick={()=>setOpen(!open)}>
                    {open?<PanelRightOpen/>:<PanelRightClose/>}
                </button>
            </div>
            <div>
                <nav>
          {links.map((link)=>(
            <NavLink key={link.name} to={link.path} className={({isActive})=>(
              `flex items-center gap-3 p-3 mx-3 rounded-lg hover:bg-gray-500 transition-colors ${
                    isActive ? "bg-gray-800" : ""}`
            )}>
              <span className='w-6 h-6'>{link.icon}</span>
              <span className={`${!open && "hidden"} text-sm font-medium`}>{link.name}</span>
            </NavLink>
          ))}
        </nav>
            </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
