import { Link } from "react-router-dom";
import React from "react";
import { ButtonBase } from "@mui/material";
import {
	Timetable,
	HumanMaleBoard,
	Account,
	Logout,
	Login,
} from "mdi-material-ui";

// create a react functional component
function Navbar({ login, setLogin, courseCode }) {
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
					overflow: "hidden",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0px",
					gap: "97px",
					height: 74,
					background: "linear-gradient(90.13deg, #E3FCBF 0%, #8BF5E2 100%)",
					width: "100%",
				}}
			>
				{login ? (
					<ButtonBase
						component={Link}
						to="/"
						style={{
							height: 72,
							borderRadius: "0px 16px 16px 0px",
							boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
						}}
					>
						<img
							alt=""
							src="logo.png"
							height={"72px"}
							style={{
								borderRadius: "0px 16px 16px 0px",
							}}
						/>
					</ButtonBase>
				) : (
					<div
						style={{
							height: 72,
							borderRadius: "0px 16px 16px 0px",
							boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
						}}
					>
						<img
							alt=""
							src="logo.png"
							height={"72px"}
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
								component={Link}
								to="/TimeTable"
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
								<Timetable
									style={{
										color: "#000000",
										fontSize: 64,
									}}
								/>
							</ButtonBase>

							{/* Class Icon */}
							{courseCode !== "" && (
								<ButtonBase
									component={Link}
									to="/class"
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
									<HumanMaleBoard
										style={{
											color: "#000000",
											fontSize: 64,
										}}
									/>
								</ButtonBase>
							)}

							{/* Login Record Icon */}
							<ButtonBase
								component={Link}
								to="/records"
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
								<Account
									style={{
										color: "#000000",
										fontSize: 64,
									}}
								/>
							</ButtonBase>
						</>
					)}

					{/* Logout Icon */}
					{login ? (
						<ButtonBase
							component={Link}
							to="/login"
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
							<Logout
								style={{
									color: "#000000",
									fontSize: 64,
								}}
							/>
						</ButtonBase>
					) : (
						<ButtonBase
							component={Link}
							to="/login"
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
							<Login
								style={{
									color: "#000000",
									fontSize: 64,
								}}
							/>
						</ButtonBase>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
