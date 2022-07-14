import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';
import { useNavigate } from "react-router-dom";



export default function IsOrtakEkle(props) {
    const navigate = useNavigate();
    const [tumFirmalar,setTumFirmalar] = useState([])
   
    const {token,userId,setArsivId,isId,setIsId,erisimKodu} = useContext(MainContext);
    const[initialData,setInitialData] = useState({
        erisimKodu:erisimKodu,
        arsivId: "",
        musteriId:"",
        bransId:"",
        sigortaSirketiId:"",
        plaka:"default Data",
        ruhsatSeriNo:"",
        policeNo:"",
        firmaId:"",
        policeBitisTarihi:"1970-01-01",
        komisyonOraniKendisi:0,
        isId:isId
    })
    
    const [fetchedData,setFetchedData] = useState({
        "musteriler":[],
        "sigortaSirketleri":[],
        "branslar":[],
        "arsivKlasorleri":[],
        "islerBireysel":[]
    });

    
    const getAllData = async () => {
        const response = await fetch("http://127.0.0.1:5000/goster/hepsi/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(initialData)
        })

        const firmaResponse = await fetch("http://127.0.0.1:5000/firma/goster/hepsi/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(initialData)
        })

        
        const data = await response.json();
        setFetchedData(data);
        const firmalar = await firmaResponse.json();
        setTumFirmalar(firmalar);


     

        setInitialData({
            ...initialData,
            plaka: "",
            ruhsatSeriNo: "",
            policeNo: "",
            komisyonOraniFirma : "",
            firmaId: "",
            policeBitisTarihi: ""
        });


  
        
        
    };

    const ekle = async () => {
        const response = await fetch("http://127.0.0.1:5000/is/ortak/ekle/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(initialData)
        })       

        
        

    };
   


useEffect(() => {
    getAllData();
    
 },[]);

 const ekleClick = () => {
    setInitialData({
        ...initialData,
        komisyonOraniKendisi: (100-initialData.komisyonOraniFirma)
    });
    ekle();
 
    setArsivId(initialData["arsivId"]);
    navigate("/is/ortak");
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
            
            <div className="drawer-content w-screen h-screen flex flex-column  align-center">
                 {/* Toggle Button */}

                <div style={{'height':'100%'}} className="container mx-auto my-5 flex flex-col  items-center border-2 bg-gray-200">
                   
                <div style={{"height":"15%",'fontSize':'30px'}} className="w-100 bg-success rounded d-flex justify-content-center align-items-center">Bireysel Is Ekle</div>
                
                   <div className="form d-flex flex-column align-items-center">
                   
                   
                        <div className="d-flex justify-content-center align-items-center w-100">
                        <div className="m-3">
                            <label htmlFor="musteriler">Musteriler</label>
                            {/* initialData["musteriler"] = e.target.value */}
                            <select onChange={(e) => {initialData["musteriId"] = e.target.value}}  id="musteriler" name="musteriler">
                                {  
                                        fetchedData["musteriler"].map((musteriler)=>{
                                                return (<option key={musteriler["id"]} value={"" + musteriler["id"]}>{musteriler["ad"]}</option>)
                                        })
                                    
                                }  
                            </select>
                        </div>

                        <div className="m-3">
                            <label htmlFor="firmaAdi">Firma</label>
                            <select  onChange={(e) => {initialData["firmaId"] = e.target.value }}  id="firmaId" name="firmaId">
                                
                                {
                                
                                        tumFirmalar.map((firma)=>{
                                            
                                            if(!("durum" in firma)){
                                                return (<option key={firma["id"]} value={"" + firma["id"]}>{firma["ad"]}</option>)
                                            }
                                        })
                                    
                                }  
                            </select>
                        </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center w-100">
                            <div className="m-3">

                                <label htmlFor="arsivKlasorleri">Arsiv Klasorleri</label>
                                <select  onChange={(e) => {initialData["arsivId"] = e.target.value }}  id="arsivId" name="arsivId">
                                    
                                    {
                                            fetchedData["arsivKlasorleri"].map((arsivKlasorleri)=>{
                                               return (<option key={arsivKlasorleri["id"]} value={"" + arsivKlasorleri["id"]}>{arsivKlasorleri["ad"]}</option>)
                                            })
                                        
                                    }  
                                </select>
                            </div>
                            <div className="m-3">
                                <label htmlFor="branslar">Branslar</label>
                                <select  onChange={(e) => {initialData["bransId"] = e.target.value }}  id="branslar" name="branslar">
                                    
                                    {
                                    
                                            fetchedData["branslar"].map((branslar)=>{  
                                                return (<option key={branslar["id"]} value={"" + branslar["id"]}>{branslar["ad"]}</option>) 
                                            })
                                        
                                    }  
                                </select>
                            </div>

                        
                        </div>


                        <label htmlFor="sigortaSirketleri">Sigorta Sirketleri</label>
                        <select onChange={(e) => {initialData["sigortaSirketiId"] = e.target.value }}   id="sigortaSirketleri" name="sigortaSirketleri">
                            
                            {
                            
                                    fetchedData["sigortaSirketleri"].map((sigortaSirketleri)=>{
                                            return (<option key={sigortaSirketleri["id"]} value={"" + sigortaSirketleri["id"]}>{sigortaSirketleri["ad"]}</option>)
                                    })
                                
                            }  
                        </select>

                        <label htmlFor="plaka">Plaka</label>
                        <input onChange={(e) => {initialData["plaka"] = e.target.value }} placeholder={initialData.plaka}   type="text" name="plaka"  />

                        <br />
                        <label htmlFor="ruhsatSeriNo">Ruhsat Seri No</label>
                        <input  type="text" onChange={(e) => {initialData["ruhsatSeriNo"] = e.target.value }} placeholder={initialData.ruhsatSeriNo}  name="ruhsatSeriNo" />
                        
                        <br />
                        
                        

                        <label htmlFor="komisyonOraniFirma">Firma Komisyon</label>
                        <input  type="text" onChange={(e) => {
                            initialData["komisyonOraniFirma"] = e.target.value;
                            try{
                                initialData["komisyonOraniKendisi"] = 100-e.target.value;
                            }
                            catch(e){
                                alert("komisyon orani metinsel ifade olamaz!");
                            }
                            
                         }} placeholder={initialData.komisyonOraniFirma}  name="komisyonOraniFirma" />
                        
                        <br />
                        
                 
                        <label htmlFor="policeNo">Police No</label>
                        <input onChange={(e) => {initialData["policeNo"] = e.target.value }} placeholder={initialData.policeNo}  type="text" name="policeNo"  />
                        <br />
                            
                        <label htmlFor="policeBitisTarihi">Police Bitis Tarih</label>
                        <input onChange={(e) => {initialData["policeBitisTarihi"] = e.target.value }} value={initialData.policeBitisTarihi} type="date" name="policeBitisTarihi"  />

                    <button onClick={ekleClick} className='btn bg-green-200' >Ekle</button>
                
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
