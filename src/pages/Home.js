import React from 'react'
import { useEffect } from 'react'
import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';


export default function Home() {
    const {token,setToken,basePath,setBasePath} = useContext(MainContext);


    


    return (
    <div>
        {/* navbar */}
        <div className="navbar bg-base-100 shadow">
            <div className="flex-none">
              
                <label for="my-drawer" className="btn btn-square btn-ghost drawer-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Biçerer Sigorta</a>
            </div>
            <div className="flex-none">
            <button class="btn btn-success"><a href="/login" className="link link-hover">Giriş Yap</a></button>
            </div>
        </div>
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                 {/* Toggle Button */}

                <div className="container">
                    <div className="flex justify-center align-center my-5">
                        <img src={ require('../assets/images/mainPhoto.jpeg') } alt="" />
                    </div>
                </div>
                 
            </div> 
            <div className="drawer-side ">
                <label for="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <SideBarLinks></SideBarLinks>
                
                
                </ul>
            </div>  
        </div>
      
    </div>
  )
}
