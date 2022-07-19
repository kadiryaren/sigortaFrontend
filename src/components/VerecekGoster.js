import React, { useState,useEffect } from 'react'
import { useContext } from 'react';
import { MainContext } from '../contex';
import { MDBDataTable } from 'mdbreact';
import { useNavigate } from 'react-router-dom';


export default function VerecekGoster(props) {

    const navigate = useNavigate();
    const [tableData2,setTableData2] = useState({});
    const{isId,setVerecekId,erisimKodu} = useContext(MainContext);
    const click =  (verecekId) => {
        setVerecekId(verecekId);
        navigate("/verecek");
    };


    const getVerecekler = async () => {

        const response = await fetch("http://127.0.0.1:5000/verecekler/goster/",{
            method:"POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                erisimKodu: window.sessionStorage.getItem("erisimKodu"),
                isId:isId,
                isTuru: props.propIsTuru
            })
        })
        
        const returnData = await response.json();
        console.log("verecek Calisti");
        const processedData2 = [];
        for(let i = 1; i<Array.from(returnData.keys()).length;i++){
            processedData2.push({
                musteriAdi: returnData[i].musteriAdi,
                aciklama : returnData[i].aciklama,
                miktar : returnData[i].miktar,
                tarih : returnData[i].tarih,
                clickEvent: () => click(returnData[i].id)
            });

            
        }

   


        const data2 = {
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
            rows: processedData2
        }

        setTableData2(data2);
    }

    useEffect(() => {
        getVerecekler();
    }, [])
    

  return (
    <div>
        <MDBDataTable
                        striped
                        bordered
                        hover
                    
                        data={tableData2}
                        />
    </div>
  )
}
