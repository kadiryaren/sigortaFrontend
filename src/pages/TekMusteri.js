import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";

export default function TekMusteri(props) {
	const navigate = useNavigate();
	const { musteriId, setMusteriId, erisimKodu, musteriData, setMusteriData } =
		useContext(MainContext);
	const [fetchedData, setFetchedData] = useState([]);
	const location = useLocation();

	// const fetchData = async () => {
	//     const response = await fetch("http://127.0.0.1:5000/is/bireysel/musteri/goster/hepsi/",{
	//         method:"POST",
	//         mode:"cors",
	//         headers:{
	//             'Content-Type':'application/json'
	//         },
	//         body: JSON.stringify({
	//             erisimKodu:"8008827b-8d15-48a0-b52b-569155ae5702"
	//         })
	//     })

	//     const returnData = await response.json();
	//     console.log(returnData);
	//     const processedData = [];
	//     for(let i = 1; i<Array.from(returnData.keys()).length;i++){
	//         processedData.push({
	//             ad: returnData[i].ad,

	//             clickEvent: () => click(returnData[i].id,returnData[i].ad)
	//         });
	//     }

	// };

	const getMusteriData = async () => {
		const data = await fetch("http://127.0.0.1:5000/musteri/goster/tek/", {
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

		const customerData = await data.json();
		setMusteriData(customerData);
		console.log(customerData);
	};

	useEffect(() => {
		getMusteriData();
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
			navigate("/musteriler");
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
					<a href="/home" className="btn btn-ghost normal-case text-xl">
						Biçerer Sigorta
					</a>
				</div>
				<div className="flex-none">
					<a className="btn btn-error hover:text-white" href="/logout">
						Çıkış Yap
					</a>
				</div>
			</div>
			<div className="drawer ">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content w-screen h-screen flex flex-column  align-center">
					{/* Toggle Button */}

					<div className="w-100 d-flex justify-content-center align-items-center  h-25">
						<div className="d-flex flex-column justify-content-center align-items-center w-75 h-100  bg-yellow-300/[.1] rounded">
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
							</div>
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
