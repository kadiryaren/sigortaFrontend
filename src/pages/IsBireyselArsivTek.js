import React, { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import AlacakGoster from "../components/AlacakGoster";
import VerecekGoster from "../components/VerecekGoster";

export default function IsBireyselArsivTek(props) {
	const navigate = useNavigate();
	const [tableData2, setTableData2] = useState({});
	const [verecekData, setVerecekData] = useState({});

	const { verecekId, setVerecekId, erisimKodu } = useContext(MainContext);
	const { isId, isTuru, setIsTuru } = useContext(MainContext);

	const sil = async () => {
		const response = await fetch("http://127.0.0.1:5000/is/bireysel/sil/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				erisimKodu: erisimKodu,
				isId: isId,
			}),
		});

		const returnVAL = await response.json();
		console.log(returnVAL.durum);
	};

	const silClick = () => {
		if (window.confirm("Firma Silinecek Emin Misiniz?") == true) {
			sil();
			navigate("/is/bireysel");
		}
	};

	const guncelle = () => {
		navigate("/is/bireysel/guncelle");
	};

	const goruntule = () => {
		navigate("/is/bireysel/musteri");
	};
	const clickVerecek = (verecekId) => {
		setVerecekId(verecekId);
		navigate("/is/bireysel/arsiv/tek");
	};

	useEffect(() => {
		setIsTuru(0);
	}, []);

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

					<div className="w-100 h-100 d-flex justify-content-center align-items-start  h-25">
						<div className="d-flex flex-column justify-content-center align-items-center w-75 h-100  rounded">
							<div className="text-center my-5">
								<h1>
									<b style={{ fontSize: "30px" }}>
										Yapmak Istediginiz islemi seciniz:
									</b>
								</h1>
							</div>
							<div className="d-flex justify-content-center">
								<a onClick={goruntule} className="btn btn-success rounded mx-2">
									Musteriye Yapilan Isleri Gor
								</a>
								<a onClick={guncelle} className="btn btn-info rounded mx-2">
									Güncelle
								</a>
								<a onClick={silClick} className="btn btn-error rounded mx-2">
									Sil
								</a>
							</div>

							<div className="d-flex justify-content-center align-items-center mt-5">
								<div className="d-flex flex-column justify-content-center align-items-center mt-4 mr-5">
									<Link to="/alacak/ekle" className="btn btn-outline rounded">
										Alacak ekle
									</Link>
									<AlacakGoster propIsTuru={0} />
								</div>

								<div className="d-flex flex-column justify-content-center align-items-center mt-4">
									<Link to="/verecek/ekle" className="btn btn-outline rounded">
										Verecek ekle
									</Link>
									<VerecekGoster propIsTuru={0} />
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
