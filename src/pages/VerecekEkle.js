import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";

export default function VerecekEkle(props) {
	const navigate = useNavigate();
	const [counter, setCounter] = useState(0);
	const { token, userId, setArsivId, isTuru, isId, erisimKodu } =
		useContext(MainContext);
	const initialData = {
		erisimKodu: erisimKodu,
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
		if (isTuru === 0) {
			navigate("/is/bireysel/arsiv/tek");
		} else if (isTuru === 1) {
			navigate("/is/ortak/arsiv/tek");
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
				<div className="drawer-content w-screen h-screen flex flex-column  align-center">
					{/* Toggle Button */}

					<div
						style={{ height: "100%" }}
						className="container mx-auto my-5 flex flex-col  items-center border-2 "
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500 flex justify-center py-2  w-1/4 mt-10"
						>
							Verecek Ekle
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
