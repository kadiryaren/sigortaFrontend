import React, { useState,useEffect } from 'react'
import { useContext } from 'react';
import { MainContext } from '../contex';
import { MDBDataTable } from 'mdbreact';
import { useNavigate } from 'react-router-dom';


export default function AlacakGoster(props) {
    const navigate = useNavigate();
    const [tableData,setTableData] = useState({});
    const{isId,setAlacakId} = useContext(MainContext);
    const click =  (alacakId) => {
        setAlacakId(alacakId);
        navigate("/is/ortak/arsiv/tek");
    };


    const getAlacaklar = async () => {

        const response = await fetch("http://127.0.0.1:5000/alacaklar/goster/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                erisimKodu: "8008827b-8d15-48a0-b52b-569155ae5702",
                isId:isId,
                isTuru: props.isTuru
            })
        })
        
        const returnData = await response.json();
        console.log("return data ");
        console.log(returnData);
        const processedData = [];
        for(let i = 1; i<Array.from(returnData.keys()).length;i++){
            processedData.push({
                musteriAdi: returnData[i].musteriAdi,
                aciklama : returnData[i].aciklama,
                miktar : returnData[i].miktar,
                tarih : returnData[i].tarih,
                clickEvent: () => click(returnData[i].id)
            });

            
        }

   


        const data = {
            columns:[
                {
                    label: 'Aciklama',
                    field: 'aciklama',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Miktar',
                    field: 'miktar',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Tarih',
                    field: 'tarih',
                    sort: 'asc',
                    width: 150
                }
               
            ],
            rows: processedData
        }

        setTableData(data);
    }

    useEffect(() => {
        getAlacaklar();
    }, [])
    

  return (
    <div>
        <MDBDataTable
                        striped
                        bordered
                        hover
                    
                        data={tableData}
                        />
    </div>
  )
}
