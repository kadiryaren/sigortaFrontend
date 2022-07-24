import React, { useState } from 'react'
import { useEffect } from 'react'

import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import { useNavigate,Link } from "react-router-dom";
import SideBarLinks from '../components/SideBarLinks';



export default function Borclular() {
    const navigate = useNavigate();
    
    const {musteriId,setMusteriId, musteriData,erisimKodu,setNextPage,
        setMusteriData} = useContext(MainContext);

        const[rowSelected,setRowSelected] = useState(false);

    const [fetchedData,setFetchedData] = useState([]);
    const click =  (id,musteriData) => {
        setRowSelected(true);
        setMusteriId(id);
        setMusteriData(musteriData);
        
        setNextPage("/is/musteri");
        navigate("/bos");

    };

    useEffect(() => {
        console.log("musteri id --> ",musteriId);
    },[musteriId]);

    const fetchData = async () => {
        const response = await fetch("http://127.0.0.1:5000/borclular/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                erisimKodu: window.sessionStorage.getItem("erisimKodu")
            })
        })

        
        const returnData = await response.json();
        console.log(returnData);
        const processedData = [];
        for(let i = 0; i<Array.from(returnData.borclular.keys()).length;i++){
            processedData.push({
                ad:returnData.borclular[i].ad,
                borc: returnData.borclular[i].borc,
                tc:returnData.borclular[i].tc,
                telefon:returnData.borclular[i].telefon,
                
                clickEvent: () => click(returnData.borclular[i].musteriId,{
                    ad: returnData.borclular[i].ad,
                    borc: returnData.borclular[i].borc,
                    tc:returnData.borclular[i].tc,
                    telefon:returnData.borclular[i].telefon
                })
            });

            
        }


        const data = {
            columns:[
                {
                    label: 'Ad',
                    field: 'ad',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Borc',
                    field: 'borc',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Tc/Vergi No',
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
               <Link to="/home" className=" normal-case text-xl w-25 h-25 d-flex justify-content-start">
                <img className='w-50' src={ require('../assets/images/logo.jpeg') } alt="" />
                </Link>
            </div>
            <div className="flex-none">
               <a className='btn btn-error hover:text-white' to="/logout">Çıkış Yap</a>
            </div>
        </div>
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                 {/* Toggle Button */}

                <div className="container text-center my-5">
                    <div className="flex flex-column justify-center align-center">
                        <h1>
                            <b style={{'fontSize':'30px'}}>BORÇLULAR</b>
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
