import { Link } from "react-router-dom";
import React from "react";
import { ButtonBase } from "@mui/material";
import { Timetable, HumanMaleBoard, Account, Logout, Login } from "mdi-material-ui";

// create a react functional component
function Navbar({ login, setLogin }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "flex-start",
				padding: "0px",
				gap: "10px",
				position: "relative",
				width: "100%",

				background: "#FFFFFF",
				borderRadius: "16px",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0px",
					gap: "97px",
					height: "68px",
					background: "linear-gradient(90.13deg, #E3FCBF 0%, #8BF5E2 100%)",
					width: "100%",
				}}
			>
				{login ? (
				<ButtonBase
					style={{
						borderRadius: "0px 16px 16px 0px",
						boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
					}}
				>
					<Link to="/">
						<img
							alt=""
							src="logo.png"
							height={"68px"}
							style={{
								borderRadius: "0px 16px 16px 0px",
							}}
						/>
					</Link>
				</ButtonBase>
				) : (
					<div
						style={{
							borderRadius: "0px 16px 16px 0px",
							boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
						}}
					>
						<img
							alt=""
							src="logo.png"
							height={"68px"}
							style={{
								borderRadius: "0px 16px 16px 0px",
							}}
						/>
					</div>
				)}

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						padding: "0px",
						gap: "64px",

						height: "68px",
					}}
				>
					{login && (
						<>
							{/* Timetable Icon */}
							<ButtonBase
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "flex-start",
									padding: "2px 55px",

									backgroundColor: "#fff",
									border: "3px solid #14c38e",
									boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
									borderRadius: "32px",
								}}
							>
								<Link to="/TimeTable">
									<Timetable
										style={{
											color: "#000000",
											fontSize: 64,
										}}
									/>
								</Link>
							</ButtonBase>

							{/* Class Icon */}
							<ButtonBase
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "flex-start",
									padding: "2px 55px",

									backgroundColor: "#fff",
									border: "3px solid #14c38e",
									boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
									borderRadius: "32px",
								}}
							>
								<Link to="/class">
									<HumanMaleBoard
										style={{
											color: "#000000",
											fontSize: 64,
										}}
									/>
								</Link>
							</ButtonBase>

							{/* Login Record Icon */}
							<ButtonBase
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "flex-start",
									padding: "2px 55px",

									backgroundColor: "#fff",
									border: "3px solid #14c38e",
									boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
									borderRadius: "32px",
								}}
							>
								<Link to="/records">
									<Account
										style={{
											color: "#000000",
											fontSize: 64,
										}}
									/>
								</Link>
							</ButtonBase>
						</>
					)}

					{/* Logout Icon */}
					{login ? (
						<ButtonBase
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "flex-start",
								padding: "2px 55px",
	
								backgroundColor: "#fff",
								border: "3px solid #14c38e",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								borderRadius: "32px",
							}}

							onClick={() => {
								setLogin(false);
							}}
						>
							<Link to="/login">
								<Logout
									style={{
										color: "#000000",
										fontSize: 64,
									}}
								/>
							</Link>
						</ButtonBase>
					) : (
						<ButtonBase
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "flex-start",
								padding: "2px 55px",
	
								backgroundColor: "#fff",
								border: "3px solid #14c38e",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								borderRadius: "32px",
							}}
						>
							<Link to="/login">
								<Login
									style={{
										color: "#000000",
										fontSize: 64,
									}}
								/>
							</Link>
						</ButtonBase>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
