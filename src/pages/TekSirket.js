import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate,Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";

export default function TekSirket(props) {
	const navigate = useNavigate();
	const {
		sigortaSirketiId,
		setSigortaSirketiId,
		sigortaSirketiAdi,
		setSigortaSirketiAdi,
		erisimKodu,
		sirketPhoto,
		setSirketPhoto,setNextPage
	} = useContext(MainContext);
	const [fetchedData, setFetchedData] = useState([]);

	const sil = async () => {
		const response = await fetch("http://127.0.0.1:5000/sirket/sil/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				erisimKodu: window.sessionStorage.getItem("erisimKodu"),
				sigortaSirketiId: sigortaSirketiId,
			}),
		});

		const returnVAL = await response.json();
		console.log(returnVAL.durum);
	};

	const silClick = () => {
		if (window.confirm("Firma Silinecek Emin Misiniz?") == true) {
			sil();
			setNextPage("/sirketler");
			navigate("/bos");

			
		}
	};

	const guncelle = () => {
		navigate("/sirket/guncelle/");
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
							Şirket
						</h1>
						<div className="d-flex w-100 h-100">
							<div
								style={{ height: "100%" }}
								className="d-flex w-100 flex-column justify-content-start align-items-center mt-5"
							>
								<h1 style={{ fontSize: "30px" }} className="mb-3">
									İşlemler
								</h1>

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
