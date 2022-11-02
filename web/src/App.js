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
	const [studentEmail, setStudentEmail] = useState("");
	const [duration, setDuration] = useState(0);

	const [sessionID, setSessionID] = useState(0);

	// classID of the class in the next hour
	const [courseCode, setCourseCode] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const [notification, setNotification] = useState([]);

	let interval = null;
	let intervalTutor = null;
	let intervalLecture = null;

	const getData = async () => {
		const res = await axios.get("https://geolocation-db.com/json/");
		setIP_Address(res.data.IPv4);
	};

	const getOneHourLecture = async () => {
		axios
			.post(
				"http://127.0.0.1:5001/getNearOneHourLecture?studentID=" + studentID
			)
			.then(async function (res) {
				console.log(res.data);
				if (res.data[0]) {
					setCourseCode(res.data[0].course_code);
					setStartTime(res.data[0].start_time);
					setEndTime(res.data[0].end_time);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getOneHourTutorial = async () => {
		axios
			.post(
				"http://127.0.0.1:5001/getNearOneHourTutorial?studentID=" + studentID
			)
			.then(async function (res) {
				console.log(res.data);
				if (res.data[0]) {
					setCourseCode(res.data[0].course_code);
					setStartTime(res.data[0].start_time);
					setEndTime(res.data[0].end_time);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (startTime !== "") {
			setNotification((prev) => {
				return [
					...prev,
					`Course ${courseCode} is about to begin! \n start:${startTime} \n end: ${endTime}`,
				];
			});
		}
	}, [startTime]);

	// on login change to true, call localhost:5001/createLogin info with JSON IP_Address and studentID
	useEffect(() => {
		if (login) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			interval = setInterval(() => {
				setDuration((prev) => (prev += 10));
			}, 10);
			getData();
			axios
				.post("http://127.0.0.1:5001/createLoginInfo", {
					IP_Address: IP_Address,
					studentID: studentID,
				})
				.then(async function (res) {
					setSessionID(res.data.sessionID);
				})
				.catch((err) => {
					console.log(err);
				});
			//getNearOneHourTutorial on 1 minute base
			// eslint-disable-next-line react-hooks/exhaustive-deps
			intervalTutor = setInterval(() => {
				getOneHourTutorial();
			}, 60000);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			intervalLecture = setInterval(() => {
				getOneHourLecture();
			}, 60000);
			getOneHourLecture();
			getOneHourTutorial();
		}
		if (!login) {
			setName("");
			setStudentID("");
			setStudentEmail("");
			clearInterval(interval);
			clearInterval(intervalTutor);
			clearInterval(intervalLecture);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [login]);

	return (
		<BrowserRouter>
			<Navbar login={login} setLogin={setLogin} />
			<div className="App">
				The user is currently logged in: {login ? "true" : "false"}
				<br />
				Email: {studentEmail}
				<br />
				SessionID: {sessionID}
				<br />
				Course Code = {courseCode}
				<Routes>
					<Route
						exact
						path="/"
						element={
							<Home
								name={name}
								login={login}
								duration={duration}
								notification={notification}
							/>
						}
					/>
					<Route exact path="/timetable" element={<TimeTable />} />
					<Route
						exact
						path="/class"
						element={
							<Class
								name={name}
								studentEmail={studentEmail}
								courseCode={courseCode}
							/>
						}
					/>
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
								setStudentEmail={setStudentEmail}
							/>
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
