import React from 'react'
import { useEffect } from 'react';
import { MainContext,useContext } from '../contex'

export default function CikisYap() {

    const{setToken} = useContext(MainContext);
    useEffect(() => {

        setToken(false);
        window.location.href='/login';

    },[]);


  return (
    <div>

    </div>
  )
}
