import React from 'react'
import {useNavigate} from "react-router-dom";
import { useEffect,useContext } from 'react';
import { MainContext } from '../contex';

export default function Bos() {
    const navigate = useNavigate();
    const {nextPage,setNextPage} = useContext(MainContext)
    useEffect(() => {
        if(nextPage !== ""){
            navigate(nextPage);
        }

    },[])
  return (
    <div></div>
  )
}
