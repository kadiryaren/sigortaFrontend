import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { MDBDataTable } from 'mdbreact';
import { MainContext, useContext } from '../contex'
import SideBarLinks from '../components/SideBarLinks';
import { useNavigate } from "react-router-dom";



export default function IsBireyselGuncelle(props) {
    const navigate = useNavigate();
   
    const {token,userId,setArsivId,isId,setIsId} = useContext(MainContext);
    const[initialData,setInitialData] = useState({
        erisimKodu:"8008827b-8d15-48a0-b52b-569155ae5702",
        arsivId: "",
        musteriId:"",
        bransId:"",
        sigortaSirketiId:"",
    
        plaka:"default Data",
        ruhsatSeriNo:"",
        policeNo:"",
        policeBitisTarihi:"1970-01-01",
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

        
        const data = await response.json();
        setFetchedData(data);


        setInitialData({
            ...initialData,
            plaka: data.islerBireysel.filter((item) => {return item.id === isId })[0].plaka,
            ruhsatSeriNo: data.islerBireysel.filter((item) => {return item.id === isId })[0].ruhsatSeriNo,
            policeNo: data.islerBireysel.filter((item) => {return item.id === isId })[0].policeNo,
            policeBitisTarihi: data.islerBireysel.filter((item) => {return item.id === isId })[0].policeBitisTarihi

        })
        
    };

    const postData = async () => {
        const response = await fetch("http://127.0.0.1:5000/is/bireysel/guncelle/",{
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

 



 const guncelle = () => {
    postData();
    console.log("initial Data");
    console.log(initialData);
    setArsivId(initialData["arsivId"]);
    navigate("/is/bireysel");
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
                   
                   
                        <label htmlFor="musteriler">Musteriler</label>
                        {/* initialData["musteriler"] = e.target.value */}
                        <select onChange={(e) => {initialData["musteriId"] = e.target.value}}  id="musteriler" name="musteriler">
                            {  
                                    fetchedData["musteriler"].map((musteriler)=>{

                                        if(fetchedData["islerBireysel"].filter((item) => {return item.id === isId})[0].musteriId === musteriler["id"]){
                                        
                                            initialData["musteriId"] = musteriler["id"];
                                            return (<option key={musteriler["id"]}  value={"" + musteriler["id"]} selected>{musteriler["ad"]}</option>)
                                        }else{
                         
                                            
                                            return (<option key={musteriler["id"]} value={"" + musteriler["id"]}>{musteriler["ad"]}</option>)
                                        }
                                        
                                    })
                                
                            }  
                        </select>

                        <label htmlFor="branslar">Branslar</label>
                        <select  onChange={(e) => {initialData["bransId"] = e.target.value }}  id="branslar" name="branslar">
                            
                            {
                            
                                    fetchedData["branslar"].map((branslar)=>{
                                        if(fetchedData["islerBireysel"].filter((item) => {return item.id === isId})[0].bransId  === branslar["id"]){
                                            initialData["bransId"] = branslar["id"];
                                            return (<option key={branslar["id"]} value={"" + branslar["id"]} selected>{branslar["ad"]}</option>)
                                        }else{
                                            return (<option key={branslar["id"]} value={"" + branslar["id"]}>{branslar["ad"]}</option>)
                                        }
                                        
                                    })
                                
                            }  
                        </select>

                        <label htmlFor="arsivKlasorleri">Arsiv Klasorleri</label>
                        <select  onChange={(e) => {initialData["arsivId"] = e.target.value }}  id="arsivId" name="arsivId">
                            
                            {
                                    fetchedData["arsivKlasorleri"].map((arsivKlasorleri)=>{
                                        if(fetchedData["islerBireysel"].filter((item) => {return item.id === isId})[0].arsivId === arsivKlasorleri["id"]){
                                            initialData["arsivId"] = arsivKlasorleri["id"];
                                            return (<option key={arsivKlasorleri["id"]} selected="selected" value={"" + arsivKlasorleri["id"]}>{arsivKlasorleri["ad"]}</option>)
                                        }
                                        return (<option key={arsivKlasorleri["id"]} value={"" + arsivKlasorleri["id"]}>{arsivKlasorleri["ad"]}</option>)
                                    })
                                
                            }  
                        </select>


                        <label htmlFor="sigortaSirketleri">Sigorta Sirketleri</label>
                        <select onChange={(e) => {initialData["sigortaSirketiId"] = e.target.value }}   id="sigortaSirketleri" name="sigortaSirketleri">
                            
                            {
                            
                                    fetchedData["sigortaSirketleri"].map((sigortaSirketleri)=>{
                                        if(fetchedData["islerBireysel"].filter((item) => {return item.id === isId})[0].sigortaSirketiId === sigortaSirketleri["id"]){
                                            initialData["sigortaSirketiId"] = sigortaSirketleri["id"];
                                            return (<option key={sigortaSirketleri["id"]} selected="selected" value={"" + sigortaSirketleri["id"]}>{sigortaSirketleri["ad"]}</option>)
                                        }else{

                                            return (<option key={sigortaSirketleri["id"]} value={"" + sigortaSirketleri["id"]}>{sigortaSirketleri["ad"]}</option>)
                                        }
                                    })
                                
                            }  
                        </select>

                        <label htmlFor="plaka">Plaka</label>
                        <input onChange={(e) => {initialData["plaka"] = e.target.value }} placeholder={initialData.plaka}   type="text" name="plaka"  />

                        <br />
                        <label htmlFor="ruhsatSeriNo">Ruhsat Seri No</label>
                        <input  type="text" onChange={(e) => {initialData["ruhsatSeriNo"] = e.target.value }} placeholder={initialData.ruhsatSeriNo}  name="ruhsatSeriNo" />
                            <br />
                 
                        <label htmlFor="policeNo">Police No</label>
                        <input onChange={(e) => {initialData["policeNo"] = e.target.value }} placeholder={initialData.policeNo}  type="text" name="policeNo"  />
                        <br />
                            
                        <label htmlFor="policeBitisTarihi">Police Bitis Tarih</label>
                        <input onChange={(e) => {initialData["policeBitisTarihi"] = e.target.value }} value={initialData.policeBitisTarihi} type="date" name="policeBitisTarihi"  />






                    
                    {/* <button onClick={() => {guncelle()}} className='btn bg-green-200' >Guncelle</button> */}
                    <button onClick={guncelle} className='btn bg-green-200' >Guncelle</button>
                
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
