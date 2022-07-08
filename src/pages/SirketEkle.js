import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';
import { useNavigate } from "react-router-dom";



export default function SirketEkle(props) {
    const navigate = useNavigate();
   


    const initialData = {
        erisimKodu:"e57d111c-a1cf-4d6c-a814-fccb5e538a9f",
        sigortaSirketiAdi:"",
        fotograf:""
    };

    const ekle = async () => {
        const response = await fetch("http://127.0.0.1:5000/sirket/ekle/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(initialData)
        })

        
        const returnData = await response.json();


        

    };

    const ekleClick = () => {
        
            ekle();
            navigate("/sirketler");
       
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    const encodePhoto = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        initialData.fotograf = base64;
    };


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
                   
                <div style={{"height":"15%",'fontSize':'30px'}} className="w-100 bg-success rounded d-flex justify-content-center align-items-center">Sigorta Sirket Adi</div>
                
                   <div className="form d-flex flex-column align-items-center">
                    <label htmlhtmlFor="">Sirket Adi</label>
                    <input type="text" className='form-control' onChange={(e) => {initialData.sigortaSirketiAdi = e.target.value}} />
                    <br />
                    <label htmlhtmlFor="">Sirket Resmi</label>
                  
                    <input type="file" className='form-control' onChange={(e) => {encodePhoto(e)}} />

                    <button className='btn bg-green-200' onClick={ekleClick}>Ekle</button>
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
