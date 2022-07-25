import React, { useState } from "react";
import { useEffect,useContext } from "react";
import { useLocation,Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";

export default function FirmaGuncelle(props) {
	const navigate = useNavigate();
	const { token, userId, firmaId, firmaAdi, erisimKodu,setNextPage} =
		useContext(MainContext);
	const [fetchedData, setFetchedData] = useState([]);
	const location = useLocation();
	const [guncelleData, setGuncelleData] = useState({});

	const initialData = {
		erisimKodu: window.sessionStorage.getItem("erisimKodu"),
		firmaId: firmaId,
		firmaAdi: firmaAdi,
	};

	const update = async () => {
		const response = await fetch("http://127.0.0.1:5000/firma/guncelle/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(initialData),
		});

		const returnData = await response.json();
		setFetchedData(returnData);
		setNextPage("/firmalar");
			navigate("/bos");
	};

	const guncelle = () => {
		if (initialData.sifre === "") {
			window.alert("Mutlaka bir sifre girmelisiniz!");
		} else {
			update();
		}
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
						className="container mx-auto my-5 flex flex-col  items-center border-2 "
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500 flex justify-center py-4  w-1/4 mt-10"
						>
							ORTAK GÜNCELLE
						</h1>

						<div className="form d-flex flex-column align-items-center mt-5">
							<label htmlFor="" className="input-group">
								<span className="w-40 flex justify-content">
									Ortak Adı
								</span>
								<input
									
									type="text"
									className="form-control input input-sm input-secondary w-48"
									onChange={(e) => {
										initialData.firmaAdi = e.target.value;
									}}
								/>
							</label>

							<button
								className="btn btn-success rounded mt-3"
								onClick={guncelle}
							>
								Güncelle
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
