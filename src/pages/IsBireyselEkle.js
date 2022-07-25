import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";

export default function IsBireyselEkle(props) {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const { token, userId, setArsivId, erisimKodu, setNextPage } =
    useContext(MainContext);

  const [fetchedData, setFetchedData] = useState({
    musteriler: [],
    sigortaSirketleri: [],
    branslar: [],
    arsivKlasorleri: [],
  });
  const initialData = {
    erisimKodu: window.sessionStorage.getItem("erisimKodu"),
    arsivId: "",
    musteriId: "",
    bransId: "",
    sigortaSirketiId: "",
    arsivId: "",
    plaka: "",
    ruhsatSeriNo: "",
    policeNo: "",
    policeBitisTarihi: "",
  };

  

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
  };

  const postData = async () => {
    const response = await fetch("http://127.0.0.1:5000/is/bireysel/ekle/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialData),
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const ekle = () => {
    postData();
    setArsivId(initialData["arsivId"]);
    setNextPage("/is/bireysel");
    navigate("/bos");
  };

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
          <Link
            to="/home"
            className=" normal-case text-xl w-25 h-25 d-flex justify-content-start"
          >
            <img
              className="w-50"
              src={require("../assets/images/logo.jpeg")}
              alt=""
            />
          </Link>
        </div>
        <div className="flex-none">
					
					<span className="btn bg-green-500 hover:bg-green-500 mx-3 text-black"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>{window.sessionStorage.getItem("kullanici")}</span>
                    <Link to="/logout" className="link link-hover btn bg-red-700 text-white hover:bg-red-500">Cikis Yap</Link>
                           
				</div>
      </div>
      <div className="drawer ">
				<div className="drawer-content w-screen h-screen flex flex-column  align-center">
					{/* Toggle Button */}

					<div
						style={{ height: "100%" }}
						className="container mx-auto my-5 flex flex-col  items-center border-2 bg-gray-200"
					>
						<h1
							style={{ fontSize: "30px" }}
							className="border-y-2 border-indigo-500 flex justify-center py-4  w-1/4 mt-10 mb-4"
						>
							BIREYSEL IS EKLE
						</h1>

						<div className="form d-flex flex-column align-items-center mt-5">
							<label htmlFor="musteriler" className="input-group">
								<span className="w-40 flex justify-center">Müşteriler</span>
								<select
									className="w-52"
									onChange={(e) => {
										initialData["musteriId"] = e.target.value;
									}}
									id="musteriler"
									name="musteriler"
								>
                  <option
                       value=""
                      ></option>
									{fetchedData["musteriler"].map((musteriler) => {
                    initialData["musteriId"] = musteriler["id"];
                    return (
                      <option
                        key={musteriler["id"]}
                        value={"" + musteriler["id"]}
                      >
                        {musteriler["ad"]}
                      </option>
                    );
                  })}
								</select>
							</label>
							{/* initialData["musteriler"] = e.target.value */}

							<label htmlFor="branslar" className="input-group mt-3">
								<span className="w-40 flex justify-center">Ürünler</span>
								<select
									className="w-52"
									onChange={(e) => {
										initialData["bransId"] = e.target.value;
									}}
									id="branslar"
									name="branslar"
								>
                  <option
                       value=""
                      ></option>
									 {fetchedData["branslar"].map((branslar) => {
                    initialData["bransId"] = branslar["id"];
                    return (
                      <option key={branslar["id"]} value={"" + branslar["id"]}>
                        {branslar["ad"]}
                      </option>
                    );
                  })}
								</select>
							</label>

							<label htmlFor="arsivKlasorleri" className="input-group mt-3">
								<span className="w-40 flex justify-center">
									Arşiv Klasörleri
								</span>
								<select
									className="w-52"
									onChange={(e) => {
										initialData["arsivId"] = e.target.value;
									}}
									id="arsivId"
									name="arsivId"
								>
                  <option
                       value=""
                      ></option>
									{fetchedData["arsivKlasorleri"].map((arsivKlasorleri) => {
                    initialData["arsivId"] = arsivKlasorleri["id"];
                    return (
                      <option
                        key={arsivKlasorleri["id"]}
                        value={"" + arsivKlasorleri["id"]}
                      >
                        {arsivKlasorleri["ad"]}
                      </option>
                    );
                  })}
								</select>
							</label>

							<label htmlFor="sigortaSirketleri" className="input-group mt-3">
								<span className="w-40 flex justify-center">
									Sigorta Şirketleri
								</span>
								<select
									className="w-52"
									onChange={(e) => {
										initialData["sigortaSirketiId"] = e.target.value;
									}}
									id="sigortaSirketleri"
									name="sigortaSirketleri"
								>
                  <option
                       value=""
                      ></option>
									{fetchedData["sigortaSirketleri"].map((sigortaSirketleri) => {
                    initialData["sigortaSirketiId"] = sigortaSirketleri["id"];
                    return (
                      <option
                        key={sigortaSirketleri["id"]}
                        value={"" + sigortaSirketleri["id"]}
                      >
                        {sigortaSirketleri["ad"]}
                      </option>
                    );
                  })}
								</select>
							</label>

							<label htmlFor="plaka" className="input-group mt-3">
								<span className="w-40 flex justify-center">Plaka</span>
								<input
									className="w-52"
									onChange={(e) => {
										initialData["plaka"] = e.target.value;
									}}
								
									type="text"
									name="plaka"
								/>
							</label>

							<br />
							<label htmlFor="ruhsatSeriNo" className="input-group ">
								<span className="w-40 flex justify-center">Ruhsat Seri No</span>
								<input
									className="w-52"
									type="text"
									onChange={(e) => {
										initialData["ruhsatSeriNo"] = e.target.value;
									}}
									
									name="ruhsatSeriNo"
								/>
							</label>
							<br />

							<label htmlFor="policeNo" className="input-group">
								<span className="w-40 flex justify-center">Poliçe no</span>
								<input
									className="w-52"
									onChange={(e) => {
										initialData["policeNo"] = e.target.value;
									}}
									
									type="text"
									name="policeNo"
								/>
								<br />
							</label>

							<label htmlFor="policeBitisTarihi" className="input-group mt-3">
								<span className="w-40 flex justify-center">
									Poliçe Biriş Tarihi
								</span>
								<input
									className="w-52"
									onChange={(e) => {
										initialData["policeBitisTarihi"] = e.target.value;
									}}
									
									type="date"
									name="policeBitisTarihi"
								/>
							</label>

							{/* <button onClick={() => {guncelle()}} className='btn bg-green-200' >Guncelle</button> */}
							<button
								onClick={ekle}
								className="btn btn-success rounded mt-3"
							>
								Ekle
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
