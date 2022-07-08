import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { MainContext, useContext } from "../contex";
import SideBarLinks from "../components/SideBarLinks";
import { useNavigate } from "react-router-dom";

export default function MusteriGuncelle(props) {
  const navigate = useNavigate();
  const { musteriId, setMusteriId, musteriData, setMusteriData } =
    useContext(MainContext);
  

  let defaultDate = null;
  const initialData = {
    erisimKodu: "e7644581-2584-4b58-ba60-73a48053ba8f",
    musteriId: musteriId,
    musteriAdi: musteriData.ad,
    musteriSoyadi: musteriData.soyad,
    musteriTc: musteriData.tc,
    musteriTelefon: musteriData.telefon,
    musteriDogumTarihi: musteriData.dogumTarihi,
    musteriMailAdresi: musteriData.mailAdresi,
  };

  useEffect(() => {
    defaultDate = new Date(
      musteriData.dogumTarihi.split("-")[2] +
        "-" +
        musteriData.dogumTarihi.split("-")[1] +
        "-" +
        musteriData.dogumTarihi.split("-")[0]
    );
  }, []);

  const update = async () => {
    const response = await fetch("http://127.0.0.1:5000/musteri/guncelle/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialData),
    });
  };

  const guncelle = () => {
    update();
    navigate("/musteriler");
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
          
            className="container d-flex flex-column align-items-center bg-gray-200 mt-3 rounded"
          >
            <div
              style={{ height: "25%", "fontSize": "30px" }}
              className="w-50 p-0 bg-warning rounded d-flex justify-content-center align-items-center mt-3"
            >
              Brans Adi
            </div>

            <div className="form d-flex flex-column align-items-center w-100 mt-3">
              <div className="d-flex flex-column justify-content-center align-items-start w-100">
                <label htmlhtmlFor="">Musteri Adi:</label>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={musteriData.ad}
                    onChange={(e) => {
                    initialData.musteriAdi = e.target.value;
                    }}
                />
              </div>
             
              <label htmlhtmlFor="">Soyad</label>
              <input
                type="text"
                className="form-control"
                defaultValue={musteriData.soyad}
                onChange={(e) => {
                  initialData.musteriSoyadi = e.target.value;
                }}
              />
              <br />
              <label htmlhtmlFor="">Tc</label>
              <input
                type="text"
                className="form-control"
                defaultValue={musteriData.tc}
                onChange={(e) => {
                  initialData.musteriTc = e.target.value;
                }}
              />
              <br />
              <label htmlhtmlFor="">Telefon</label>
              <input
                type="text"
                className="form-control"
                defaultValue={musteriData.telefon}
                onChange={(e) => {
                  initialData.musteriTelefon = e.target.value;
                }}
              />
              <br />

              <label htmlhtmlFor="">Musteri Dogum Tarihi</label>
              <input
                type="date"
                className="form-control"
                defaultValue={defaultDate}
                onChange={(e) => {
                  initialData.musteriDogumTarihi = e.target.value;
                }}
              />
              <br />
              <label htmlhtmlFor="">Musteri Mail Adresi</label>
              <input
                type="text"
                className="form-control"
                defaultValue={initialData.musteriMailAdresi}
                onChange={(e) => {
                  initialData.musteriMailAdresi = e.target.value;
                }}
              />
              <br />
              <button className="btn bg-green-200" onClick={guncelle}>
                Guncelle
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
