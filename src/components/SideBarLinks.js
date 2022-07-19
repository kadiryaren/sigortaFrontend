import React, { useContext } from "react";
import { useEffect,useState } from "react";
import { MainContext } from "../contex";
import { useNavigate,Link } from "react-router-dom";

export default function () {
	const navigation = useNavigate();

	const { arsivId, setArsivId,erisimKodu,setNextPage } = useContext(MainContext);
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
						<Link
							to="/kullanicilar"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm kullanıcılar
						</Link>
					</li>
					<li className="my-2">
						<Link
							to="/kullanici/ekle"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</Link>
					</li>
				</ul>
			</div>
			<button className="btn btn-success hover:btn-green-500 my-2" onClick={() => {
				navigation("/firmalar");
			}}>
				Ortaklar
			</button>

			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Ortaklar
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<Link
							to="/firmalar"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Firmalar
						</Link>
					</li>
					<li className="my-2">
						<Link
							to="/firma/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</Link>
					</li>
				</ul>
			</div>

			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Ortaklar
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<Link
							to="/firmalar"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Firmalar
						</Link>
					</li>
					<li className="my-2">
						<Link
							to="/firma/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</Link>
					</li>
				</ul>
			</div>
			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Ürünler
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<Link
							to="/branslar"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Branslar
						</Link>
					</li>
					<li className="my-2">
						<Link
							to="/brans/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</Link>
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
						<Link
							to="/arsivler"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Arsivler
						</Link>
					</li>
					<li className="my-2">
						<Link
							to="/arsiv/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</Link>
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
						<Link
							to="/musteriler"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Musteriler
						</Link>
					</li>
					<li className="my-2">
						<Link
							to="/musteri/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</Link>
					</li>
				</ul>
			</div>

			<div className="dropdown">
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Sigorta Firmaları
				</label>
				<ul
					tabIndex="0"
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li className="my-2">
						<Link
							to="/sirketler"
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Tüm Sirketler
						</Link>
					</li>
					<li className="my-2">
						<Link
							to="/sirket/ekle/ "
							className=" bg-gray-200 hover:bg-gray-500 hover:text-white"
						>
							Ekle
						</Link>
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
					<li className="my-2">
						<Link
							to="/is/bireysel/yaklasan"
							className=" bg-green-300 hover:bg-gray-500 hover:text-white"
						>
							Yaklasan Bireysel Isler
						</Link>
					</li>


{
						arsivler.map((item) => {
							return (
								<li className="my-2">
									<button
										onClick={() => {
											setArsivId(item.id);
											setNextPage("/is/bireysel");
											navigation("/bos");
										}}
										className=" bg-yellow-300 hover:bg-gray-500 hover:text-white "
									>
										{item.ad}
									</button>
								</li>
							)

						})
					}
					
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
					<li className="my-2">
						<Link
							to="/is/ortak/yaklasan"
							className=" bg-green-300 hover:bg-gray-500 hover:text-white"
						>
							Yaklasan Ortak Isler
						</Link>
					</li>

					{
						arsivler.map((item) => {
							return (
								<li className="my-2">
									<button
										onClick={() => {
											setArsivId(item.id);
											setNextPage("/is/ortak");
											navigation("/bos");
										}}
										className=" bg-yellow-300 hover:bg-gray-500 hover:text-white "
									>
										{item.ad}
									</button>
								</li>
							)

						})
					}
					
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
