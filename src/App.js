import  './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router,Routes, Route} from  "react-router-dom";
import { MainContext } from './contex';
import Home from './pages/Home';
import Root from './pages/Root';
import Login from './pages/Login';
import TumKullanicilar from './pages/TumKullanicilar';
import CikisYap from './components/CikisYap';
import TekKullanici from './pages/TekKullanici';
import KullaniciGuncelle from './pages/KullaniciGuncelle';
import KullaniciEkle from './pages/KullaniciEkle';
import Firmalar from './pages/Firmalar';
import TekFirma from './pages/TekFirma';
import FirmaGuncelle from './pages/FirmaGuncelle';
import FirmaEkle from './pages/FirmaEkle';
import Branslar from './pages/Branslar';
import TekBrans from './pages/TekBrans';
import BransEkle from './pages/BransEkle';
import BransGuncelle from './pages/BransGuncelle';
import ArsivEkle from './pages/ArsivEkle';
import Arsivler from './pages/Arsivler';
import TekArsiv from './pages/TekArsiv';
import ArsivGuncelle from './pages/ArsivGuncelle';
import Sirketler from './pages/Sirketler';
import TekSirket from './pages/TekSirket';
import Musteriler from './pages/Musteriler';
import TekMusteri from './pages/TekMusteri';
import MusteriGuncelle from './pages/MusteriGuncelle';
import MusteriEkle from './pages/MusteriEkle';
import SirketGuncelle from './pages/SirketGuncelle';
import SirketEkle from './pages/SirketEkle';
import IsBireyselArsivGoster from './pages/IsBireyselArsivGoster';
import IsBireyselMusteriGoster from './pages/IsBireyselMusteriGoster';
import IsBireyselArsivTek from './pages/IsBireyselArsivTek';
import IsOrtakArsivGoster from './pages/IsOrtakArsivGoster';
import IsOrtakArsivTek from './pages/IsOrtakArsivTek';
import IsOrtakMusteriGoster from './pages/IsOrtakMusteriGoster';
import IsOrtakFirmaGoster from './pages/IsOrtakFirmaGoster';
import IsBireyselEkle from './pages/IsBireyselEkle';
import IsBireyselGuncelle from './pages/IsBireyselGuncelle';
import IsOrtakGuncelle from './pages/IsOrtakGuncelle';
import IsOrtakEkle from './pages/IsOrtakEkle';
import AlacakTek from './pages/AlacakTek';
import AlacakEkle from './pages/AlacakEkle';
import VerecekEkle from './pages/VerecekEkle';

