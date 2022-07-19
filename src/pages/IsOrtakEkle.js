import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function IsOrtakEkle(props) {
	const navigate = useNavigate();
	const [tumFirmalar, setTumFirmalar] = useState([]);

	const { token, userId, setArsivId, isId, setIsId, erisimKodu,setNextPage } =
		useContext(MainContext);
	const [initialData, setInitialData] = useState({
		erisimKodu: window.sessionStorage.getItem("erisimKodu"),
		arsivId: "",
		musteriId: "",
		bransId: "",
		sigortaSirketiId: "",
		plaka: "",
		ruhsatSeriNo: "",
		policeNo: "",
		firmaId: "",
		policeBitisTarihi: "",
		komisyonOraniKendisi: 0,
		isId: isId,
	});

	const [fetchedData, setFetchedData] = useState({
		musteriler: [],
		sigortaSirketleri: [],
		branslar: [],
		arsivKlasorleri: [],
		islerBireysel: [],
	});

	const getAllData = async () => {
		const response = await fetch("http://127.0.0.1:5000/goster/hepsi/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(initialData),
		});

		const firmaResponse = await fetch(
			"http://127.0.0.1:5000/firma/goster/hepsi/",
			{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(initialData),
			}
		);

		const data = await response.json();
		setFetchedData(data);
		const firmalar = await firmaResponse.json();
		setTumFirmalar(firmalar);

		setInitialData({
			...initialData,
			plaka: "",
			ruhsatSeriNo: "",
			policeNo: "",
			komisyonOraniFirma: "",
			firmaId: "",
			policeBitisTarihi: "",
		});
	};

	const ekle = async () => {
		const response = await fetch("http://127.0.0.1:5000/is/ortak/ekle/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(initialData),
		});
	};

	useEffect(() => {
		getAllData();
	}, []);

	const ekleClick = () => {
		setInitialData({
			...initialData,
			komisyonOraniKendisi: 100 - initialData.komisyonOraniFirma,
		});
		ekle();

		setArsivId(initialData["arsivId"]);
		setNextPage("/is/ortak");
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
			<div className="drawer">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content w-screen h-screen flex flex-column  align-center">
					{/* Toggle Button */}

					<div
						style={{ height: "100%" }}
						className="container mx-auto my-5 flex flex-col  items-center border-2 bg-gray-200"
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500 flex justify-center py-4  w-1/4 mt-10 mb-4"
						>
							Ortak İş Ekle
						</h1>

						<div className="form d-flex flex-column align-items-center">
							<div className="d-flex  flex-column justify-content-center align-items-center w-100">
								<div className="m-1">
									<label htmlFor="musteriler" className="input-group">
										<span className="w-40 flex justify-center">Müşteriler</span>
										<select
											className="w-48"
											onChange={(e) => {
												initialData["musteriId"] = e.target.value;
											}}
											id="musteriler"
											name="musteriler"
										>
											{fetchedData["musteriler"].map((musteriler) => {
												return (
													<option
														key={musteriler["id"]}
														value={"" + musteriler["id"]}
													>
														{musteriler["ad"]}
													</option>
												);
											})}
										</select>
									</label>
									{/* initialData["musteriler"] = e.target.value */}
								</div>

								<div className="m-1">
									<label htmlFor="firmaAdi" className="input-group">
										<span className="w-40 flex justify-center">Firma</span>
										<select
											className="w-48"
											onChange={(e) => {
												initialData["firmaId"] = e.target.value;
											}}
											id="firmaId"
											name="firmaId"
										>
											{tumFirmalar.map((firma) => {
												if (!("durum" in firma)) {
													return (
														<option key={firma["id"]} value={"" + firma["id"]}>
															{firma["ad"]}
														</option>
													);
												}
											})}
										</select>
									</label>
								</div>
								<div className="m-1">
									<label htmlFor="arsivKlasorleri" className="input-group">
										<span className="w-40 flex justify-center">
											Arşiv Klasörleri
										</span>
										<select
											className="w-48"
											onChange={(e) => {
												initialData["arsivId"] = e.target.value;
											}}
											id="arsivId"
											name="arsivId"
										>
											{fetchedData["arsivKlasorleri"].map((arsivKlasorleri) => {
												return (
													<option
														key={arsivKlasorleri["id"]}
														value={"" + arsivKlasorleri["id"]}
													>
														{arsivKlasorleri["ad"]}
													</option>
												);
											})}
										</select>
									</label>
								</div>
								<div className="m-1">
									<label htmlFor="branslar" className="input-group">
										<span className="w-40 flex justify-center">Branşlar</span>
										<select
											className="w-48"
											onChange={(e) => {
												initialData["bransId"] = e.target.value;
											}}
											id="branslar"
											name="branslar"
										>
											{fetchedData["branslar"].map((branslar) => {
												return (
													<option
														key={branslar["id"]}
														value={"" + branslar["id"]}
													>
														{branslar["ad"]}
													</option>
												);
											})}
										</select>
									</label>
								</div>
								<div className="m-1">
									<label htmlFor="sigortaSirketleri" className="input-group">
										<span className="w-40 flex justify-center">
											Sigorta Şirketleri
										</span>
										<select
											className="w-48"
											onChange={(e) => {
												initialData["sigortaSirketiId"] = e.target.value;
											}}
											id="sigortaSirketleri"
											name="sigortaSirketleri"
										>
											{fetchedData["sigortaSirketleri"].map(
												(sigortaSirketleri) => {
													return (
														<option
															key={sigortaSirketleri["id"]}
															value={"" + sigortaSirketleri["id"]}
														>
															{sigortaSirketleri["ad"]}
														</option>
													);
												}
											)}
										</select>
									</label>
								</div>

								<div class="mt-1">
									<label htmlFor="plaka" className="input-group">
										<span className="w-40 flex justify-center">Plaka</span>
										<input
											className="w-48"
											onChange={(e) => {
												initialData["plaka"] = e.target.value;
											}}
											placeholder={initialData.plaka}
											type="text"
											name="plaka"
										/>
									</label>
								</div>

								
								<div class="mt-1">
									<label htmlFor="ruhsatSeriNo" className="input-group">
										<span className="w-40 flex justify-center">
											Ruhsat Seri No
										</span>
										<input
											className="w-48"
											type="text"
											onChange={(e) => {
												initialData["ruhsatSeriNo"] = e.target.value;
											}}
											placeholder={initialData.ruhsatSeriNo}
											name="ruhsatSeriNo"
										/>
									</label>
								</div>

								

								<div class="mt-1">
									<label htmlFor="komisyonOraniFirma" className="input-group">
										<span className="w-40 flex justify-center">
											Firma Komisyon
										</span>
										<input
											className="w-48"
											type="text"
											onChange={(e) => {
												initialData["komisyonOraniFirma"] = e.target.value;
												try {
													initialData["komisyonOraniKendisi"] =
														100 - e.target.value;
												} catch (e) {
													alert("komisyon orani metinsel ifade olamaz!");
												}
											}}
											placeholder={initialData.komisyonOraniFirma}
											name="komisyonOraniFirma"
										/>
									</label>
								</div>
						

								<div class="mt-1">
									<label htmlFor="policeNo" className="input-group">
										<span class="w-40 flex justify-center">Poliçe No</span>
										<input
											className="w-48"
											onChange={(e) => {
												initialData["policeNo"] = e.target.value;
											}}
											placeholder={initialData.policeNo}
											type="text"
											name="policeNo"
										/>
									</label>
								</div>

								
								<div class="mt-1">
									<label htmlFor="policeBitisTarihi" className="input-group">
										<span className="w-40 flex justify-center">
											Poliçe Bitiş Tarihi
										</span>
										<input
											className="w-48"
											onChange={(e) => {
												initialData["policeBitisTarihi"] = e.target.value;
											}}
											// value={initialData.policeBitisTarihi}
											type="date"
											name="policeBitisTarihi"
										/>
									</label>
								</div>

								<button
									onClick={ekleClick}
									className="btn btn-success rounded my-3"
								>
									Ekle
								</button>
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
