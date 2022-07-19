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
				erisimKodu: window.sessionStorage.getItem("erisimKodu")
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
			<button className="btn bg-gray-50 text-dark hover:bg-gray-300 my-2" onClick={() => {
				navigation("/kullanicilar");
			}}>
				Kullanicilar
			</button>
			<button className="btn bg-gray-50 text-dark hover:bg-gray-300 my-2" onClick={() => {
				navigation("/firmalar");
			}}>
				Ortaklar
			</button>

			<button className="btn bg-gray-50 text-dark hover:bg-gray-300 my-2" onClick={() => {
				navigation("/branslar");
			}}>
				Ürünler
			</button>

			<button className="btn bg-gray-50 text-dark hover:bg-gray-300 my-2" onClick={() => {
				navigation("/arsivler");
			}}>
				Arsivler
			</button>

			<button className="btn bg-gray-50 text-dark hover:bg-gray-300 my-2" onClick={() => {
				navigation("/musteriler");
			}}>
				Musteriler
			</button>

			<button className="btn bg-gray-50 text-dark hover:bg-gray-300 my-2" onClick={() => {
				navigation("/sirketler");
			}}>
					Sigorta Firmaları
			</button>
			<button
							onClick={() => {
								
								navigation("/teklif");
							}}
							className=" btn text-black bg-yellow-300 hover:bg-gray-500 hover:text-white my-2"
						>
							Teklif Ver
						</button>

			<div className="dropdown dropdown-top " >
				<label
					tabIndex="0"
					className="btn btn-outline hover:btn-ghost w-full rounded"
				>
					Bireysel Isler
				</label>
				<ul
					tabIndex="0"
					style={{"position":"relative","top":"-50%"}}
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
			<div className="dropdown ">
				<label
					tabIndex="0"
					style={{"position":"relative","top":"-88%","z-index":"3"}}
					className="btn btn-outline hover:btn-ghost w-full rounded my-2"
				>
					Ortak Isler
				</label>
				<ul
					tabIndex="0" style={{"position":"relative","top":"-150%"}}
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
			
		</div>
	);
}
