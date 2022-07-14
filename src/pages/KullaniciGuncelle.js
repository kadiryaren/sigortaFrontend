import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';



export default function KullaniciGuncelle(props) {
    const {token,userId,erisimKodu} = useContext(MainContext);
    const [fetchedData,setFetchedData] = useState([]);
    const location = useLocation()
    const [guncelleData,setGuncelleData] = useState({});

    


    const fetchData = async () => {
        const response = await fetch("http://127.0.0.1:5000/kullanici/goster/tek/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                erisimKodu:erisimKodu,
                kullaniciId:userId
            })
        })

        
        const returnData = await response.json();
        await setFetchedData(returnData)

        

    };
    useEffect(() => {
        fetchData();
    },[])

    const initialData = {
        erisimKodu:erisimKodu,
        kullaniciId:userId,
        sifre:"",
        alacaklarDuzenle: fetchedData.alacaklarDuzenle,
        arsivKlasorleriDuzenle: fetchedData.arsivKlasorleriDuzenle,
        bireyselIslerDuzenle: fetchedData.bireyselIslerDuzenle,
        branslarDuzenle:fetchedData.branslarDuzenle,
        firmalarDuzenle:fetchedData.firmalarDuzenle,
        kayitlarGoruntule: fetchedData.kayitlarGoruntule,
        kullanicilarDuzenle:fetchedData.kullanicilarDuzenle,
        musterilerDuzenle:fetchedData.musterilerDuzenle,
        ortakIslerDuzenle:fetchedData.ortakIslerDuzenle,
        sigortaSirketleriDuzenle:fetchedData.sigortaSirketleriDuzenle,
        verilenlerDuzenle:fetchedData.verilenlerDuzenle
    };

    const update = async () => {
        const response = await fetch("http://127.0.0.1:5000/kullanici/guncelle/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(initialData)
        })

        
        const returnData = await response.json();
        await setFetchedData(returnData)

        

    };

    const guncelle = () => {
        if(initialData.sifre ===""){
            window.alert("Mutlaka bir sifre girmelisiniz!");
        }else{
            console.log("object");
            update();
        }
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
                   
                <div style={{"height":"15%",'fontSize':'30px'}} className="w-100 bg-success rounded d-flex justify-content-center align-items-center">Kullanici Adi</div>
                
                   <div className="form d-flex flex-column align-items-center">
                    <label htmlhtmlFor="">Sifre</label>
                    <input type="text" className='form-control' onChange={(e) => {initialData.sifre = e.target.value}} />
                    <br />
                    

                    <h1 style={{"fontSize":"30px"}}>Izinler</h1>

                    <label htmlhtmlFor="">alacaklarDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.alacaklarDuzenle} onChange={(e)=>{initialData.alacaklarDuzenle = e.target.checked}}/>

                    <label htmlhtmlFor="">arsivKlasorleriDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.arsivKlasorleriDuzenle} onChange={(e) => {initialData.arsivKlasorleriDuzenle = e.target.checked}}/>

                    <label htmlhtmlFor="">bireyselIslerDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.bireyselIslerDuzenle} onChange={(e)=>{initialData.bireyselIslerDuzenle = e.target.checked}} />

                    <label htmlhtmlFor="">branslarDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.branslarDuzenle} onChange={(e)=>{initialData.branslarDuzenle = e.target.checked}}/>

                    <label htmlhtmlFor="">firmalarDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.firmalarDuzenle} onChange={(e)=>{initialData.firmalarDuzenle = e.target.checked}}/>

                    <label htmlhtmlFor="">kayitlarGoruntule</label>
                    <input type="checkbox" defaultChecked={fetchedData.kayitlarGoruntule} onChange={(e)=>{initialData.kayitlarGoruntule = e.target.checked}}/>

                    <label htmlhtmlFor="">kullanicilarDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.kullanicilarDuzenle} onChange={(e)=>{initialData.kullanicilarDuzenle = e.target.checked}}/>

                    <label htmlhtmlFor="">musterilerDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.musterilerDuzenle} onChange={(e)=>{initialData.musterilerDuzenle = e.target.checked}}/>

                    <label htmlhtmlFor="">ortakIslerDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.ortakIslerDuzenle} onChange={(e)=>{initialData.ortakIslerDuzenle = e.target.checked}}/>

                    <label htmlhtmlFor="">sigortaSirketleriDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.sigortaSirketleriDuzenle} onChange={(e)=>{initialData.sigortaSirketleriDuzenle = e.target.checked}}/>

                    <label htmlhtmlFor="">verilenlerDuzenle</label>
                    <input type="checkbox" defaultChecked={fetchedData.verilenlerDuzenle} onChange={(e)=>{initialData.verilenlerDuzenle = e.target.checked}}/>

                    <button className='btn bg-green-200' onClick={guncelle}>Guncelle</button>
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
