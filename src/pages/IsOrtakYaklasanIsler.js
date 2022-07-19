import React, { useState } from "react";
import { useEffect } from "react";
import {} from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import { useNavigate } from "react-router-dom";
import SideBarLinks from "../components/SideBarLinks";
import { Link } from "react-router-dom";

export default function IsOrtakYaklasanIsler() {
	const navigate = useNavigate();
	const { arsivId, musteriId, setMusteriId, isId, setIsId, erisimKodu } =
		useContext(MainContext);

	const [fetchedData, setFetchedData] = useState([]);
	const click = (id, musteriId) => {
		setMusteriId(musteriId);
		setIsId(id);

		navigate("/is/ortak/arsiv/tek");
	};

	const fetchData = async () => {
		const response = await fetch(
			"http://127.0.0.1:5000/is/ortak/yaklasan/ ",
			{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					erisimKodu: window.sessionStorage.getItem("erisimKodu")
					
				}),
			}
		);

		const returnData = await response.json();
		console.log(returnData);
		const processedData = [];
        if(returnData.durum !== false){
            for (let i = 0; i < Array.from(returnData.isler).length; i++) {
                processedData.push({
                    musteriAdi: returnData.isler[i].musteriAdi,
                    bransAdi: returnData.isler[i].bransAdi,
                    sigortaSirketiAdi: returnData.isler[i].sigortaSirketiAdi,
                    arsivKlasoruAdi: returnData.isler[i].arsivKlasoruAdi,
                    plaka: returnData.isler[i].plaka,
                    ruhsatSeriNo: returnData.isler[i].ruhsatSeriNo,
                    policeNo: returnData.isler[i].policeNo,
                    policeBitisTarihi: returnData.isler[i].policeBitisTarihi,
                    komisyonOraniFirma: returnData.isler[i].komisyonOraniFirma,
    
                    clickEvent: () => click(returnData.isler[i].id, returnData.isler[i].musteriId),
                });
            }
        }
		

		const data = {
			columns: [
				{
					label: "Musteri Adi",
					field: "musteriAdi",
					sort: "asc",
					width: 150,
				},
				{
					label: "Brans Adi",
					field: "bransAdi",
					sort: "asc",
					width: 150,
				},
				{
					label: "Sigorta Sirketi",
					field: "sigortaSirketiAdi",
					sort: "asc",
					width: 150,
				},
				{
					label: "Arsiv",
					field: "arsivKlasoruAdi",
					sort: "asc",
					width: 150,
				},
				{
					label: "Plaka",
					field: "plaka",
					sort: "asc",
					width: 150,
				},
				{
					label: "Ruhsat Seri No",
					field: "ruhsatSeriNo",
					sort: "asc",
					width: 150,
				},
                {
					label: "Firma Komisyon Orani",
					field: "komisyonOraniFirma",
					sort: "asc",
					width: 150,
				},
				{
					label: "Police No",
					field: "policeNo",
					sort: "asc",
					width: 150,
				},
				{
					label: "Police Bitis Tarihi",
					field: "policeBitisTarihi",
					sort: "asc",
					width: 150,
				},
			],
			rows: processedData,
		};

		setFetchedData(data);
	};

	useEffect(() => {
		fetchData();
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
			<div className="drawer">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					{/* Toggle Button */}

					<div className="container my-5">
						<div className="flex justify-center align-center">
							<h1>
								<b style={{ fontSize: "30px" }}>Bireysel Isler</b>
							</h1>
						</div>
						<div className="d-flex justify-content-center align-items-center mt-3">
							<Link
								to="/is/bireysel/ekle"
								className="btn btn-success rounded mx-2"
							>
								Ekle
							</Link>
						</div>

						<MDBDataTable striped bordered hover data={fetchedData} />
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
