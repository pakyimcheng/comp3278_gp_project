// create a functional component named Login record
// this component will be used to display the login record
// of a user
// pamras: number, time, duration, IPAddress

import { BlackMesa } from "mdi-material-ui";
import React from "react";

function LoginRecord(props) {
	return (
		<div
			style={{
				flexDirection: "row",
				display: "flex",
				alignItems: "flex-start",
				padding: "16px 32px",
				gap: "32px",

				width: "880px",
				height: "80px",

				background: "#CCE9CC",

				border: "2px solid #7FB77E",
				borderRadius: "16px",
			}}
		>
			{/* Record Number */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "72px",
					background: "#B1D7B4",
					borderRadius: "8px",
					padding: "6px 0px",
					gap: "10px",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						height: "29px",
						fontFamily: "Inter",
						fontStyle: "normal",
						fontWeight: "500",
						fontSize: "24px",
						alignItems: "center",
						alignContent: "center",
						lineHeight: "29px",
						color: "black",
					}}
				>
					{props.number}.
				</div>
			</div>

			{/* Time */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					padding: "6px 0px",
					width: "216px",
					gap: "10px",

					height: "48px",
					background: "#B1D7B4",
					borderRadius: "8px",
				}}
			>
				<div
					style={{
						height: "29px",
						fontFamily: "Inter",
						fontStyle: "normal",
						fontWeight: "400",
						fontSize: "24px",
						lineHeight: "29px",
						color: "black",
					}}
				>
					{props.time}
				</div>
			</div>

			{/* Login Duration */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					padding: "0px",
					width: "216px",
					gap: "10px",

					height: "48px",
					background: "#B1D7B4",
					borderRadius: "8px",
				}}
			>
				<div
					style={{
						height: "29px",
						fontFamily: "Inter",
						fontStyle: "normal",
						fontWeight: "400",
						fontSize: "24px",
						lineHeight: "29px",
						color: "black",
					}}
				>
					{props.duration}
				</div>
			</div>

			{/* IPAddress */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					padding: "0px",
					width: "216px",
					gap: "10px",

					height: "48px",
					background: "#B1D7B4",
					borderRadius: "8px",
				}}
			>
				<div
					style={{
						height: "29px",
						fontFamily: "Inter",
						fontStyle: "normal",
						fontWeight: "400",
						fontSize: "24px",
						lineHeight: "29px",
						color: "black",
					}}
				>
					{props.IPAddress}
				</div>
			</div>
		</div>
		// <tr>
		//     <td>{props.number}</td>
		//     <td>{props.time}</td>
		//     <td>{props.login_date_time}</td>
		//     <td>{props.IPAddress}</td>
		// </tr>
	);
}

export default LoginRecord;
