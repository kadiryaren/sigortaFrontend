import React from 'react'
import { useContext } from 'react';
import { useState,useEffect } from 'react'
import { MainContext } from '../contex';
import { useNavigate,Link} from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const {erisimKodu,setErisimKodu} = useContext(MainContext);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [durum,setDurum] = useState(true);
   

    const [submit,setSubmit] = useState();

    const changeUsername = (e) => {
        setUsername(e.target.value);
    };

    const changePassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    };

    const get_access_token = async () => {

        const response  = await fetch('http://127.0.0.1:5000/kullanici/giris/',{
            method: "POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                kullaniciAdi:username,
                sifre:password
            })
        })

        const access_token = await response.json();

        if(access_token.durum === "false"){
            setDurum(false)
        }
        else{
            setErisimKodu(access_token.erisimKodu);
            window.sessionStorage.setItem("erisimKodu",access_token.erisimKodu);
            window.sessionStorage.setItem("kullanici",username);
        }
    
    }


    useEffect(() => {
        if(erisimKodu != undefined){
            navigate("/home");
        }
    },[erisimKodu])

    useEffect(() => {
        console.log(durum);
    },[durum])

    useEffect(() => {
        console.log("test  ",window.sessionStorage.getItem("test"));
    },[])



  return (
    <div>
        <div>
            {/* navbar */}
            <div className="navbar bg-base-100 shadow">
                <div className="flex-none">
                    {/* <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button> */}
                    
                </div>
                <div className="flex-1">
                    <Link to="/home" className=" normal-case text-xl w-25 h-25 d-flex justify-content-start">
                <img className='w-50' src={ require('../assets/images/logo.jpeg') } alt="" />
                </Link>
                </div>
                <div className="flex-none">
                   
                </div>
            </div>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Toggle Button */}

                    <div className="container">
                        
                        <section className='h-screen'>
                            <div className="px-6 h-full text-gray-800">
                                <div
                                className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                                >
                       
                                <div
                                    className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                                >
                                    <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                    className="w-full"
                                    alt="Sample image"
                                    />
                                </div>
                                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                                    <form>
                    

                                

                                    {/* <!-- Email input --> */}
                                    <h1 className='text-2xl my-5'>
                                            <b>Giriş Yap</b>
                                        </h1>
                                    <div className="mb-6">
                                        <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="username"
                                        placeholder="Kullanici Adi"
                                        onChange={e => setUsername(e.target.value)}
                                        />
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="mb-6">
                                        <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="sifre"
                                        placeholder="Şifre"
                                        onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>

                                    

                                    <div className="text-center lg:text-left">
                                        {
                                                durum  === false ?  (
                                                    <div className="text-danger m-2">
                                                        Kullanici Adi veya Sifre Hatali
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )
                                                    
                                            
                                        }
                                        <button
                                        type="button"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        onClick={() => {get_access_token()}}
                                        >
                                        Giriş Yap
                                        </button>
                                        
                                    </div>
                                    </form>
                                </div>
                                </div>
                            </div>
                            </section>

                    </div>
                    
                </div> 
                
            </div>
        
        </div>
    </div>
  )
}
