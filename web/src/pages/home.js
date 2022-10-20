/* Code generated with AutoHTML for Figma */
import "./home.css";
import { Avatar, ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";
import { Timetable, ExclamationThick } from "mdi-material-ui";

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
						<div className="home_user-name">Mark</div>
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
						<Link 
							to="/records"
							style={{ textDecoration: 'none' }}
						>
							<div className="login-records">Login Records</div>
						</Link>
					</ButtonBase>

					<div className="notification">
						<div className="notification-icon-text">
							<svg
								className="bell-1"
								width="32"
								height="33"
								viewBox="0 0 32 33"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M28 25.8334V27.1667H4V25.8334L6.66667 23.1667V15.1667C6.66667 11.0334 9.37333 7.39341 13.3333 6.22008C13.3333 6.08675 13.3333 5.96675 13.3333 5.83341C13.3333 5.12617 13.6143 4.44789 14.1144 3.9478C14.6145 3.4477 15.2928 3.16675 16 3.16675C16.7072 3.16675 17.3855 3.4477 17.8856 3.9478C18.3857 4.44789 18.6667 5.12617 18.6667 5.83341C18.6667 5.96675 18.6667 6.08675 18.6667 6.22008C22.6267 7.39341 25.3333 11.0334 25.3333 15.1667V23.1667L28 25.8334ZM18.6667 28.5001C18.6667 29.2073 18.3857 29.8856 17.8856 30.3857C17.3855 30.8858 16.7072 31.1667 16 31.1667C15.2928 31.1667 14.6145 30.8858 14.1144 30.3857C13.6143 29.8856 13.3333 29.2073 13.3333 28.5001"
									fill="black"
								/>
							</svg>
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
							<svg
								className="clock-time-five-1"
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16 2.66663C8.66667 2.66663 2.66667 8.66663 2.66667 16C2.66667 23.3333 8.66667 29.3333 16 29.3333C23.3333 29.3333 29.3333 23.3333 29.3333 16C29.3333 8.66663 23.3333 2.66663 16 2.66663ZM18.6667 22.6666L14.6667 15.7333V9.33329H16.6667V15.2L20.4 21.7333L18.6667 22.6666Z"
									fill="black"
								/>
							</svg>
							<div className="_00-00">00:00</div>
						</div>
						<div className="login-time--69-420">Login time: 69:420</div>
					</div>
				</div>
				<div className="landing-feature-frame">
					<div className="feature-message">
						<div className="welcome-to-icms">WELCOME to ICMS</div>
						<div className="welcome-to-our-system--mark--this-system-provide-the-best-experience-in-organising-and-monitoring-your-courses--you-can-select-the-features-below-">
							Welcome to our system, Mark!
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
									textDecoration: 'none',
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
									textDecoration: 'none',
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
