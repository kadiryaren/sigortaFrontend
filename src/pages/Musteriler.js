import React, { useState } from 'react'
import { useEffect } from 'react'

import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import { useNavigate,Link } from "react-router-dom";
import SideBarLinks from '../components/SideBarLinks';



export default function Musteriler() {
    const navigate = useNavigate();
    
    const {musteriId,setMusteriId, musteriData,erisimKodu,
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
                erisimKodu: window.sessionStorage.getItem("erisimKodu")
            })
        })

        
        const returnData = await response.json();
        console.log(returnData);
        const processedData = [];
        for(let i = 1; i<Array.from(returnData.keys()).length;i++){
            processedData.push({
                id:returnData[i].id,
                ad: returnData[i].ad,
                soyad: returnData[i].soyad,
                tc:returnData[i].tc,
                telefon:returnData[i].telefon,
                
                clickEvent: () => click(returnData[i].id,{
                    ad: returnData[i].ad,
                    soyad: returnData[i].soyad,
                    tc:returnData[i].tc,
                    telefon:returnData[i].telefon,
                    dogumTarihi:returnData[i].dogumTarihi,
                    mailAdresi:returnData[i].mailAdresi
                })
            });

            
        }


        const data = {
            columns:[
                {
                    label: 'Id',
                    field: 'id',
                    sort: 'asc',
                    width: 150
                },
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
                    label: 'TC/Vergi No',
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
					
					<span className="btn bg-green-500 hover:bg-green-500 mx-3 text-black"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>{window.sessionStorage.getItem("kullanici")}</span>
                    <Link to="/logout" className="link link-hover btn bg-red-700 text-white hover:bg-red-500">Cikis Yap</Link>
                           
				</div>
        </div>
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                 {/* Toggle Button */}

                <div className="container text-center my-5">
                    <div className="flex flex-column justify-center align-center">
                        <h1>
                            <b style={{'fontSize':'30px'}}>M????TER??LER</b>
                        </h1>
                        
                    
                        <div className='mt-3'>
                        <Link
                            to="/musteri/ekle/ "
                            className=" btn text-black  bg-green-200 hover:bg-green-500 hover:text-white"
                        >
                            Ekle
                        </Link>
                        </div>
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
