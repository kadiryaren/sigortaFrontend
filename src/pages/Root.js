import React from 'react'
import { useEffect } from 'react'
import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';
import { Link,useNavigate } from 'react-router-dom';


export default function Root() {
    const navigate = useNavigate();
    const {token,setToken,basePath,setBasePath, userId} = useContext(MainContext);
    useEffect(()=>{
        navigate("/login");
    },[])

    return (
        <></>
    // <div>
    //     {/* navbar */}
    //     <div className="navbar bg-base-100 shadow">
    //         <div className="flex-none">
              
               
    //         </div>
    //         <div className="flex-1">
    //             <Link to="/home" className=" normal-case text-xl w-25 h-25 d-flex justify-content-start">
    //             <img className='w-50' src={ require('../assets/images/logo.jpeg') } alt="" />
    //             </Link>
    //         </div>
    //         <div className="flex-none">
    //         <button className="btn btn-success"><a href="/login" className="link link-hover">Giriş Yap</a></button>
    //         </div>
    //     </div>
    //     <div className="drawer">
    //         <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    //         <div className="drawer-content">
    //              {/* Toggle Button */}

    //             <div className="container d-flex justify-content-center align-items-center">
    //                 <h1>Sigorta Programi Root Sayfasi</h1>
    //             </div>
                 
    //         </div> 
    //         <div className="drawer-side ">
    //             <label htmlFor="my-drawer" className="drawer-overlay"></label>
    //             <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content flex align-center">
    //                 <SideBarLinks></SideBarLinks>
                
                
    //             </ul>
    //         </div>  
    //     </div>
       

      
    // </div>
  )
}
