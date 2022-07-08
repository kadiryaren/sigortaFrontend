import React, { useState } from 'react'
import { useEffect } from 'react'
import {  } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import { useNavigate } from "react-router-dom";
import SideBarLinks from '../components/SideBarLinks';



export default function Musteriler() {
    const navigate = useNavigate();
    
    const {musteriId,setMusteriId, musteriData,
        setMusteriData} = useContext(MainContext);

        const[rowSelected,setRowSelected] = useState(false);

    const [fetchedData,setFetchedData] = useState([]);
    const click =  (id,musteriData) => {
        setRowSelected(true);
        setMusteriId(id);
        setMusteriData(musteriData);
        
        navigate("/musteri/tek");

    };

    const fetchData = async () => {
        const response = await fetch("http://127.0.0.1:5000/musteri/goster/hepsi/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                erisimKodu:"8008827b-8d15-48a0-b52b-569155ae5702"
            })
        })

        
        const returnData = await response.json();
        console.log(returnData);
        const processedData = [];
        for(let i = 1; i<Array.from(returnData.keys()).length;i++){
            processedData.push({
                ad: returnData[i].ad,
                soyad: returnData[i].soyad,
                tc:returnData[i].tc,
                telefon:returnData[i].telefon,
                
                clickEvent: () => click(returnData[i].id,{
                    ad: returnData[i].ad,
                    soyad: returnData[i].soyad,
                    tc:returnData[i].tc,
                    telefon:returnData[i].telefon
                })
            });

            
        }


        const data = {
            columns:[
                {
                    label: 'Musteri Adi',
                    field: 'ad',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Soyad',
                    field: 'soyad',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'TC Kimlik',
                    field: 'tc',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Telefon',
                    field: 'telefon',
                    sort: 'asc',
                    width: 150
                }
               
               
            ],
            rows: processedData
             
        }

        await setFetchedData(data);

    };

    
    useEffect(() => {
        fetchData();
    },[])
    


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
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                 {/* Toggle Button */}

                <div className="container my-5">
                    <div className="flex justify-center align-center">
                        <h1>
                            <b style={{'fontSize':'30px'}}>Musteriler</b>
                        </h1>
                    </div>

                 
                   

                    <MDBDataTable
                        striped
                        bordered
                        hover
                    
                        data={fetchedData}
                        />

                       

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
