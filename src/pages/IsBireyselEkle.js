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
          <Link className="btn btn-error hover:text-white" to="/logout">
            Çıkış Yap
          </Link>
        </div>
      </div>
      <div className="drawer ">
        <div className="drawer-content w-screen h-screen flex flex-column  align-center">
          {/* Toggle Button */}

          <div
            style={{ height: "100%" }}
            className="container mx-auto my-5 flex flex-column   items-center border-2 "
          >
            <h1
              style={{ fontSize: "30px" }}
              className="border-y-2 border-indigo-500 flex justify-center py-4  w-1/4 mt-10 mb-4"
            >
              Bireysel İş Ekle
            </h1>

            <div className="form d-flex flex-column align-center w-1/3">
              <div className="flex justify-center w-full  mt-3">
                <label htmlFor="musteriler" className="input-group ">
                  <span className="w-40 flex justify-center">Müşteriler</span>
                </label>
                <select
                  className="w-48"
                  onChange={(e) => {
                    initialData["musteriId"] = e.target.value;
                  }}
                  id="musteriler"
                  name="musteriler"
                >
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
              </div>
              {/* initialData["musteriler"] = e.target.value */}
              <div className="flex justify-center mt-3  w-full">
                <label htmlFor="branslar" className="input-group ">
                  <span className="w-40 flex justify-center">Ürünler</span>
                </label>

                <select
                  className="w-48"
                  onChange={(e) => {
                    initialData["bransId"] = e.target.value;
                  }}
                  id="branslar"
                  name="branslar"
                >
                  {fetchedData["branslar"].map((branslar) => {
                    initialData["bransId"] = branslar["id"];
                    return (
                      <option key={branslar["id"]} value={"" + branslar["id"]}>
                        {branslar["ad"]}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex justify-center mt-3  w-full">
                <label htmlFor="sigortaSirketleri" className="input-group ">
                  <span className="w-40 flex justify-center">
                    Sigorta Şirketleri
                  </span>
                </label>
                <select
                  className="w-48"
                  onChange={(e) => {
                    initialData["sigortaSirketiId"] = e.target.value;
                  }}
                  id="sigortaSirketleri"
                  name="sigortaSirketleri"
                >
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
              </div>

              <div className="flex justify-center mt-3  w-full">
                <label htmlFor="arsivKlasorleri" className="input-group ">
                  <span className="w-40 flex justify-center">
                    Arşiv Klasörü
                  </span>{" "}
                </label>

                <select
                  className="w-48"
                  onChange={(e) => {
                    initialData["arsivId"] = e.target.value;
                  }}
                  id="arsivKlasorleri"
                  name="arsivKlasorleri"
                >
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
              </div>

              <div className="flex justify-center mt-3  w-full ">
                <label htmlFor="plaka" className="input-group ">
                  <span className="w-40 flex justify-center">Plaka</span>
                </label>

                <input
                  className="w-48 input-sm input-secondary"
                  onChange={(e) => {
                    initialData["plaka"] = e.target.value;
                  }}
                  type="text"
                  name="plaka"
                  placeholder="Plaka Giriniz:"
                />
              </div>

              <div className="flex justify-center mt-3  w-full">
                <label htmlFor="ruhsatSeriNo" className="input-group ">
                  <span className="w-40 flex justify-center p-1">
                    Ruhsat Seri No
                  </span>
                </label>

                <input
                  className="w-48 input-sm input-secondary"
                  type="text"
                  onChange={(e) => {
                    initialData["ruhsatSeriNo"] = e.target.value;
                  }}
                  name="ruhsatSeriNo"
                  placeholder="Ruhsat Seri No Giriniz:"
                />
              </div>

              <div className="flex justify-center mt-3  w-full">
                <label htmlFor="policeNo" className="input-group">
                  <span className="w-40 flex justify-center">Poliçe No</span>
                </label>

                <input
                  className="w-48 input-sm input-secondary"
                  onChange={(e) => {
                    initialData["policeNo"] = e.target.value;
                  }}
                  type="text"
                  name="policeNo"
                  placeholder="Police No Giriniz:"
                />
              </div>

              <div className="flex justify-center mt-3  w-full">
                <label htmlFor="policeBitisTarihi" className="input-group">
                  <span className="w-40 flex justify-center">
                    Poliçe Bitiş Tarihi
                  </span>
                </label>

                <input
                  className="w-48 input-sm input-secondary"
                  onChange={(e) => {
                    initialData["policeBitisTarihi"] = e.target.value;
                  }}
                  type="date"
                  name="policeBitisTarihi"
                />
              </div>

              {/* <button onClick={() => {ekle()}} className='btn bg-green-200' >Ekle</button> */}
              <button
                onClick={ekle}
                className="btn btn-success rounded-md hover:btn-ghost "
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
