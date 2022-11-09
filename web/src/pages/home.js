/* Code generated with AutoHTML for Figma */
import { format } from "date-fns";
import "./home.css";
import { Avatar, ButtonBase } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CloseCircle } from "mdi-material-ui";
import {
	Timetable,
	ExclamationThick,
	Bell,
	ClockTimeFive,
} from "mdi-material-ui";
import {
	Button,
	Modal,
	Dialog,
	Box,
	DialogTitle,
	IconButton,
	Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";

function Home({ ...props }) {
	const [currentTime, setCurrentTime] = useState(
		format(new Date(), "HH:mm:ss")
	);
	const navigate = useNavigate();

	const [modalOpen, setModalOpen] = useState(false);

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	useEffect(() => {
		// every second, update the time
		const secTimer = setInterval(() => {
			setCurrentTime(format(new Date(), "HH:mm:ss"));
		}, 1000);
		return () => clearInterval(secTimer);
	}, []);

	return (
		<div className="landing">
			<div className="landing-page-frame">
				<div className="landing-info-frame">
					<Avatar
						sx={{
							backgroundColor: "#d1f5ff",
							width: "216px",
							height: "216px",
						}}
					/>
					<div className="welcome-user">
						{props.login ? (
							<div className="welcome-back-">Welcome back!</div>
						) : (
							<div className="welcome-back-">Please Login!</div>
						)}
						<div className="home_user-name">{props.name}</div>
					</div>

					<Modal
						open={modalOpen}
						onClose={handleModalClose}
						BackdropProps={{ style: { backgroundColor: "transparent" } }}
						style={{
							backgroundColor: "white",
							boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
							width: "fit-content",
							height: "fit-content",
							padding: "32px",
							margin: "auto",
							borderRadius: "12px",
							fontWeight: "600",
							fontSize: 38,
							color: "#33B5E5",
						}}
						touchRipple={true}
					>
						<div 
							style={{ 
								display: "flex", 
								flexDirection: "row",
								gap: 12,
							}}
						>
							<IconButton 
								onClick={() => handleModalClose()} 
								size="large"
							>
								<CloseCircle
									style={{
										color: "#FF4444",
										fontSize: "32px",
									}}
								/>
							</IconButton>
							<div>
								No Upcoming Course in 1 Hour
							</div>
						</div>
					</Modal>

					<ButtonBase
						component={Link}
						to={props.login ? "records" : "login"}
						className="record-button"
						sx={{
							background: "#d1f5ff",
							borderRadius: "32px",
							border: "solid #1484c3",
							borderWidth: "5px",
							padding: "16px 16px 16px 16px",
							display: "flex",
							flexDirection: "row",
							gap: "10px",
							alignItems: "flex-start",
							justifyContent: "center",
							alignSelf: "stretch",
							position: "relative",
							boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
						}}
					>
						<div className="login-records">Login Records</div>
					</ButtonBase>

					<div className="notification">
						<div className="notification-icon-text">
							<Bell
								style={{
									fontSize: 32,
								}}
							/>
							<div className="notification2">Notification</div>
						</div>
						<div className="-notif-date---notif-----">
							{props.notification && props.notification.length > 0 ? (
								props.notification.map((notif) => <div>{notif}</div>)
							) : (
								<div style={{ textAlign: "center" }}>No Notification Yet</div>
							)}
						</div>
					</div>
					<div className="login-duration">
						<div className="duration">
							<ClockTimeFive
								style={{
									fontSize: 32,
								}}
							/>
							<div
								className="currentTime"
								style={{
									fontSize: "32px",
									fontWeight: 700,
								}}
							>
								{currentTime}
							</div>
						</div>
						<div className="loginDuration" style={{ fontSize: "18px" }}>
							Login time:{" "}
							{props.login ? (
								<>
									<span>
										{("0" + Math.floor((props.duration / 1440000) % 60)).slice(
											-2
										)}
										:
									</span>
									<span>
										{("0" + Math.floor((props.duration / 60000) % 60)).slice(
											-2
										)}
										:
									</span>
									<span>
										{("0" + Math.floor((props.duration / 1000) % 60)).slice(-2)}
									</span>
								</>
							) : (
								"Not Logged In Yet"
							)}
						</div>
					</div>
				</div>
				<div className="landing-feature-frame">
					<div className="feature-message">
						<div className="welcome-to-icms">WELCOME to ICMS</div>
						<div className="welcome-to-our-system--mark--this-system-provide-the-best-experience-in-organising-and-monitoring-your-courses--you-can-select-the-features-below-">
							Welcome to our system, {props.login ? props.name : "Please Login"}
							!
							<br />
							This system provide the best experience in organising and
							monitoring your courses. You can select the features below.
						</div>
					</div>
					<div className="landing-options">
						<ButtonBase
							component={Link}
							to={props.login ? "timetable" : "login"}
							className="timetable-button"
							sx={{
								background: "#ecffea",
								borderRadius: "16px",
								border: "solid #14c38e",
								borderWidth: "5px",
								padding: "48px 96px 48px 96px",
								display: "flex",
								flexDirection: "row",
								gap: "18px",
								alignItems: "center",
								justifyContent: "center",
								alignSelf: "stretch",
								position: "relative",
								boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
							}}
						>
							<Timetable
								style={{
									color: "#222222",
									fontSize: 64,
								}}
							/>
							<div className="timetable">Timetable</div>
						</ButtonBase>
						<Button
							onClick={() =>
								props.login
									? props.courseCode !== ""
										? navigate("/class")
										: handleModalOpen()
									: navigate("/login")
							}
							className="course-button"
							sx={{
								background: "#ecffea",
								borderRadius: "16px",
								border: "solid #14c38e",
								borderWidth: "5px",
								padding: "48px 96px 48px 96px",
								display: "flex",
								flexDirection: "row",
								gap: "18px",
								alignItems: "center",
								justifyContent: "center",
								alignSelf: "stretch",
								position: "relative",
								boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
								"&.MuiButtonBase-root:hover": {
									bgcolor: "#ecffea",
								},
							}}
						>
							<ExclamationThick
								style={{
									color: "#222222",
									fontSize: 64,
								}}
							/>
							<div className="upcoming-courses">Upcoming courses</div>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
