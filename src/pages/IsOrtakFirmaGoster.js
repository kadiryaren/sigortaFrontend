import React, { useState } from "react";
import { useEffect } from "react";
import {} from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SideBarLinks from "../components/SideBarLinks";

export default function IsOrtakFirmaGoster() {
	const navigate = useNavigate();
	const {
		arsivId,
		musteriId,
		setMusteriId,
		erisimKodu,
		isId,
		setIsId,
		firmaId,
		setFirmaId,
	} = useContext(MainContext);

	const [fetchedData, setFetchedData] = useState([]);
	const click = (id, musteriId) => {
		setMusteriId(musteriId);
		setIsId(id);

		navigate("/is/bireysel/arsiv/tek");
	};

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
			}),
		});

		const returnVAL = await response.json();
		console.log(returnVAL.durum);
	};

	const silClick = () => {
		if (window.confirm("Firma Silinecek Emin Misiniz?") == true) {
			sil();
			navigate("/firmalar");
		}
	};

	const guncelle = () => {
		navigate("/firma/guncelle/");
	};

	const fetchData = async () => {
		const response = await fetch(
			"http://127.0.0.1:5000/is/ortak/firma/goster/hepsi/",
			{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					erisimKodu: window.sessionStorage.getItem("erisimKodu"),
					firmaId: firmaId,
				}),
			}
		);

		const returnData = await response.json();
		console.log(returnData);
		const processedData = [];
		for (let i = 1; i < Array.from(returnData.keys()).length; i++) {
			processedData.push({
				musteriAdi: returnData[i].musteriAdi,
				bransAdi: returnData[i].bransAdi,
				sigortaSirketiAdi: returnData[i].sigortaSirketiAdi,
				arsivKlasoruAdi: returnData[i].arsivKlasoruAdi,
				plaka: returnData[i].plaka,
				ruhsatSeriNo: returnData[i].ruhsatSeriNo,
				policeBitisTarihi: returnData[i].policeBitisTarihi,
				firmaAdi: returnData[i].firmaAdi,

				clickEvent: () => click(returnData[i].id, returnData[i].musteriId),
			});
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
					label: "Ortak Adı",
					field: "firmaAdi",
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
					label: "Police Bitis Tarihi",
					field: "policeBitisTarihi",
					sort: "asc",
					width: 150,
				},
			],
			rows: processedData,
		};

		await setFetchedData(data);
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
					<div className="container my-5">
						<div className="flex justify-center align-center">
							<h1>
								<b style={{ fontSize: "30px" }}>ORTAK İLE YAPILAN İŞLER</b>
							</h1>
						</div>
						<div className="d-flex w-100 justify-content-center align-items-center mt-4">
							<a
								onClick={silClick}
								className="btn btn-error mx-2 hover:bg-red-300 hover:text-white rounded-md"
							>
								Ortak Sil
							</a>
							<a
								onClick={guncelle}
								className="btn btn-success mx-2 mx-2 hover:bg-green-300 hover:text-white rounded-md"
							>
								Ortak Güncelle
							</a>
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
