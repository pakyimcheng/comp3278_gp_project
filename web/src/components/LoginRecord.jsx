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
				background: "#cce9cc",
				borderRadius: "16px",
				border: "solid #7fb77e",
				borderWidth: "2px",
				padding: "16px 32px 16px 32px",
				display: "flex",
				flexDirection: "row",
				gap: "32px",
				alignItems: "flex-start",
				justifyContent: "flex-start",
				alignSelf: "stretch",
				position: "relative",
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
					background: "#b1d7b4",
					borderRadius: "8px",
					padding: "6px 0px 6px 0px",
					display: "flex",
					flexDirection: "row",
					gap: "10px",
					alignItems: "center",
					justifyContent: "center",
					alignSelf: "stretch",
					flex: "1",
					position: "relative",
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
					background: "#b1d7b4",
					borderRadius: "8px",
					padding: "6px 0px 6px 0px",
					display: "flex",
					flexDirection: "row",
					gap: "10px",
					alignItems: "center",
					justifyContent: "center",
					alignSelf: "stretch",
					flex: "1",
					position: "relative",
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
					background: "#b1d7b4",
					borderRadius: "8px",
					padding: "6px 0px 6px 0px",
					display: "flex",
					flexDirection: "row",
					gap: "10px",
					alignItems: "center",
					justifyContent: "center",
					alignSelf: "stretch",
					flex: "1",
					position: "relative",
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
