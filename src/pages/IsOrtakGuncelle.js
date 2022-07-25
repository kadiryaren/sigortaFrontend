import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";

export default function IsOrtakGuncelle(props) {
	const navigate = useNavigate();
	const [tumFirmalar, setTumFirmalar] = useState([]);

	const { token, userId, setArsivId, isId, setIsId, erisimKodu } =
		useContext(MainContext);
	const [initialData, setInitialData] = useState({
		erisimKodu: window.sessionStorage.getItem("erisimKodu"),
		arsivId: "",
		musteriId: "",
		bransId: "",
		sigortaSirketiId: "",
		plaka: "default Data",
		ruhsatSeriNo: "",
		policeNo: "",
		firmaId: "",
		policeBitisTarihi: "1970-01-01",
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
			plaka: data.islerOrtak.filter((item) => {
				return item.id === isId;
			})[0].plaka,
			ruhsatSeriNo: data.islerOrtak.filter((item) => {
				return item.id === isId;
			})[0].ruhsatSeriNo,
			policeNo: data.islerOrtak.filter((item) => {
				return item.id === isId;
			})[0].policeNo,
			komisyonOraniFirma: data.islerOrtak.filter((item) => {
				return item.id === isId;
			})[0].komisyonOraniFirma,
			firmaId: data.islerOrtak.filter((item) => {
				return item.id === isId;
			})[0].firmaId,
			firmaAdi: firmalar.filter((item) => {
				return (
					item.id ===
					data.islerOrtak.filter((item) => {
						return item.id === isId;
					})[0].firmaId
				);
			})[0].ad,
			policeBitisTarihi: data.islerOrtak.filter((item) => {
				return item.id === isId;
			})[0].policeBitisTarihi,
		});

		console.log("fetched data");
		console.log(fetchedData["islerOrtak"]);
	};

	const postData = async () => {
		const response = await fetch("http://127.0.0.1:5000/is/ortak/guncelle/", {
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

	const guncelle = () => {
		setInitialData({
			...initialData,
			komisyonOraniKendisi: 100 - initialData.komisyonOraniFirma,
		});
		postData();

		setArsivId(initialData["arsivId"]);
		navigate("/is/ortak");
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
						className="container mx-auto my-5 flex flex-col  items-center border-2 bg-gray-200"
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500 flex justify-center py-4  w-1/4 mt-10 mb-4"
						>
							Ortak İş Güncelle
						</h1>

						<div className="form d-flex flex-column align-items-center">
							<div className="d-flex justify-content-center align-items-center w-full">
								<div className="m-3">
									<div className="m-3">
										<label htmlFor="musteriler" className="input-group">
											<span class="w-40 flex justify-center">Müşteriler</span>
											<select
												className="w-48"
												onChange={(e) => {
													initialData["musteriId"] = e.target.value;
												}}
												id="musteriler"
												name="musteriler"
											>
												{fetchedData["musteriler"].map((musteriler) => {
													if (
														fetchedData["islerOrtak"].filter((item) => {
															return item.id === isId;
														})[0].musteriId === musteriler["id"]
													) {
														initialData["musteriId"] = musteriler["id"];
														return (
															<option
																key={musteriler["id"]}
																value={"" + musteriler["id"]}
																selected
															>
																{musteriler["ad"]}
															</option>
														);
													} else {
														return (
															<option
																key={musteriler["id"]}
																value={"" + musteriler["id"]}
															>
																{musteriler["ad"]}
															</option>
														);
													}
												})}
											</select>
										</label>
									</div>
									<div className="m-3">
										<label htmlFor="firmaAdi" className="input-group">
											<span class="w-40 flex justify-center">Firma</span>
											<select
												className="w-48"
												onChange={(e) => {
													initialData["firmaAdi"] = e.target.value;
												}}
												id="firmaAdi"
												name="firmaAdi"
											>
												{tumFirmalar.map((firma) => {
													if (!("durum" in firma)) {
														if (
															fetchedData["islerOrtak"].filter((item) => {
																return item.id === isId;
															})[0].firmaId === firma["id"]
														) {
															return (
																<option
																	key={firma["id"]}
																	value={"" + firma["id"]}
																	selected
																>
																	{firma["ad"]}
																</option>
															);
														} else {
															return (
																<option
																	key={firma["id"]}
																	value={"" + firma["id"]}
																>
																	{firma["ad"]}
																</option>
															);
														}
													}
												})}
											</select>
										</label>
									</div>
									<div className="m-3">
										<label htmlFor="arsivKlasorleri" className="input-group">
											<span class="flex justify-center w-40">
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
												{fetchedData["arsivKlasorleri"].map(
													(arsivKlasorleri) => {
														if (
															fetchedData["islerOrtak"].filter((item) => {
																return item.id === isId;
															})[0].arsivId === arsivKlasorleri["id"]
														) {
															initialData["arsivId"] = arsivKlasorleri["id"];
															return (
																<option
																	key={arsivKlasorleri["id"]}
																	selected="selected"
																	value={"" + arsivKlasorleri["id"]}
																>
																	{arsivKlasorleri["ad"]}
																</option>
															);
														}
														return (
															<option
																key={arsivKlasorleri["id"]}
																value={"" + arsivKlasorleri["id"]}
															>
																{arsivKlasorleri["ad"]}
															</option>
														);
													}
												)}
											</select>
										</label>
									</div>
									<div className="m-3">
										<label htmlFor="branslar" className="input-group">
											<span class="w-40 flex justify-center">Branşlar</span>
											<select
												className="w-48"
												onChange={(e) => {
													initialData["bransId"] = e.target.value;
												}}
												id="branslar"
												name="branslar"
											>
												{fetchedData["branslar"].map((branslar) => {
													if (
														fetchedData["islerOrtak"].filter((item) => {
															return item.id === isId;
														})[0].bransId === branslar["id"]
													) {
														initialData["bransId"] = branslar["id"];
														return (
															<option
																key={branslar["id"]}
																value={"" + branslar["id"]}
																selected
															>
																{branslar["ad"]}
															</option>
														);
													} else {
														return (
															<option
																key={branslar["id"]}
																value={"" + branslar["id"]}
															>
																{branslar["ad"]}
															</option>
														);
													}
												})}
											</select>
										</label>
									</div>
									<div class="m-3">
										<label htmlFor="sigortaSirketleri" className="input-group">
											<span class="flex justify-center w-40">
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
														if (
															fetchedData["islerOrtak"].filter((item) => {
																return item.id === isId;
															})[0].sigortaSirketiId === sigortaSirketleri["id"]
														) {
															initialData["sigortaSirketiId"] =
																sigortaSirketleri["id"];
															return (
																<option
																	key={sigortaSirketleri["id"]}
																	selected="selected"
																	value={"" + sigortaSirketleri["id"]}
																>
																	{sigortaSirketleri["ad"]}
																</option>
															);
														} else {
															return (
																<option
																	key={sigortaSirketleri["id"]}
																	value={"" + sigortaSirketleri["id"]}
																>
																	{sigortaSirketleri["ad"]}
																</option>
															);
														}
													}
												)}
											</select>
										</label>
									</div>

									<div class="m-3">
										<label htmlFor="plaka" className="input-group">
											<span class="flex justify-center w-40">Plaka</span>
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

									<div className="m-3">
										<label htmlFor="ruhsatSeriNo" className="input-group">
											<span class="flex justify-center w-40">
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

									<div class="m-3">
										<label htmlFor="komisyonOraniFirma" className="input-group">
											<span class="flex justify-center w-40">
												Firma Komisyon
											</span>
											<input
												className="w-48"
												type="text"
												onChange={(e) => {
													initialData["komisyonOraniFirma"] = e.target.value;
												}}
												placeholder={initialData.komisyonOraniFirma}
												name="komisyonOraniFirma"
											/>
										</label>
									</div>

									<div class="m-3">
										<label htmlFor="policeNo" className="input-group">
											<span class="flex justify-center w-40">Poliçe No</span>
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

									<div class="m-3">
										<label htmlFor="policeBitisTarihi" className="input-group">
											<span className="flex justify-center w-40">
												Poliçe Bitiş Tarihi
											</span>
											<input
												className="w-48"
												onChange={(e) => {
													initialData["policeBitisTarihi"] = e.target.value;
												}}
												placeholder={initialData.policeBitisTarihi}
												type="date"
												name="policeBitisTarihi"
											/>
										</label>
									</div>

									{/* <button onClick={() => {guncelle()}} className='btn bg-green-200' >Guncelle</button> */}
									<div class="m-3 flex justify-center">
										<button
											onClick={guncelle}
											className="btn btn-success rounded"
										>
											Guncelle
										</button>
									</div>
								</div>
							</div>

							<div className="d-flex justify-content-center align-items-center w-100"></div>
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
