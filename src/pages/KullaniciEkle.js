import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate,Link } from "react-router-dom";

export default function KullaniciEkle(props) {
	const navigate = useNavigate();
	const { token, userId ,erisimKodu,setNextPage} = useContext(MainContext);
	const [fetchedData, setFetchedData] = useState([]);

	const [guncelleData, setGuncelleData] = useState({});

	const initialData = {
		erisimKodu: window.sessionStorage.getItem("erisimKodu"),
		kullaniciAdi: "",
		sifre: "",
		alacaklarDuzenle: 0,
		arsivKlasorleriDuzenle: 0,
		bireyselIslerDuzenle: 0,
		branslarDuzenle: 0,
		firmalarDuzenle: 0,
		kayitlarGoruntule: 0,
		kullanicilarDuzenle: 0,
		musterilerDuzenle: 0,
		ortakIslerDuzenle: 0,
		sigortaSirketleriDuzenle: 0,
		verilenlerDuzenle: 0,
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
		setFetchedData(returnData);
		setNextPage("/kullanicilar");
		navigate("/bos");
		
	};

	const ekleClick = () => {
		if(initialData.kullaniciAdi ==="" || initialData.sifre === "" ){
			alert("Lütfen eksik alanları doldurun!");
		}else{
		
			ekle();	
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
											if(e.target.checked){
												initialData.alacaklarDuzenle = 1;
											}else{
												initialData.alacaklarDuzenle = 0;
											}
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Arşiv Klasörleri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											if(e.target.checked){

												initialData.arsivKlasorleriDuzenle = 1;
											}else{
												initialData.arsivKlasorleriDuzenle = 0;
											}
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Bireysel İşleri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {

											if(e.target.checked){

												initialData.bireyselIslerDuzenle = 1;
											}else{
												initialData.bireyselIslerDuzenle = 0;
											}
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Branşları Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											if(e.target.checked){
												initialData.branslarDuzenle = 1;
											}else{
												initialData.branslarDuzenle = 0;
											}
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Firmaları Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											if(e.target.checked){
												initialData.firmalarDuzenle =  1;
											}else{
												initialData.firmalarDuzenle =  0;
											}
										}}
									/>
								</div>

								<div className="flex justify-between">
									<label htmlhtmlFor="">Kayıtları Görüntüle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											if(e.target.checked){

												initialData.kayitlarGoruntule = 1;
											}else{
												initialData.kayitlarGoruntule = 0;
											}
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Kullanıcıları Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											if(e.target.checked){

												initialData.kullanicilarDuzenle = 1;
											}else{
												initialData.kullanicilarDuzenle = 0;
											}
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Müşterileri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											if(e.target.checked){
												initialData.musterilerDuzenle = 1;
											}else{
												initialData.musterilerDuzenle = 0;
											}
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Ortak İşleri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											if(e.target.checked){

												initialData.ortakIslerDuzenle =1;
											}else{
												initialData.ortakIslerDuzenle =0;
											}
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Sigorta Şirketlerini Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											if(e.target.checked){

												initialData.sigortaSirketleriDuzenle = 1;
											}else{
												initialData.sigortaSirketleriDuzenle = 0;
											}
										}}
									/>
								</div>
								<div className="flex justify-between">
									<label htmlhtmlFor="">Verilenleri Düzenle</label>
									<input
										type="checkbox"
										className="checkbox checkbox-accent checkbox-md"
										onChange={(e) => {
											if(e.target.checked){

												initialData.verilenlerDuzenle = 1;
											}else{
												initialData.verilenlerDuzenle = 0;
											}
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
