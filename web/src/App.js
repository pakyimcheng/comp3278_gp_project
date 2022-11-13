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
	const [isLoading, setIsLoading] = useState(true);

	const [sessionID, setSessionID] = useState(0);

	// classID of the class in the next hour
	const [courseCode, setCourseCode] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [type, setType] = useState("");

	const [notification, setNotification] = useState([]);

	let interval = null;
	let intervalTutor = null;
	let intervalLecture = null;
	let intervalUpdateDuration = null;

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
				if (res?.data?.array && res?.data?.array[0]) {
					setCourseCode(res?.data?.array[0]?.course_code);
					setStartTime(res?.data?.array[0]?.start_time);
					setEndTime(res?.data?.array[0]?.end_time);
					setType("Lecture");
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
				if (res?.data?.array && res?.data?.array[0]) {
					setCourseCode(res?.data?.array[0]?.course_code);
					setStartTime(res?.data?.array[0]?.start_time);
					setEndTime(res?.data?.array[0]?.end_time);
					setType("Tutorial");
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
					...prev.slice(Math.max(prev.length - 2, 0)),
					`${courseCode} ${type} is starting soon!\nStart Time: ${startTime}\nEnd Time: ${endTime}`,
				];
			});
		}
	}, [startTime]);

	const updateFunc = () => {
		intervalUpdateDuration =
			!intervalUpdateDuration &&
			setInterval(() => {
				axios
					.post("http://127.0.0.1:5001/updateLoginDuration", {
						studentID: studentID,
						duration: Math.floor(duration / 1000),
					})
					.catch((err) => {
						console.log(err);
					});
			}, 5000);
	};

	useEffect(() => {
		updateFunc();

		return () => clearInterval(intervalUpdateDuration);
	}, [login, isLoading]);

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
			setIsLoading(false);
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
			setIP_Address("");
			setDuration(0);
			setCourseCode("");
			setStartTime("");
			setEndTime("");
			setType("");
			setNotification([]);
			clearInterval(interval);
			clearInterval(intervalTutor);
			clearInterval(intervalLecture);
			clearInterval(intervalUpdateDuration);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [login]);

	return (
		<BrowserRouter>
			<Navbar login={login} setLogin={setLogin} courseCode={courseCode} />
			<div className="App">
				{/* The user is currently logged in: {login ? "true" : "false"}
				<br />
				Email: {studentEmail}
				<br />
				SessionID: {sessionID}
				<br />
				Course Code = {courseCode}
				<br />
				studentID = {studentID} */}
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
								courseCode={courseCode}
							/>
						}
					/>
					<Route
						exact
						path="/timetable"
						element={<TimeTable studentID={studentID} />}
					/>
					<Route
						exact
						path="/class"
						element={
							<Class
								name={name}
								studentEmail={studentEmail}
								courseCode={courseCode}
								studentID={studentID}
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
