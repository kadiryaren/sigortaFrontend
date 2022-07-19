import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import { useNavigate } from "react-router-dom";
import SideBarLinks from '../components/SideBarLinks';



export default function Firmalar() {
    const navigate = useNavigate();
    const {token,userId ,setUserId,firmaId,setFirmaId,firmaAdi,setFirmaAdi,erisimKodu} = useContext(MainContext);

    const [fetchedData,setFetchedData] = useState([]);
    const click =  (id,firmaName) => {
            
        setFirmaId(id);
        setFirmaAdi(firmaName);
        navigate("/is/ortak/firma");

    };

    const fetchData = async () => {
        const response = await fetch("http://127.0.0.1:5000/firma/goster/hepsi/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                erisimKodu:erisimKodu,
            })
        });

        
        const returnData = await response.json();
        console.log(returnData);
        const processedData = [];
        for(let i = 1; i<Array.from(returnData.keys()).length;i++){
            processedData.push({
                ad: returnData[i].ad,
                
                clickEvent: () => click(returnData[i].id,returnData[i].ad)
            });

            
        }

        //setFetchedData(processedData);

   

        const data = {
            columns:[
                {
                    label: 'Firma Adi',
                    field: 'ad',
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
               <Link to="/home" className=" normal-case text-xl w-25 h-25 d-flex justify-content-start">
                <img className='w-50' src={ require('../assets/images/logo.jpeg') } alt="" />
                </Link>
            </div>
            <div className="flex-none">
               <Link className='btn btn-error hover:text-white' to="/logout">Çıkış Yap</Link>
            </div>
        </div>
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                 {/* Toggle Button */}

                <div className="container text-center my-5">
                    <div className="flex flex-column justify-center align-center">
                        <h1>
                            <b style={{'fontSize':'30px'}}>Firmalar</b>
                        </h1>
                        
                    
                        <div className='mt-3'>
                        <Link
							to="/firma/ekle/ "
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
