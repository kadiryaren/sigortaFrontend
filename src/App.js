import  './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router,Routes, Route} from  "react-router-dom";
import { MainContext } from './contex';
import Home from './pages/Home';
import Login from './pages/Login';
import TumKullanicilar from './pages/TumKullanicilar';

export default function App() {

  const[token, setToken] = useState(false);
  const[userId,setUserId] = useState(false);

  const data = {
    token,
    setToken,
    userId,
    setUserId

  }

	return (
		<MainContext.Provider value={data}>
			<Router>
      <Routes>
          <Route  path="/"  element={<Home  />}  />
        </Routes>
        <Routes>
          <Route  path="/kullanicilar"  element={<TumKullanicilar  />}  />
        </Routes>
        <Routes>
          <Route  path="/login"  element={<Login  />}  />
        </Routes>
			</Router>
		</MainContext.Provider>
	);

}