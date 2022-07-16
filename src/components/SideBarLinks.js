import React, { useContext } from "react";
import { useEffect,useState } from "react";
import { MainContext } from "../contex";
import { useNavigate } from "react-router-dom";

export default function () {
	const navigation = useNavigate();

	const { arsivId, setArsivId,erisimKodu } = useContext(MainContext);
	const[arsivler,setArsivler] = useState([])

	const getAllData = async () => {
		const response = await fetch("http://127.0.0.1:5000/arsiv/goster/hepsi/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				erisimKodu:erisimKodu
			}),
		});

		const returnData = await response.json();
		setArsivler(returnData.slice(1));
	};

	useEffect(() => {
		console.log("arsivID => " + arsivId);
	}, [arsivId]);

	useEffect(() => {
		getAllData();
	},[])

	useEffect(() => {
		console.log("arsivler");
		console.log(arsivler);
	},[arsivler])
	return (
		<div className="d-flex flex-column justify-content-center">
			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Kullanıcılar
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<a
							href="/kullanicilar"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm kullanıcılar
						</a>
					</li>
					<li className="my-2">
						<a
							href="/kullanici/ekle"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</a>
					</li>
				</ul>
			</div>
			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Firma
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<a
							href="/firmalar"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Firmalar
						</a>
					</li>
					<li className="my-2">
						<a
							href="/firma/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</a>
					</li>
				</ul>
			</div>
			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Branslar
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<a
							href="/branslar"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Branslar
						</a>
					</li>
					<li className="my-2">
						<a
							href="/brans/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</a>
					</li>
				</ul>
			</div>

			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Arsivler
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<a
							href="/arsivler"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Arsivler
						</a>
					</li>
					<li className="my-2">
						<a
							href="/arsiv/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</a>
					</li>
				</ul>
			</div>

			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Sirketler
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<a
							href="/sirketler"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Sirketler
						</a>
					</li>
					<li className="my-2">
						<a
							href="/sirket/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</a>
					</li>
				</ul>
			</div>
			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Musteriler
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<a
							href="/musteriler"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Musteriler
						</a>
					</li>
					<li className="my-2">
						<a
							href="/musteri/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</a>
					</li>
				</ul>
			</div>

			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Sirketler
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<a
							href="/sirketler"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Sirketler
						</a>
					</li>
					<li className="my-2">
						<a
							href="/sirket/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</a>
					</li>
				</ul>
			</div>

			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Bireysel Isler
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>


{
						arsivler.map((item) => {
							return (
								<li className="my-2">
									<button
										onClick={() => {
											setArsivId(item.id);

											navigation("/is/ortak");
										}}
										className=" bg-yellow-300 hover:bg-gray-500 hover:text-white "
									>
										{item.ad}
									</button>
								</li>
							)

						})
					}
					{/* <li className="my-2">
						<button
							onClick={() => {
								setArsivId(0);

								navigation("/is/bireysel");
							}}
							className=" bg-yellow-300 hover:bg-gray-500 hover:text-white"
						>
							Genel
						</button>
					</li>
					<li className="my-2">
						<button
							onClick={() => {
								setArsivId(1);

								navigation("/is/bireysel");
							}}
							className=" bg-green-300 hover:bg-gray-500 hover:text-white"
						>
							Onemli
						</button>
					</li>
					<li className="my-2">
						<button
							onClick={() => {
								setArsivId(2);

								navigation("/is/bireysel");
							}}
							className=" bg-red-200 hover:bg-gray-500 hover:text-white"
						>
							Silinmisler
						</button>
					</li> */}
				</ul>
			</div>
			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Ortak Isler
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>

					{
						arsivler.map((item) => {
							return (
								<li className="my-2">
									<button
										onClick={() => {
											setArsivId(item.id);

											navigation("/is/ortak");
										}}
										className=" bg-yellow-300 hover:bg-gray-500 hover:text-white "
									>
										{item.ad}
									</button>
								</li>
							)

						})
					}
					{/* <li className="my-2">
						<button
							onClick={() => {
								setArsivId(0);

								navigation("/is/ortak");
							}}
							className=" bg-yellow-300 hover:bg-gray-500 hover:text-white "
						>
							Genel
						</button>
					</li>
					<li className="my-2">
						<button
							onClick={() => {
								setArsivId(1);

								navigation("/is/ortak");
							}}
							className=" bg-green-300 hover:bg-gray-500 hover:text-white"
						>
							Onemli
						</button>
					</li>
					<li className="my-2">
						<button
							onClick={() => {
								setArsivId(2);

								navigation("/is/ortak");
							}}
							className=" bg-red-200 hover:bg-gray-500 hover:text-white"
						>
							Silinmisler
						</button>
					</li> */}
				</ul>
			</div>
			<button
							onClick={() => {
								
								navigation("/teklif");
							}}
							className=" btn text-black bg-yellow-300 hover:bg-gray-500 hover:text-white "
						>
							Teklif Ver
						</button>
		</div>
	);
}
