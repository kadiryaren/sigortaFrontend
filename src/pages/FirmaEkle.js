import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function FirmaEkle(props) {
	const navigate = useNavigate();
	const { token, userId ,erisimKodu,setNextPage} = useContext(MainContext);
	const [fetchedData, setFetchedData] = useState([]);

	const [guncelleData, setGuncelleData] = useState({});

	const initialData = {
		erisimKodu: window.sessionStorage.getItem("erisimKodu"),
		firmaAdi: "",
	};

	const ekle = async () => {
		const response = await fetch("http://127.0.0.1:5000/firma/ekle/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(initialData),
		});

		const returnData = await response.json();
		setFetchedData(returnData);
	};

	const ekleClick = () => {
		ekle();
		setNextPage("/firmalar");
		navigate("/bos");
	
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

					<div
						style={{ height: "100%" }}
						className="container mx-auto my-5 flex flex-col  items-center border-2"
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500 flex justify-center py-2  w-1/4 mt-10"
						>
							 Ortak Ekle
						</h1>

						<div className="form d-flex flex-column align-items-center w-1/4">
							<label htmlFor="" className="my-4 text-lg">
								Ortak Adı
							</label>
							<input
								type="text"
								className="form-control w-3/4"
								onChange={(e) => {
									initialData.firmaAdi = e.target.value;
								}}
							/>

							<button className="btn btn-secondary mt-3" onClick={ekleClick}>
								Ekle
							</button>
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
