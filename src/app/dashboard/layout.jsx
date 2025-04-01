'use client'
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useState } from "react";

const DashboardLayout =({ children })=>{

    const [openSidebar, setOpenSidebar] = useState(true)
  return (
    <div className="overflow-hidden h-screen">
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      <div className="flex">
        <asid className={`w-64 relative shaddow-md transform transition-all duration-300 ease-in-out 
            ${openSidebar ? 'left-0' : 'left[-16rem]' }`}>
            <Sidebar openSidebar={openSidebar} />
        </asid>
        <main className={`p-4 bg-[#f7f7fc] overflow-y-scroll h-[90vh] transform transition-all ease-in-out duration-300 
        ${openSidebar ? 'left-0 w-full' : 'absolute w-full' }`}>{children}</main>
      </div>
    </div>
  );
}
export default DashboardLayout