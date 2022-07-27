import React, { useState,useContext } from "react";
import { useEffect } from "react";
import { useLocation,Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";

export default function VerecekEkle(props) {
	const navigate = useNavigate();
	const [counter, setCounter] = useState(0);
	const { token, userId, setArsivId, isTuru, isId, erisimKodu, setNextPage } =
		useContext(MainContext);
	const initialData = {
		erisimKodu: window.sessionStorage.getItem("erisimKodu"),
	};
	console.log(isTuru);

	const ekle = async () => {
		const response = await fetch("http://127.0.0.1:5000/verecekler/ekle/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(initialData),
		});
		if (isTuru === 0) {
			setNextPage("/is/bireysel/arsiv/tek");
			navigate("/bos");
	
		} else if (isTuru === 1) {
			setNextPage("/is/ortak/arsiv/tek");
			navigate("/bos");

		}
	};

	useEffect(() => {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = today.getFullYear();

		today = yyyy + "-" + mm + "-" + dd;
		initialData["tarih"] = today;

		initialData["isTuru"] = isTuru;
		initialData["isId"] = isId;

		console.log(initialData);
		console.log(isTuru);
	}, []);

	const ekleClick = () => {
		ekle();
		
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
					
					<span className="btn bg-green-500 hover:bg-green-500 mx-3 text-black"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>{window.sessionStorage.getItem("kullanici")}</span>
                    <Link to="/logout" className="link link-hover btn bg-red-700 text-white hover:bg-red-500">Cikis Yap</Link>
                           
				</div>
			</div>
			<div className="drawer ">
				<div className="drawer-content w-screen h-screen flex flex-column  align-center">
					{/* Toggle Button */}

					<div
						style={{ height: "100%" }}
						className="container mx-auto my-5 flex flex-col  items-center border-2 "
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500  py-4 text-center  w-1/2 mt-10 mb-4"
						>
							ID: <span className="text-red-600">{isId + " "}</span> <br/>Verilen Ekle
						</h1>

						<div className="form d-flex flex-column align-items-center mt-5">
							<label htmlFor="aciklama" className="input-group">
								<span className="w-32 flex justify-center">Açıklama</span>
								<input
									className="w-48 input input-sm input-secondary"
									onChange={(e) => {
										initialData["aciklama"] = e.target.value;
									}}
									type="text"
									name="aciklama"
								/>
							</label>
							<br />

							<label htmlFor="miktar" className="input-group">
								<span className="w-32 flex justify-center">Miktar</span>
								<input
									className="w-48 input input-sm input-secondary"
									onChange={(e) => {
										initialData["miktar"] = e.target.value;
									}}
									type="number"
									name="miktar"
								/>
							</label>
							<br />

							{/* <button onClick={() => {ekle()}} className='btn bg-green-200' >Ekle</button> */}
							<button onClick={ekleClick} className="btn btn-success rounded">
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
