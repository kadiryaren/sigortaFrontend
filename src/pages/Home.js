import React from 'react'
import { useEffect } from 'react'
import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';
import {Link} from "react-router-dom";

export default function Home() {
    const {token,setToken,basePath,setBasePath, userId,erisimKodu} = useContext(MainContext);

    useEffect(() => {

        console.log("erisimKodu : " +  window.sessionStorage.getItem("erisimKodu"));

    },[])
    


    return (
    <div>
        {/* navbar */}
        <div className="navbar bg-base-100 shadow">
            <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label>
               
            </div>
            <div className="flex-1">
                <Link to="/home" className=" normal-case text-xl w-25 h-25 d-flex justify-content-start">
                <img className='w-50' src={ require('../assets/images/logo.jpeg') } alt="" />
                </Link>
            </div>
            <div className="flex-none">
                {
                    window.sessionStorage.getItem("erisimKodu") == "undefined" ? (
                       <Link to="/login" className="link link-hover btn btn-success">Giriş Yap</Link>
                    ):(
                        <Link to="/logout" className="link link-hover btn bg-red-700">Cikis Yap</Link>
                    )
                }
               
            </div>
        </div>
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                 {/* Toggle Button */}

                <div className="container">
                    <div className="flex justify-center align-center my-2">
                        <img src={ require('../assets/images/mainPhoto.jpeg') } alt="" />
                    </div>
                    <div className="flex justify-center align-center my-2">
                        <img src={ require('../assets/images/mainPhoto2.jpg') } alt="" />
                    </div>
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
