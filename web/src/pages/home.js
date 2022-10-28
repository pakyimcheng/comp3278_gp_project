/* Code generated with AutoHTML for Figma */
import "./home.css";
import { Avatar, ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";
import {
	Timetable,
	ExclamationThick,
	Bell,
	ClockTimeFive,
} from "mdi-material-ui";

function home({ ...props }) {
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
						<div className="welcome-back-">Welcome back!</div>
						<div className="home_user-name">{props.name}</div>
					</div>

					<ButtonBase
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
						<Link to="/records" style={{ textDecoration: "none" }}>
							<div className="login-records">Login Records</div>
						</Link>
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
							&lt;Notif date&gt;
							<br />
							&lt;Notif&gt;
							<br />
							...
						</div>
					</div>
					<div className="login-duration">
						<div className="duration">
							<ClockTimeFive
								style={{
									fontSize: 32,
								}}
							/>
							<div className="_00-00">00:00</div>
						</div>
						<div className="login-time--69-420">Login time: 69:420</div>
					</div>
				</div>
				<div className="landing-feature-frame">
					<div className="feature-message">
						<div className="welcome-to-icms">WELCOME to ICMS</div>
						<div className="welcome-to-our-system--mark--this-system-provide-the-best-experience-in-organising-and-monitoring-your-courses--you-can-select-the-features-below-">
							Welcome to our system, {props.name}!
							<br />
							This system provide the best experience in organising and
							monitoring your courses. You can select the features below.
						</div>
					</div>
					<div className="landing-options">
						<ButtonBase
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
							<Link
								to="/timetable"
								style={{
									textDecoration: "none",
									display: "flex",
									flexDirection: "row",
									gap: "18px",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Timetable
									style={{
										color: "#222222",
										fontSize: 64,
									}}
								/>
								<div className="timetable">Timetable</div>
							</Link>
						</ButtonBase>
						<ButtonBase
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
							}}
						>
							<Link
								to="/class"
								style={{
									textDecoration: "none",
									display: "flex",
									flexDirection: "row",
									gap: "18px",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<ExclamationThick
									style={{
										color: "#222222",
										fontSize: 64,
									}}
								/>
								<div className="upcoming-courses">Upcoming courses</div>
							</Link>
						</ButtonBase>
					</div>
				</div>
			</div>
		</div>
	);
}

export default home;
