/* Code generated with AutoHTML for Figma */
import "./records.css";
import { format } from "date-fns";
import {
	Avatar,
	FormGroup,
	Pagination,
	Switch,
	FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import LoginRecord from "../components/LoginRecord";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Records({ ...props }) {
	const [records, setRecords] = useState([]);
	const [recordPageIndex, setRecordPageIndex] = useState(0);
	const [reversed, setReversed] = useState(false);
	const navigate = useNavigate();

	const handleRecordPageChange = (event, value) => {
		setRecordPageIndex(value - 1);
	};

	if (!props.studentID) {
		navigate("/login");
	}

	const label = { inputProps: { "aria-label": "Reversed" } };

	useEffect(() => {
		axios
			.post("http://127.0.0.1:5001/getLoginInfo", {
				studentID: props.studentID,
			})
			.then(async function (res) {
				setRecords(res.data.logininfo);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	navigator.sayswho = (function () {
		var ua = navigator.userAgent;
		var tem;
		var M =
			ua.match(
				/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
			) || [];
		if (/trident/i.test(M[1])) {
			tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
			return "IE " + (tem[1] || "");
		}
		if (M[1] === "Chrome") {
			tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
			if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
		}
		M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
		if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
		return M.join(" ");
	})();

	return (
		<div className="login-record">
			<div className="login-record-frame">
				<div className="login-record-info">
					<Avatar
						sx={{
							backgroundColor: "#d1f5ff",
							width: "216px",
							height: "216px",
						}}
					/>
					<div className="user-name-box">
						<div className="user-name">User Name</div>
						<div className="mark">{props.name}</div>
					</div>
					<div className="current-ip-box">
						<div className="current-ip">Current IP</div>
						<div className="xxx-xxx-xxx-xxx">{props.IP_Address}</div>
					</div>
					<div className="current-os-box">
						<div className="current-os">Current OS</div>
						<div className="mac-win">{navigator.userAgentData.platform}</div>
					</div>
					<div className="current-browser-box">
						<div className="current-browser">Current Browser</div>
						<div className="chrome-xx-xx">{navigator.sayswho}</div>
					</div>
					<div>
						<FormGroup>
							<FormControlLabel
								label={
									<span style={{ fontSize: 20, fontWeight: "600" }}>
										Reverse Order(Time)
									</span>
								}
								control={<Switch />}
								onChange={() => setReversed(!reversed)}
							/>
						</FormGroup>
					</div>
				</div>
				<div className="all-login-records-frame">
					<div className="login-description">
						<svg
							className="history-1"
							width="87"
							height="86"
							viewBox="0 0 87 86"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M48.8749 28.6667H43.4999V46.5833L58.8366 55.685L61.4166 51.3492L48.8749 43.8958V28.6667ZM47.0833 10.75C38.53 10.75 30.3271 14.1478 24.2791 20.1958C18.231 26.2439 14.8333 34.4468 14.8333 43H4.08325L18.2733 57.4408L32.7499 43H21.9999C21.9999 36.3475 24.6426 29.9674 29.3467 25.2634C34.0507 20.5594 40.4307 17.9167 47.0833 17.9167C53.7358 17.9167 60.1158 20.5594 64.8198 25.2634C69.5239 29.9674 72.1666 36.3475 72.1666 43C72.1666 49.6525 69.5239 56.0326 64.8198 60.7366C60.1158 65.4406 53.7358 68.0833 47.0833 68.0833C40.1674 68.0833 33.8966 65.2525 29.3816 60.7017L24.2933 65.79C30.1341 71.6667 38.1249 75.25 47.0833 75.25C55.6365 75.25 63.8394 71.8522 69.8874 65.8042C75.9355 59.7561 79.3333 51.5532 79.3333 43C79.3333 34.4468 75.9355 26.2439 69.8874 20.1958C63.8394 14.1478 55.6365 10.75 47.0833 10.75Z"
								fill="white"
							/>
						</svg>
						<div className="all-login-records">All Login Records</div>
					</div>
					<div className="login-records-top">
						<div className="number-text-box">
							<div className="no-">No.</div>
						</div>
						<div className="time-text-box">
							<div className="time">Time</div>
						</div>
						<div className="login-duration-text-box">
							<div className="records_login-duration">Login Duration</div>
						</div>
						<div className="ip-address-text-box">
							<div className="ip-address">IP Address</div>
						</div>
					</div>

					{/* render out individual login records */}
					<div className="login-records-list">
						{!reversed ? (
							<>
								{records
									.slice(5 * recordPageIndex, 5 * recordPageIndex + 5)
									.map((record, index) => {
										return (
											<LoginRecord
												IPAddress={record[1]}
												time={format(
													new Date(record[0]).setHours(
														new Date(record[0]).getHours() - 8
													),
													"M/d/u, HH:mm"
												)}
												duration={record[2] ?? "N/A"}
												number={5 * recordPageIndex + index + 1}
											/>
										);
									})}
							</>
						) : (
							<>
								{records
									.slice(0)
									.reverse()
									.slice(5 * recordPageIndex, 5 * recordPageIndex + 5)
									.map((record, index) => {
										return (
											<LoginRecord
												IPAddress={record[1]}
												time={format(
													new Date(record[0]).setHours(
														new Date(record[0]).getHours() - 8
													),
													"M/d/u, HH:mm"
												)}
												duration={record[2] ?? "N/A"}
												number={records.length - (5 * recordPageIndex + index)}
											/>
										);
									})}
							</>
						)}

						<Pagination
							count={Math.ceil(records.length / 5)}
							page={recordPageIndex + 1}
							onChange={handleRecordPageChange}
							style={{
								display: "flex",
								alignSelf: "center",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Records;
