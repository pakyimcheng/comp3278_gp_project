import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/home";
import TimeTable from "./pages/timetable";
import Login from "./pages/login";
import Records from "./pages/records";
import Class from "./pages/class";

function App() {
	const [login, setLogin] = useState(false);
	const [name, setName] = useState("");
	const [studentID, setStudentID] = useState("");
	const [IP_Address, setIP_Address] = useState("");

	const getData = async () => {
		const res = await axios.get("https://geolocation-db.com/json/");
		setIP_Address(res.data.IPv4);
	};

	// on login change to true, call localhost:5001/createLogin info with JSON IP_Address and studentID
	useEffect(() => {
		if (login) {
			getData();
			axios
				.post("http://127.0.0.1:5001/createLoginInfo", {
					IP_Address: IP_Address,
					studentID: studentID,
				})
				.then(async function (res) {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (!login) {
			setName("");
			setStudentID("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [login]);

	return (
		<BrowserRouter>
			<Navbar login={login} setLogin={setLogin} />
			<div className="App">
				The user is currently logged in: {login ? "true" : "false"}
				<Routes>
					<Route exact path="/" element={<Home name={name} />} />
					<Route exact path="/timetable" element={<TimeTable />} />
					<Route exact path="/class" element={<Class />} />
					<Route
						exact
						path="/records"
						element={
							<Records
								name={name}
								studentID={studentID}
								IP_Address={IP_Address}
							/>
						}
					/>
					<Route
						exact
						path="/login"
						element={
							<Login
								IP_Address={IP_Address}
								setIP_Address={setIP_Address}
								setStudentID={setStudentID}
								setLogin={setLogin}
								setName={setName}
							/>
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