export default function App() {

  const[token, setToken] = useState(false);
  const[userId,setUserId] = useState(false);
  const[firmaId,setFirmaId] = useState(false);
  const[firmaAdi,setFirmaAdi] = useState(false);
  const[bransId,setBransId] = useState(false);
  const[bransAdi,setBransAdi] = useState(false);
  const[arsivKlasoruId,setarsivKlasoruId] = useState(false);
  const[arsivKlasoruAdi,setarsivKlasoruAdi] = useState(false);
  const[sigortaSirketiId,setSigortaSirketiId] = useState(false);
  const[sigortaSirketiAdi,setSigortaSirketiAdi] = useState(false);
  const[sirketPhoto,setSirketPhoto] = useState(false);
  const[musteriId,setMusteriId] = useState(false);
  const[musteriData,setMusteriData] = useState(false);
  const[isBireyselId,setIsBireyselId] = useState(false);
  const[isBireyselData,setIsBireyselData] = useState(false);
  const[arsivId,setArsivId] = useState("kadir");
  const[isId,setIsId] = useState(false);
  const[isTuru,setIsTuru] = useState();
  const[alacakId,setAlacakId] = useState(-1);
  const[verecekId,setVerecekId] = useState(-1);



  const data = {
    token,
    setToken,
    userId,
    setUserId,
    firmaId,
    setFirmaId,
    firmaAdi,
    setFirmaAdi,
    bransId,
    setBransId,
    bransAdi,
    setBransAdi,
    arsivKlasoruId,
    setarsivKlasoruId,
    arsivKlasoruAdi,
    setarsivKlasoruAdi,
    sigortaSirketiId,
    setSigortaSirketiId,
    sigortaSirketiAdi,
    setSigortaSirketiAdi,
    sirketPhoto,
    setSirketPhoto,
    musteriId,
    setMusteriId,
    musteriData,
    setMusteriData,isBireyselId,setIsBireyselId,isBireyselData,setIsBireyselData,
    arsivId,setArsivId,isId,setIsId,verecekId,setVerecekId,alacakId,setAlacakId,isTuru,setIsTuru
  }

	return (
		<MainContext.Provider value={data}>
			<Router>
          <Routes>
            <Route  path="/"  element={<Root  />}  />
            <Route  path="/home"  element={<Home  />}  />
            <Route  path="/kullanicilar"  element={<TumKullanicilar  />}  />
            <Route  path="/kullanicilar/tek"  element={<TekKullanici  />}  />
            <Route  path="/kullanici/ekle"  element={<KullaniciEkle  />}  />
            <Route  path="/kullanici/guncelle"  element={<KullaniciGuncelle  />}  />
            <Route  path="/firmalar"  element={<Firmalar  />}  />
            <Route  path="/firma/tek"  element={<TekFirma  />}  />
            <Route  path="/firma/guncelle"  element={<FirmaGuncelle  />}  />
            <Route  path="/firma/ekle"  element={<FirmaEkle  />}  />
            <Route  path="/arsivler"  element={<Arsivler  />}  />
            <Route  path="/arsiv/ekle"  element={<ArsivEkle  />}  />
            <Route  path="/arsiv/tek"  element={<TekArsiv  />}  />
            <Route  path="/arsiv/guncelle"  element={<ArsivGuncelle  />}  />
            <Route  path="/branslar"  element={<Branslar  />}  />
            <Route  path="/brans/tek"  element={<TekBrans  />}  />
            <Route  path="/brans/ekle"  element={<BransEkle  />}  />
            <Route  path="/brans/guncelle"  element={<BransGuncelle  />}  />
            <Route  path="/sirketler"  element={<Sirketler  />}  />
            <Route  path="/sirket/tek"  element={<TekSirket  />}  />
            <Route  path="/sirket/ekle"  element={<SirketEkle  />}  />
            <Route  path="/sirket/guncelle/"  element={<SirketGuncelle  />}  />
            <Route  path="/musteriler"  element={<Musteriler  />}  />
            <Route  path="/musteri/tek"  element={<TekMusteri  />}  />
            <Route  path="/musteri/guncelle"  element={<MusteriGuncelle  />}  />
            <Route  path="/musteri/ekle"  element={<MusteriEkle  />}  />
            <Route  path="/is/bireysel"  element={<IsBireyselArsivGoster  />}  />
            <Route  path="/is/bireysel/ekle"  element={<IsBireyselEkle  />}  />
            <Route  path="/is/bireysel/guncelle"  element={<IsBireyselGuncelle  />}  />
            <Route  path="/is/bireysel/musteri"  element={<IsBireyselMusteriGoster  />}  />
            <Route  path="/is/bireysel/arsiv/tek"  element={<IsBireyselArsivTek  />}  />
            <Route  path="/is/ortak/arsiv/tek"  element={<IsOrtakArsivTek  />}  />
            <Route  path="/is/ortak/guncelle/"  element={<IsOrtakGuncelle  />}  />
            <Route  path="/is/ortak/ekle/"  element={<IsOrtakEkle  />}  />
            <Route  path="/alacak"  element={<AlacakTek  />}  />
            <Route  path="/alacak/ekle"  element={<AlacakEkle  />}  />
            <Route  path="/verecek/ekle"  element={<VerecekEkle  />}  />

            <Route  path="/is/ortak"  element={<IsOrtakArsivGoster  />}  />
            <Route  path="/is/ortak/musteri"  element={<IsOrtakMusteriGoster  />}  />
            <Route  path="/is/ortak/firma"  element={<IsOrtakFirmaGoster  />}  />
            
            <Route  path="/login"  element={<Login  />}  />
            <Route  path="/logout"  element={<CikisYap  />}  />
          </Routes>


			</Router>
		</MainContext.Provider>
	);

}