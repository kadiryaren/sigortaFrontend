import React, { useContext } from "react";
import { useEffect,useState } from "react";
import { MainContext } from "../contex";
import { useNavigate,Link } from "react-router-dom";
import {AiOutlineRight, AiOutlineDown} from 'react-icons/ai'

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
			<button className="btn  btn-primary btn-grad my-2 round-it flex justify-content-center relative" onClick={() => {
				navigation("/kullanicilar");
			}}>
				<p>Kullanicilar</p>
				<AiOutlineRight className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"/>
			</button>
			<button className="btn  btn-primary btn-grad my-2 round-it flex justify-content-center relative" onClick={() => {
				navigation("/firmalar");
			}}>
				Ortaklar
				<AiOutlineRight className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"/>
			</button>
			<button className="btn  btn-primary btn-grad my-2 round-it flex justify-content-center relative" onClick={() => {
				navigation("/branslar");
			}}>
				Ürünler
				<AiOutlineRight className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"/>
			</button>
			<button className="btn  btn-primary btn-grad my-2 round-it flex justify-content-center relative" onClick={() => {
				navigation("/arsivler");
			}}>
				Arsivler
				<AiOutlineRight className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"/>
			</button>

			<button className="btn  btn-primary btn-grad my-2 round-it flex justify-content-center relative" onClick={() => {
				navigation("/musteriler");
			}}>
				Musteriler
				<AiOutlineRight className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"/>
			</button>

			<button className="btn  btn-primary btn-grad my-2 round-it flex justify-content-center relative" onClick={() => {
				navigation("/borclular");
			}}>
				Borclular
				<AiOutlineRight className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"/>
			</button>

			<button className="btn btn-primary btn-grad my-2 round-it flex justify-content-center relative" onClick={() => {
				navigation("/sirketler");
			}}>
					Sigorta Firması
				<AiOutlineRight className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"/>
			</button>

			
			

			<button
							onClick={() => {
								
								navigation("/teklif");
							}}
							className=" btn  btn-primary btn-grad my-2 round-it flex justify-content-center relative"
						>
							Teklif Ver
							<AiOutlineRight className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"/>
						</button>

			<div className="dropdown dropdown-top " >
				<label
					tabIndex="0"
					className="btn  btn-primary btn-grad my-2 round-it flex justify-content-center relative"
				>
					Bireysel Isler
					<AiOutlineDown className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" />
				</label>
				<ul
					tabIndex="0"
					// style={{"position":"relative","top":"-50%"}}
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>


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
										className=" bg-blue-500 hover:bg-blue-800 rounded text-white hover:text-white "
									>
										{item.ad}
									</button>
								</li>
							)

						})
					}
					
				</ul>
			</div>
			<div className="dropdown dropdown-top ">
				<label
					tabIndex="0"
					// style={{"position":"relative","top":"-82%","z-index":"3"}}
					className="btn  btn-primary btn-grad my-2 round-it flex justify-content-center relative"
				>
					Ortak Isler
					<AiOutlineDown className="absolute right-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"/>
				</label>
				<ul
				tabIndex="0" 
					// style={{"position":"relative","top":"-150%"}}
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					
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
										className=" bg-blue-500 hover:bg-blue-800 rounded text-white hover:text-white"
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
