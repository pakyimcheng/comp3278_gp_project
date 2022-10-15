import { Link } from "react-router-dom";
import React from "react";

// create a react functional component
function Navbar({ login }) {
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
					background: "#E3FCBF",
					width: "100%",
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
					{/* Timetable Icon */}
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "flex-start",
							padding: "2px 55px",
							gap: "10px",

							backgroundColor: "#fff",
							border: "3px solid #14c38e",
							borderRadius: "32px",
						}}
					>
						<Link to="/TimeTable">
							<img
								alt=""
								src="timetable.png"
								height={"64px"}
								style={{
									borderRadius: "0px 16px 16px 0px",
								}}
							/>
						</Link>
					</div>

					{/* Class Icon */}
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "flex-start",
							padding: "2px 55px",
							gap: "10px",

							backgroundColor: "#fff",
							border: "3px solid #14c38e",
							borderRadius: "32px",
						}}
					>
						<Link to="/class">
							<img
								alt=""
								src="class.png"
								height={"64px"}
								style={{
									borderRadius: "0px 16px 16px 0px",
								}}
							/>
						</Link>
					</div>

					{/* Login Record Icon */}
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "flex-start",
							padding: "2px 55px",
							gap: "10px",

							backgroundColor: "#fff",
							border: "3px solid #14c38e",
							borderRadius: "32px",
						}}
					>
						<Link to="/records">
							<img
								alt=""
								src="account.png"
								height={"64px"}
								style={{
									borderRadius: "0px 16px 16px 0px",
								}}
							/>
						</Link>
					</div>

					{/* Logout Icon */}
					{login ? (
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "flex-start",
								padding: "2px 55px",
								gap: "10px",

								backgroundColor: "#fff",
								border: "3px solid #14c38e",
								borderRadius: "32px",
							}}
						>
							<img
								alt=""
								src="Logout.png"
								height={"64px"}
								style={{
									borderRadius: "0px 16px 16px 0px",
								}}
							/>
						</div>
					) : (
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "flex-start",
								padding: "2px 55px",
								gap: "10px",

								backgroundColor: "#fff",
								border: "3px solid #14c38e",
								borderRadius: "32px",
							}}
						>
							<Link to="/login">
								<img
									alt=""
									src="Logout.png"
									height={"64px"}
									style={{
										borderRadius: "0px 16px 16px 0px",
									}}
								/>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
