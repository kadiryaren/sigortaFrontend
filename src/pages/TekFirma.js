import React, { useState } from "react";
import { useEffect,useContext } from "react";
import { Navigate, useLocation,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";

export default function TekFirma(props) {
	const navigate = useNavigate();
	const { token, userId, firmaId, setFirmaId, arsivId, erisimKodu,setNextPage } =
		useContext(MainContext);
	const [fetchedData, setFetchedData] = useState([]);
	const location = useLocation();

	const sil = async () => {
		const response = await fetch("http://127.0.0.1:5000/firma/sil/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				erisimKodu: window.sessionStorage.getItem("erisimKodu"),
				firmaId: firmaId,
			})
			
		});

		setNextPage("/yaklasan");
		setTimeout(() => {
			navigate("/bos");
		},500)
		
		
	};

	const silClick = () => {
		if (window.confirm("Ortak Silinecek Emin Misiniz?") == true) {
			sil();
		}
	};

	const guncelle = () => {
		navigate("/firma/guncelle/");
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
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content w-screen h-screen flex flex-column  align-center">
					{/* Toggle Button */}

					<div
						style={{ height: "100%" }}
						className="container mx-auto my-5 flex flex-col  items-center border-2 bg-gray-200"
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500 flex justify-center py-4  w-1/4 mt-10"
						>
							Firma
						</h1>
						<div className="d-flex w-100 h-100">
							<div
								style={{ height: "100%" }}
								className="d-flex w-100 flex-column bg-danger justify-content-start align-items-center mt-5"
							></div>
							<div
								style={{ height: "100%" }}
								className="d-flex w-100 flex-column justify-content-start align-items-center mt-5"
							>
								<h1 style={{ fontSize: "30px" }}>Islemler</h1>

								<ul className="d-flex flex-column justify-content-center align-items-center mt-5">
									<li className="my-2">
										<a
											onClick={silClick}
											className="btn bg-red-500 text-black hover:bg-red-300 hover:text-white"
										>
											Sil
										</a>
									</li>
									<li className="my-2">
										<a
											onClick={guncelle}
											className="btn bg-green-500 text-black hover:bg-green-300 hover:text-white"
										>
											Güncelle
										</a>
									</li>
								</ul>
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
