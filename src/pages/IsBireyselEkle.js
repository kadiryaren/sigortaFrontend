import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';
import { useNavigate } from "react-router-dom";



export default function IsBireyselEkle(props) {
    const navigate = useNavigate();
    const data = [1,2,3,4,5];
    const {token,userId} = useContext(MainContext);
    const [fetchedData,setFetchedData] = useState({
        "musteriler":[]
    });

    const [guncelleData,setGuncelleData] = useState({});

    

    const initialData = {
        erisimKodu:"8008827b-8d15-48a0-b52b-569155ae5702"
    };

    const getAllData = async () => {
        const response = await fetch("http://127.0.0.1:5000/goster/hepsi/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(initialData)
        })

        
        const returnData = await response.json();
        setFetchedData(returnData);
        
    };


useEffect(() => {
    getAllData();
 },[]);


 useEffect(() => {
    console.log(fetchedData);
 },[fetchedData]);



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
                   
                <div style={{"height":"15%",'fontSize':'30px'}} className="w-100 bg-success rounded d-flex justify-content-center align-items-center">Kullanici Adi</div>
                
                   <div className="form d-flex flex-column align-items-center">
                   
                   <label htmlFor="cars">Musteri</label>
                    <select id="musteri" name="musteri">
                        <option value="volvo">Volvo</option>
                        
                    </select>
                    <button className='btn bg-green-200' >Ekle</button>
                    {
                            
                            useEffect(() => {
                                fetchedData["musteriler"].forEach((item) => {
                                    <h1>{item}</h1>
                                });
                             },[fetchedData])
                            
                        }
                    
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
