import React, { useState } from "react";
import { useEffect,useContext } from "react";
import { Navigate, useLocation,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";

export default function TekMusteri(props) {
	const navigate = useNavigate();
	const { musteriId, setMusteriId, erisimKodu, musteriData, setMusteriData,setNextPage } =
		useContext(MainContext);
	const [fetchedData, setFetchedData] = useState([]);
	const location = useLocation();

	const fetchUserData = async () => {
	    const response = await fetch("http://127.0.0.1:5000/musteri/goster/tek/",{
	        method:"POST",
	        mode:"cors",
	        headers:{
	            'Content-Type':'application/json'
	        },
	        body: JSON.stringify({
	            erisimKodu:erisimKodu,
				musteriId:musteriId
	        })
	    })

	    const returnData = await response.json();
	    console.log(returnData);
	    const processedData = [];

		processedData.push({
			ad: returnData.ad,
			soyad:returnData.soyad,
			tc: returnData.tc,
			telefon:returnData.telefon,
			mailAdresi: returnData.mailAdresi,
			dogumTarihi: returnData.dogumTarihi
		});

		const data = {
            columns:[
                {
                    label: 'Ad',
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
                    label: 'TC Kimlik No',
                    field: 'tc',
                    sort: 'asc',
                    width: 150
                },
				{
                    label: 'Telefon',
                    field: 'telefon',
                    sort: 'asc',
                    width: 150
                },
				{
                    label: 'Mail Adresi',
                    field: 'mailAdresi',
                    sort: 'asc',
                    width: 150
                },
				{
                    label: 'Dogum Tarihi',
                    field: 'dogumTarihi',
                    sort: 'asc',
                    width: 150
                }
            ],
            rows: processedData
             
        }

        setFetchedData(data);
	   

	};


	useEffect(() => {
		fetchUserData();
	}, []);


	const sil = async () => {
		const response = await fetch("http://127.0.0.1:5000/musteri/sil/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				erisimKodu: erisimKodu,
				musteriId: musteriId,
			}),
		});

		const returnVAL = await response.json();
		console.log(returnVAL.durum);
	};

	const silClick = () => {
		if (window.confirm("Firma Silinecek Emin Misiniz?") == true) {
			sil();
			setNextPage("/musteriler");
			navigate("/bos");

		}
	};

	const guncelle = () => {
		navigate("/musteri/guncelle/");
	};

	return (
		<div>
			{/* navbar */}
			<div className="navbar bg-base-100 shadow">
				<div className="flex-none">
					<label
						htmlFor="my-drawer"
						className="btn btn-square btn-ghost drawer-button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="inline-block w-5 h-5 stroke-current"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					</label>
				</div>
				<div className="flex-1">
					<Link to="/home" className=" normal-case text-xl w-25 h-25 d-flex justify-content-start">
                <img className='w-50' src={ require('../assets/images/logo.jpeg') } alt="" />
                </Link>
				</div>
				<div className="flex-none">
					<Link className="btn btn-error hover:text-white" to="/logout">
						Çıkış Yap
					</Link>
				</div>
			</div>
			<div className="drawer ">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content w-screen h-screen flex flex-column  align-center">
					{/* Toggle Button */}

					<div style={{"margin-top":"10vh"}} className="w-100 mt-5 d-flex flex-column justify-content-center align-items-center  h-25">
						<div className="d-flex flex-column justify-content-center align-items-center w-75 h-100   rounded">
							<div className="text-center my-5">
								<h1>
									<b style={{ fontSize: "30px" }}>
										Yapmak Istediginiz islemi seciniz:
									</b>
								</h1>
							</div>
							<div className="flex justify-center">
								<div className="m-2">
									<a
										onClick={silClick}
										className="btn btn-error text-black hover:bg-red-300 hover:text-white rounded-md"
									>
										Sil
									</a>
								</div>
								<div className="m-2">
									<a
										onClick={guncelle}
										className="btn btn-success text-black hover:bg-green-300 hover:text-white rounded-md"
									>
										Güncelle
									</a>
								</div>
								<div className="m-2">
									<Link
										to="/is/musteri"
										className="btn btn-success text-black hover:bg-green-300 hover:text-white rounded-md"
									>
										Musteriye Yapilan Isleri Goruntule
									</Link>
								</div>
							</div>
							
						</div>
						<div className="d-flex flex-column justify-content-center  mt-5">
								<div className="text-center">
									<h1 style={{"font-size":"30px"}}>
										Musteri Bilgileri
									</h1>
								</div>
							<MDBDataTable
								striped
								bordered
								hover
							
								data={fetchedData}
								/>

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
	);
}
