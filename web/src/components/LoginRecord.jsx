import React from "react";

function LoginRecord(props) {
	return (
		<div
			style={{
				width: "100%",
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
					{props.duration !== null && props.duration !== "N/A" ? (
						<a>{new Date(props.duration * 1000).toISOString().slice(11, 19)}</a>
					) : (
						"00:00:00"
					)}
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
	);
}

export default LoginRecord;
