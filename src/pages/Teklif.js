import React, { useState } from "react";
import { useEffect ,useContext} from "react";
import { useLocation,Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";

export default function Teklif(props) {
	const navigate = useNavigate();
	let sirketcounter = 0;
	const [url,seturl] = useState("bos");
	const [sirketId,setSirketId] = useState();
	const [sirketAdi,setSirketAdi] = useState("");
	const[fiyat,setFiyat] = useState("");

	const { token, userId ,erisimKodu,page,setPage} = useContext(MainContext);
	const [fetchedData, setFetchedData] = useState({
        musteriler: [],
		sirketIsimleri:[],
		sigortaSirketleri: [],
		branslar: [],
		arsivKlasorleri: [],
		teklifData: []
    });

	const [guncelleData, setGuncelleData] = useState({});
	const[teklif,setTeklif] = useState([]);
	const[initialData,setInitialData] = useState({
		erisimKodu: window.sessionStorage.getItem("erisimKodu"),
		sigortaIsimleri:[],
		sigortaSirketleri: [],
		fiyatBilgileri:[],
		altBilgi: "BİÇERER SİGORTA - 0 546 660 23 23 <br/>Nailbey Mah. Yeşildere Sok. No : 20B -Elazığ - Merkez<br/>bicerersigorta@gmail.com",
	
		
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
		const data = {
			erisimKodu: window.sessionStorage.getItem("erisimKodu"),
			bransId: initialData.bransId,
			ad: initialData.ad,
			soyad:initialData.soyad,
			ustBilgi:initialData.ustBilgi,
			altBilgi:initialData.altBilgi,
			sigortaSirketleri: teklif.map((item) => {
				return  item.sirketId
			}),
			fiyatBilgileri: teklif.map((item) => {
				return item.fiyat
			})

		}
		if(data.bransId === undefined || data.ad === undefined || data.soyad === undefined || data.ustBilgi === undefined ||
		data.altBilgi === undefined ||	data.sigortaSirketleri === undefined ||	data.fiyatBilgileri === undefined  
		){
			alert("Lutfen tum alanlari doldurun!");

		}else{
			console.log("data-->",data);
			window.location.href = 'http://127.0.0.1:5000/teklif/?data=' + JSON.stringify(data);
		}
		
	};

	const sirketFiyatEkle = () => {
		

		// setInitialData({
		// 	...initialData,
		// 	sigortaSirketleri: initialData.sigortaSirketleri.concat([sirketId]),
		// 	sigortaIsimleri: initialData.sigortaIsimleri.concat([sirketAdi]),
		// 	fiyatBilgileri : initialData.fiyatBilgileri.concat([fiyat])

		// })
		if(sirketAdi == "" || fiyat == ""){
			alert("Lutfen sirket adi veya fiyati doldurun!");
		}else{
			setTeklif([
				...teklif,
				{
					id: teklif.length,
					sirketAdi:sirketAdi,
					sirketId:sirketId,
					fiyat: fiyat
				}
	
			])

			setSirketAdi("");
			setFiyat("");
		}

		
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
					<Link to="/home" className=" normal-case text-xl w-25 h-25 d-flex justify-content-start">
                <img className='w-50' src={ require('../assets/images/logo.jpeg') } alt="" />
                </Link>
				</div>
				<div className="flex-none">
					
					<span className="btn bg-green-500 hover:bg-green-500 mx-3 text-black"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>{window.sessionStorage.getItem("kullanici")}</span>
                    <Link to="/logout" className="link link-hover btn bg-red-700 text-white hover:bg-red-500">Cikis Yap</Link>
                           
				</div>
			</div>
			<div className="drawer h-100 ">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content  flex flex-column  align-center">
					{/* Toggle Button */}

					<div
						style={{ height: "100%" }}
						className="container min-h-full mx-auto my-5 flex flex-col  items-center border-2 "
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500 flex justify-center py-2  w-1/4 mt-10"
						>
							Teklif Sayfasi
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
									<textarea
										type="text"
										className="form-control w-7/12"
										onChange={(e) => {
											initialData.ustBilgi = e.target.value;
										}}
									/>
								</div>
                                {/* <br />
                                <div className="flex">
									<div className="flex justify-start w-5/12  flex">
										<label htmlFor="" className="my-auto  flex justify-center ">
											Alt Bilgi 
										</label>
									</div>
									<textarea
										type="text"
										className="form-control w-7/12"
										onChange={(e) => {
											initialData.altBilgi = e.target.value;
										}}
										defaultValue="BİÇERER SİGORTA - 0 546 660 23 23 <br/>Nailbey Mah. Yeşildere Sok. No : 20B -Elazığ - Merkez<br/>bicerersigorta@gmail.com"
										
									/>
								</div> */}

								<br />
                                <div className="flex">
									<div className="flex justify-start w-5/12  flex">
										<label htmlFor="" className="my-auto  flex justify-center ">
											Ürünler 
										</label>
									</div>
									<select
										className="form-control w-7/12 select"
										onChange={(e) => {
											// initialData["bransId"] = e.target.value;
											setInitialData({
												...initialData,
												bransId : e.target.value
											})
										}}
										id="branslar"
										name="branslar"
									>
										{/* {fetchedData["sigortaSirketleri"].map((sigortaSirketleri) => {
											
											return (
												<option key={sigortaSirketleri.id} value={"" + sigortaSirketleri["id"]}>
													{sigortaSirketleri["ad"]}
												</option>
											);

										})} */}
											<option value="">
													
												</option>

										{fetchedData["branslar"].map((branslar) => {
										
											return (
												<option key={branslar.id} value={branslar["id"]}>
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
												<td>Islem</td>
											</tr>
										</thead>
										<tbody>
											{
												teklif.length === 0 ? (
													<tr>
														<td>Sirket Yok</td>
														<td>Fiyat Yok</td>
														<td>Islem Yok</td>
													</tr>
												) : (
													
													teklif.map((item) => {
														
														return (
															<tr>
																<td>{item.sirketAdi}</td>
																<td>{item.fiyat}</td>
																<td><button className="btn bg-red-600" onClick={() => {
																		// setTeklif({
																		// 	...teklif,
																		// 	teklifData: initialData.teklifData.filter((eachItem) => {return eachItem.id !== item.id})
																		// })

																		setTeklif(teklif.filter((element) => {
																			return item.id !== element.id
																		}))
																}} >
																	X
																	</button></td>
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
										className=" w-7/12 select select-md select-primary rounded-lg	 "
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
										type="number"
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
									className="btn btn-primary rounded mt-3 mb-12"
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
