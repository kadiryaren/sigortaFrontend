import  './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router,Routes, Route} from  "react-router-dom";
import { MainContext } from './contex';
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {

  const[token, setToken] = useState(false);
  const[basePath, setBasePath] = useState("http://localhost:5000");
  const data = {
    token,
    setToken
  }

	return (
		<MainContext.Provider value={data}>
			<Router>
        <Routes>
          <Route  path="/"  element={<Home  />}  />
        </Routes>
        <Routes>
          <Route  path="/login"  element={<Login  />}  />
        </Routes>
			</Router>
		</MainContext.Provider>
	);

}