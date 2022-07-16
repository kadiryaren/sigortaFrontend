import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";

export default function Teklif(props) {
	const navigate = useNavigate();
	let sirketcounter = 0;
	const [url,seturl] = useState("bos");
	const [sirketId,setSirketId] = useState();
	const [sirketAdi,setSirketAdi] = useState("Kadir");
	const[fiyat,setFiyat] = useState();

	const { token, userId ,erisimKodu,page,setPage} = useContext(MainContext);
	const [fetchedData, setFetchedData] = useState({
        musteriler: [],
		sirketIsimleri:[],
		sigortaSirketleri: [],
		branslar: [],
		arsivKlasorleri: [],
    });

	const [guncelleData, setGuncelleData] = useState({});

	const[initialData,setInitialData] = useState({
		erisimKodu: erisimKodu,
		sigortaIsimleri:[],
		sigortaSirketleri: [],
		fiyatBilgileri:[]
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

		const returnData = await response.json();
		setFetchedData(returnData);

		setSirketAdi(fetchedData["sigortaSirketleri"][0].ad);
		
	};

	const ekle = async () => {
		const response = await fetch("http://127.0.0.1:5000/teklif/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(initialData),
		});


		const responseVAL = await response.text();
		
		seturl(responseVAL);
		setPage(responseVAL);

		
		
	};

    useEffect(() => {
        getAllData();
		
    },[])
	
	useEffect(() => {
        console.log("url geldi");
		console.log(url)

		
		
    },[url])
	

	const ekleClick = () => {
		window.location.href = 'http://127.0.0.1:5000/teklif/?data=' + JSON.stringify(initialData);
		
	};

	useEffect(() => {
		console.log("sirket adi ---- fiyat");
		console.log(sirketAdi);
		console.log(fiyat);
	},[sirketAdi,fiyat])


	const sirketFiyatEkle = () => {
		

		setInitialData({
			...initialData,
			sigortaSirketleri: initialData.sigortaSirketleri.concat([sirketId]),
			sigortaIsimleri: initialData.sigortaIsimleri.concat([sirketAdi]),
			fiyatBilgileri : initialData.fiyatBilgileri.concat([fiyat])

		})
		// initialData.sigortaSirketleri.push(sirketId);
		// initialData.sigortaIsimleri.push(sirketAdi);
		// initialData.fiyatBilgileri.push(fiyat);
	}


	return (
		<div>


			{/* navbar */}
			<div className="navbar shadow">
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

					<div
						style={{ height: "100%" }}
						className="container mx-auto my-5 flex flex-col  items-center border-2 "
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500 flex justify-center py-2  w-1/4 mt-10"
						>
							Kullanıcı Ekleme
						</h1>

						<div className="form d-flex flex-column align-items-center mt-4 w-1/2">
							<div className="w-1/2">
								<div className="flex">
									<div className="flex justify-start w-5/12 flex">
										<label htmlFor="" className="my-auto flex justify-center ">
											Ad 
										</label>
									</div>
									<input
										type="text"
										className="form-control w-7/12 "
										onChange={(e) => {
											initialData.ad = e.target.value;
										}}
									/>
								</div>
								<br />
								<div className="flex">
									<div className="flex justify-start w-5/12  flex">
										<label htmlFor="" className="my-auto  flex justify-center ">
											Soyad
										</label>
									</div>
									<input
										type="text"
										className="form-control w-7/12"
										onChange={(e) => {
											initialData.soyad = e.target.value;
										}}
									/>
								</div>
                                <br />
                                <div className="flex">
									<div className="flex justify-start w-5/12  flex">
										<label htmlFor="" className="my-auto  flex justify-center ">
											Ust Bilgi 
										</label>
									</div>
									<input
										type="text"
										className="form-control w-7/12"
										onChange={(e) => {
											initialData.ustBilgi = e.target.value;
										}}
									/>
								</div>
                                <br />
                                <div className="flex">
									<div className="flex justify-start w-5/12  flex">
										<label htmlFor="" className="my-auto  flex justify-center ">
											Alt Bilgi 
										</label>
									</div>
									<input
										type="text"
										className="form-control w-7/12"
										onChange={(e) => {
											initialData.altBilgi = e.target.value;
										}}
									/>
								</div>

								<br />
                                <div className="flex">
									<div className="flex justify-start w-5/12  flex">
										<label htmlFor="" className="my-auto  flex justify-center ">
											Branslar 
										</label>
									</div>
									<select
										className="form-control w-7/12"
										onChange={(e) => {
											initialData["bransId"] = e.target.value;
										}}
										id="branslar"
										name="branslar"
									>
										{fetchedData["branslar"].map((branslar) => {
											initialData["bransId"] = branslar["id"];
											return (
												<option key={branslar["id"]} value={"" + branslar["id"]}>
													{branslar["ad"]}
												</option>
											);
										})}
									</select>

									
								</div>

								<div className="flex mt-4">
									
									<table className="table">
										<thead>
											<tr>
												<td>Sigorta Sirketi</td>
												<td>Fiyat</td>
											</tr>
										</thead>
										<tbody>
											{
												initialData.sigortaSirketleri.length === 0 ? (
													<tr>
														<td>Sirket Yok</td>
														<td>Fiyat Yok</td>
													</tr>
												) : (
													
													initialData.sigortaIsimleri.map((item,index) => {
														
														return (
															<tr>
															<td>{initialData.sigortaIsimleri[index]}</td>
															<td>{initialData.fiyatBilgileri[index]}</td>
														</tr>
														)

													})

													
												)
											
											}

										</tbody>
									</table>
									
									
								</div>



								
								<div className="flex mt-3">
									<div className="flex justify-start w-5/12  flex">
										<label htmlFor="" className="my-auto  flex justify-center ">
											Sirketler 
										</label>
									</div>
									<select
										className="form-control w-7/12"
										onChange={(e) => {
											setSirketId(e.target.value);
											setSirketAdi(fetchedData["sigortaSirketleri"].filter((item)=> {return (e.target.value == item.id)})[0]['ad']);

										}}
										
										id="branslar"
										name="branslar"
									>
										<option key={0} value="Lutfen Sirket Seciniz" defaultValue> 
													
										</option>
										{fetchedData["sigortaSirketleri"].map((sigortaSirketleri) => {
											
											return (
												<option key={sigortaSirketleri.id} value={"" + sigortaSirketleri["id"]}>
													{sigortaSirketleri["ad"]}
												</option>
											);

										})}
									</select>
									

									
								</div>
								<br />
								<div className="flex">
									<div className="flex justify-start w-5/12  flex">
										<label htmlFor="" className="my-auto  flex justify-center ">
											Fiyat
										</label>
									</div>
									<input
										type="text"
										className="form-control w-7/12"
										onChange={(e) => {
											setFiyat(e.target.value);
											console.log("fiyat" + fiyat);
										}}
									/>
								</div>
								<div className="flex justify-center mt-4">
									<button onClick={sirketFiyatEkle} className="btn btn-warning w-50 text-dark">
												Sirket Fiyati Ekle
									</button>
								</div>
								


				
                                
							</div>
							
							<br />
							

								<button
									className="btn btn-primary rounded mt-3"
									onClick={ekleClick}
								>
									Teklif Sablonu Hazirla
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
