import React, { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';

export default function TekArsiv(props) {
    const navigate = useNavigate();
    const {arsivKlasoruId,
        setarsivKlasoruId,
        arsivKlasoruAdi,
        erisimKodu,
        setarsivKlasoruAdi} = useContext(MainContext);
    const [fetchedData,setFetchedData] = useState([]);
    const location = useLocation()


   


    const sil = async () => {
        const response = await fetch("http://127.0.0.1:5000/arsiv/sil/",{
            method:"POST",
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                erisimKodu:erisimKodu,
                arsivKlasoruId:arsivKlasoruId
            })
        })

        const returnVAL = await response.json();
        console.log(returnVAL.durum);
        
    }
    

    const silClick = () => {
        if(window.confirm("Firma Silinecek Emin Misiniz?") == true){
            sil();
            navigate("/arsivler");

        }
    }

    const guncelle = () => {
        navigate("/arsiv/guncelle/");
    }

    return (
    <div>
        {/* navbar */}
        <div className="navbar bg-base-100 shadow">
            <div className="flex-none">
             
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label>
            </div>
            <div className="flex-1">
                <a href="/home" className="btn btn-ghost normal-case text-xl">Biçerer Sigorta</a>
            </div>
            <div className="flex-none">
            <a className='btn btn-error hover:text-white' href="/logout">Çıkış Yap</a>
            </div>
        </div>
        <div className="drawer ">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content w-screen h-screen flex flex-column  align-center">
                 {/* Toggle Button */}

                <div style={{'height':'100%'}} className="container mx-auto my-5 flex flex-col  items-center border-2 bg-gray-200">
                   
                <div style={{"height":"15%",'fontSize':'30px'}} className="w-100 bg-success rounded d-flex justify-content-center align-items-center">Firma Adi</div>
                <div className="d-flex w-100 h-100">
                    <div style={{'height':'100%'}} className="d-flex w-100 flex-column bg-danger justify-content-start align-items-center mt-5">
                        
                    </div>
                    <div style={{'height':'100%'}} className="d-flex w-100 flex-column justify-content-start align-items-center mt-5" > 
                    <h1 style={{'fontSize':'30px'}}>Islemler</h1>

                    <ul className='d-flex flex-column justify-content-center align-items-center mt-5'>
                        
                        <li  className='my-2'><a onClick={silClick} className='btn bg-red-500 text-black hover:bg-red-300 hover:text-white'>Sil</a></li>
                        <li  className='my-2'><a onClick={guncelle} className='btn bg-green-500 text-black hover:bg-green-300 hover:text-white'>Güncelle</a></li>
                    
                    </ul>
                    
                    </div>
                </div>
                   

                </div>
               
                
                 
            </div> 
            <div className="drawer-side ">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">

                <SideBarLinks></SideBarLinks>
                
                </ul>
            </div>  
        </div>

    </div>
  )
}
