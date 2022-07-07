import React, { useState } from 'react'
import { useEffect } from 'react'
import {  } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import { useNavigate } from "react-router-dom";
import SideBarLinks from '../components/SideBarLinks';



export default function TumKullanicilar() {
    const navigate = useNavigate();
    const {token,userId ,setUserId} = useContext(MainContext);

    const [fetchedData,setFetchedData] = useState([]);
    const click =  (id) => {
            
        setUserId(id);
        navigate("/kullanicilar/tek/");

    };

    const fetchData = async () => {
        const response = await fetch("http://127.0.0.1:5000/kullanici/goster/hepsi/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                erisimKodu:"e7644581-2584-4b58-ba60-73a48053ba8f"
            })
        })

        
        const returnData = await response.json();
        console.log(returnData);
        const processedData = [];
        for(let i = 1; i<Array.from(returnData.keys()).length;i++){
            processedData.push({
                kullaniciAdi: returnData[i].kullaniciAdi,
                
                clickEvent: () => click(returnData[i].id)
            });

            
        }

        //setFetchedData(processedData);

   

        const data = {
            columns:[
                {
                    label: 'Kullanıcı',
                    field: 'kullaniciAdi',
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
    
    console.log("tset");
    console.log(fetchedData);

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
                            <b style={{'font-size':'30px'}}>Kullanıcılar</b>
                        </h1>
                    </div>

                    <MDBDataTable
                        striped
                        bordered
                        hover
                    
                        data={fetchedData}
                        />

                </div>
                {/* {fetchedData.map((item) =>(
                    

                ) )} */}

                
                 
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