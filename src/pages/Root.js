import React from 'react'
import { useEffect } from 'react'
import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';


export default function Root() {
    const {token,setToken,basePath,setBasePath, userId} = useContext(MainContext);


    


    return (
    <div>
        {/* navbar */}
        <div className="navbar bg-base-100 shadow">
            <div className="flex-none">
              
               
            </div>
            <div className="flex-1">
                <a href="/home" className="btn btn-ghost normal-case text-xl">Biçerer Sigorta</a>
            </div>
            <div className="flex-none">
            <button className="btn btn-success"><a href="/login" className="link link-hover">Giriş Yap</a></button>
            </div>
        </div>
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                 {/* Toggle Button */}

                <div className="container d-flex justify-content-center align-items-center">
                    <h1>Sigorta Programi Root Sayfasi</h1>
                </div>
                 
            </div> 
            <div className="drawer-side ">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content flex align-center">
                    <SideBarLinks></SideBarLinks>
                
                
                </ul>
            </div>  
        </div>
       

      
    </div>
  )
}
