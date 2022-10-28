import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/home";
import TimeTable from "./pages/timetable";
import Login from "./pages/login";
import Records from "./pages/records";
import Class from "./pages/class";

function App() {
	const [login, setLogin] = useState(false);

	return (
		<BrowserRouter>
			<Navbar login={login} setLogin={setLogin} />
			<div className="App">
				The user is currently logged in: {login ? "true" : "false"}
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/timetable" element={<TimeTable />} />
					<Route exact path="/class" element={<Class />} />
					<Route exact path="/records" element={<Records />} />
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
