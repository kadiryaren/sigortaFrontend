import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";

export default function KullaniciEkle(props) {
	const navigate = useNavigate();
	const { token, userId } = useContext(MainContext);
	const [fetchedData, setFetchedData] = useState([]);

	const [guncelleData, setGuncelleData] = useState({});

	const initialData = {
		erisimKodu: "e7644581-2584-4b58-ba60-73a48053ba8f",
		kullaniciAdi: "",
		sifre: "",
		alacaklarDuzenle: "",
		arsivKlasorleriDuzenle: "",
		bireyselIslerDuzenle: "",
		branslarDuzenle: "",
		firmalarDuzenle: "",
		kayitlarGoruntule: "",
		kullanicilarDuzenle: "",
		musterilerDuzenle: "",
		ortakIslerDuzenle: "",
		sigortaSirketleriDuzenle: "",
		verilenlerDuzenle: "",
	};

	const ekle = async () => {
		const response = await fetch("http://127.0.0.1:5000/kullanici/ekle/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(initialData),
		});

		const returnData = await response.json();
		await setFetchedData(returnData);
	};

	const ekleClick = () => {
		if (initialData.sifre === "") {
			window.alert("Mutlaka bir sifre girmelisiniz!");
		} else {
			console.log("object");
			ekle();
			navigate("/kullanicilar");
		}
	};

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
											Kullanici Adi
										</label>
									</div>
									<input
										type="text"
										className="form-control w-7/12 "
										onChange={(e) => {
											initialData.kullaniciAdi = e.target.value;
										}}
									/>
								</div>
								<br />
								<div className="flex">
									<div className="flex justify-start w-5/12 flex">
										<label htmlFor="" className="my-auto  flex justify-center ">
											Sifre
										</label>
									</div>
									<input
										type="text"
										className="form-control w-7/12"
										onChange={(e) => {
											initialData.sifre = e.target.value;
										}}
									/>
								</div>
							</div>
							<br />
							<h4
								style={{ fontSize: "30px" }}
								className="border-y-2 border-indigo-500 flex justify-center py-2 mb-2 w-1/2"
							>
								İzinler
							</h4>
							<div className="flex flex-column  align-center w-1/2">
								<div className="flex justify-between">
									<label htmlFor="">Alacakları Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.alacaklarDuzenle = e.target.checked;
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Arşiv Klasörleri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.arsivKlasorleriDuzenle = e.target.checked;
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Bireysel İşleri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.bireyselIslerDuzenle = e.target.checked;
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Branşları Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.branslarDuzenle = e.target.checked;
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Firmaları Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.firmalarDuzenle = e.target.checked;
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Kayıtları Görüntüle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.kayitlarGoruntule = e.target.checked;
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Kullanıcıları Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.kullanicilarDuzenle = e.target.checked;
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Müşterileri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.musterilerDuzenle = e.target.checked;
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Ortak İşleri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.ortakIslerDuzenle = e.target.checked;
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Sigorta Şirketlerini Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.sigortaSirketleriDuzenle = e.target.checked;
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Verilenleri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											initialData.verilenlerDuzenle = e.target.checked;
										}}
									/>
								</div>
								<button
									className="btn btn-primary rounded mt-3"
									onClick={ekleClick}
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
