import React, { useState } from "react";
import { useEffect,useContext } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import AlacakGoster from "../components/AlacakGoster";
import VerecekGoster from "../components/VerecekGoster";

export default function IsOrtakArsivTek(props) {
	const navigate = useNavigate();
	const { isId, erisimKodu, setIsTuru } = useContext(MainContext);
	const[borc,setBorc] = useState(0);
	const[bireyselPay,setBireyselPay] = useState(0);
	const[firmaPay,setFirmaPay] = useState(0);


	const sil = async () => {
		const response = await fetch("http://127.0.0.1:5000/is/ortak/sil/", {
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

	const payFetch = async () => {
		const response = await fetch("http://127.0.0.1:5000/pay/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				erisimKodu: erisimKodu,
				isId: isId
			}),
		});

		const returnVAL = await response.json();
		setBireyselPay(returnVAL.bireyselAlacak);
		setFirmaPay(returnVAL.firmaAlacak);

		console.log("pay");
		console.log(returnVAL);
	};

	const fetchBorc = async () => {
		const response = await fetch("http://127.0.0.1:5000/borc/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				erisimKodu: erisimKodu,
				isId: isId,
				isTuru:1
			}),
		});

		const returnVAL = await response.json();
		setBorc(returnVAL.toplamTutar);
	};

	const silClick = () => {
		if (window.confirm("Is Silinecek Emin Misiniz?") == true) {
			sil();
			navigate("/is/ortak");
		}
	};

	const guncelle = () => {
		navigate("/is/ortak/guncelle");
	};

	const goruntule = () => {
		navigate("/is/ortak/musteri");
	};
	const firmaortak = () => {
		navigate("/is/ortak/firma");
	};

	useEffect(() => {
		setIsTuru(1);
		fetchBorc();
		payFetch();
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

					<div className="w-100 h-100 d-flex justify-content-center align-items-center  h-25">
						<div className="d-flex flex-column justify-content-center align-items-center w-75 h-100  rounded">
							<div className="text-center my-5">
								<h1>
									<b style={{ fontSize: "30px" }}>
										Yapmak Istediginiz islemi seciniz:
									</b>
								</h1>
							</div>
							<div className="d-flex justify-content-center">
								<a
									onClick={firmaortak}
									className="btn btn-primary rounded mx-2"
								>
									Firma ile yapilan ortak isleri gor
								</a>
								<a onClick={goruntule} className="btn btn-success rounded mx-2">
									Musteriye Yapilan Isleri Gor
								</a>
								<a onClick={guncelle} className="btn btn-info rounded mx-2">
									Güncelle
								</a>
								<a onClick={silClick} className="btn btn-error rounded mx-2">
									Sil
								</a>
								<div class="alert alert-info shadow-lg">
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
										<span>{`Total Musteri Borcu: ${borc} TL`}</span>
									</div>
								</div>
							</div>
							<div class="alert alert-info shadow-lg">
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
										<span>{`Firma Pay: ${firmaPay} TL`}</span>
									</div>
								</div>
								<div class="alert alert-warning shadow-lg">
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
										<span>{`Bireysel Pay: ${bireyselPay} TL`}</span>
									</div>
								</div>
							
							<div className="d-flex justify-content-center align-items-center">
								<div className="d-flex flex-column justify-content-center align-items-center mt-4 mr-5">
									<Link to="/alacak/ekle" className="btn rounded btn-outline">
										Alacak ekle
									</Link>
									<AlacakGoster propIsTuru={"1"} />
								</div>

								<div className="d-flex flex-column justify-content-center align-items-center mt-4">
									<Link to="/verecek/ekle" className="btn btn-outline rounded">
										Verilen ekle
									</Link>
									<VerecekGoster propIsTuru={"1"} />
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
