import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	FaceRecognition,
	Login as LoginIcon,
	CloseCircle,
} from "mdi-material-ui";
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	IconButton,
	Alert,
	Snackbar,
} from "@mui/material";
import axios from "axios";

const Login = ({
	setLogin,
	setName,
	setStudentID,
	setIP_Address,
	setStudentEmail,
	IP_Address,
}) => {
	const navigate = useNavigate();
	const canvasRef = useRef();
	const imageRef = useRef();
	const videoRef = useRef();

	const [videosStream, setVideosStream] = useState();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [result, setResult] = useState("");
	const [confidence, setConfidence] = useState(0);
	const [verify, setVerify] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const [errorAlertOpen, setErrorAlertOpen] = useState(false);
	const [successAlertOpen, setSuccessAlertOpen] = useState(false);

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleLogin = async (email, password) => {
		axios
			.post("http://127.0.0.1:5001/login", {
				email_address: email,
				login_pwd: password,
			})
			.then(async function (response) {
				setName(response.data.name);
				setStudentEmail(response.data.email_address);
				setStudentID(response.data.studentID);
				if (response.status === 200) {
					if (response.data.status === false) {
						//alert fail
						setErrorAlertOpen(true);
					} else {
						setLogin(true);
						if (videosStream) {
							videosStream.getTracks().forEach(function (track) {
								track.stop();
							});
						}
						setSuccessAlertOpen(true);
						navigate("/");
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const getData = async () => {
		const res = await axios.get("https://geolocation-db.com/json/");
		setIP_Address(res.data.IPv4);
	};

	useEffect(() => {
		getData();
		async function getCameraStream() {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: true,
			});

			setVideosStream(stream);

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
		}

		getCameraStream();
	}, []);

	useEffect(() => {
		const interval = setInterval(async () => {
			if (verify === true) {
				captureImageFromCamera();

				if (imageRef.current) {
					const formData = new FormData();
					formData.append("image", imageRef.current);

					const response = await fetch("http://127.0.0.1:5001/classify", {
						method: "POST",
						body: formData,
					});

					if (response.status === 200) {
						const text = await response.text();
						setResult(
							JSON.parse(text.substring(0, text.length - 1)).class_name
						);
						setConfidence(
							JSON.parse(text.substring(0, text.length - 1)).confidence_score
						);
					} else {
						setResult("Error from API.");
					}
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [verify]);

	useEffect(() => {
		if (!modalOpen && confidence >= 0.8) {
			setModalOpen(true);
			setVerify(false);
		}
		if (modalOpen) {
			setModalOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [result, confidence, setModalOpen]);

	const playCameraStream = () => {
		if (videoRef.current) {
			videoRef.current.play();
		}
	};

	const captureImageFromCamera = () => {
		const context = canvasRef.current.getContext("2d");
		const { videoWidth, videoHeight } = videoRef.current;

		canvasRef.current.width = videoWidth;
		canvasRef.current.height = videoHeight;

		context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

		canvasRef.current.toBlob((blob) => {
			imageRef.current = blob;
		});
	};

	return (
		<>
			<Dialog open={modalOpen} onClose={() => handleModalClose()}>
				<IconButton
					onClick={() => handleModalClose()}
					size="large"
					style={{
						position: "absolute",
					}}
				>
					<CloseCircle
						style={{
							color: "red",
							fontSize: "32px",
						}}
					/>
				</IconButton>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						padding: "64px",
						gap: 16,
						width: "25vw",
					}}
				>
					<DialogTitle
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: "bold",
							fontSize: 42,
							lineHeight: "42px",
							color: "#425F57",
						}}
					>
						Login, {result}
					</DialogTitle>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							padding: "0px",
							gap: "10px",
						}}
					>
						<span
							style={{
								fontWeight: "600",
								fontSize: "22px",
								lineHeight: "22px",
								color: "#425F57",
							}}
						>
							Password
						</span>
						<TextField
							placeholder="Password"
							type="password"
							fullWidth
							style={{
								backgroundColor: "#FFF",
							}}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
				</div>
			</Dialog>
			<main
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "flex-start",
					padding: "32px 48px",
					gap: "32px",

					position: "relative",

					background: "#FFFFFF",
				}}
			>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						padding: "32px 48px",
						gap: "32px",
						borderRadius: "68px 32px",
						backgroundImage:
							"linear-gradient(rgba(255,255,255,0.38), rgba(255,255,255,0.38)), url(login_Background.jpg)",
						backgroundPosition: "center",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							gap: "32px",
							width: "100%",
						}}
					>
						<img
							alt=""
							src="logo.png"
							height={"80px"}
							style={{
								border: "2px solid #1F0202",
								filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
								borderRadius: "16px",
							}}
						/>

						<div
							style={{
								width: "100%",
								display: "flex",
								flexDirection: "row",
								alignItems: "flex-start",
								padding: "24px",
								gap: "16px",

								background: "#E3FCBF",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								borderRadius: "36px 16px 64px 36px",
							}}
						>
							<div
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									alignItems: "flex-start",
									justifyContent: "center",
									padding: "12px",
									background:
										"linear-gradient(91.24deg, rgba(20, 195, 142, 0.8) 0%, rgba(56, 229, 77, 0.8) 100%)",
									borderRadius: "16px",
								}}
							>
								<span
									style={{
										fontStyle: "normal",
										fontWeight: "600",
										fontSize: "42px",
										display: "flex",
										alignItems: "center",
										textAlign: "center",
										color: "#FFFFFF",
									}}
								>
									Intelligence Course Management System
								</span>
							</div>
						</div>
					</div>

					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "row",
							alignItems: "flex-start",
							padding: "0px",
							gap: "32px",
							position: "relative",
						}}
					>
						<div
							style={{
								width: "42%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								alignSelf: "stretch",
								padding: "32px",
								gap: "16px",

								background:
									"linear-gradient(180deg, #E3FCBF 0%, rgba(227, 252, 191, 0.6) 100%)",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								borderRadius: "32px 16px 16px 16px",
							}}
						>
							<div
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									padding: "0px",
									gap: "8px",
								}}
							>
								<FaceRecognition
									style={{
										fontSize: 42,
										color: "#425F57",
									}}
								/>
								<span
									style={{
										fontWeight: "600",
										fontSize: "36px",
										lineHeight: "36px",
										textAlign: "center",
										color: "#425F57",
										textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
									}}
								>
									Facial Authentication{"\n"}
									{result}
									{"\n"}
									{confidence}
									{"\n"}
									{String(verify)}
								</span>
							</div>
							<video
								style={{
									objectFit: "fill",
									width: "100%",
									height: "100%",
									borderRadius: "16px",
								}}
								ref={videoRef}
								onCanPlay={() => playCameraStream()}
								id="video"
							/>
							<Button
								variant="contained"
								onClick={() => setVerify((prev) => !prev)}
								style={{
									padding: "8px 16px",
									backgroundColor: "#14C38E",
									boxShadow:
										"0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
									borderRadius: "4px",
								}}
							>
								verify
							</Button>
							<canvas ref={canvasRef} hidden></canvas>
						</div>

						<div
							style={{
								width: "58%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								alignSelf: "stretch",
								padding: "48px 96px",
								gap: "48px",

								background:
									"linear-gradient(180deg, #E3FCBF 0%, rgba(227, 252, 191, 0.6) 100%)",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								borderRadius: "16px 16px 32px 16px",
							}}
						>
							<div
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<LoginIcon
									style={{
										fontSize: 82,
										color: "#425F57",
									}}
								/>
								<span
									style={{
										fontWeight: "700",
										fontSize: "48px",
										lineHeight: "48px",
										textAlign: "center",
										color: "#425F57",
										textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
									}}
								>
									Log In
								</span>
							</div>

							<div
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									padding: "0px",
									gap: "10px",
								}}
							>
								<span
									style={{
										fontWeight: "600",
										fontSize: "26px",
										lineHeight: "26px",
										color: "#425F57",
									}}
								>
									Email Address
								</span>
								<TextField
									placeholder="Email Address"
									fullWidth
									style={{
										backgroundColor: "#FFF",
									}}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
							<div
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									padding: "0px",
									gap: "10px",
								}}
							>
								<span
									style={{
										fontWeight: "600",
										fontSize: "26px",
										lineHeight: "26px",
										color: "#425F57",
									}}
								>
									Password
								</span>
								<TextField
									placeholder="Password"
									type="password"
									fullWidth
									style={{
										backgroundColor: "#FFF",
									}}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>
							<Button
								variant="contained"
								style={{
									padding: "8px 16px",
									backgroundColor: "#14C38E",
									boxShadow:
										"0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
									borderRadius: "4px",
								}}
								onClick={() => handleLogin(email, password)}
							>
								<span
									style={{
										fontSize: "26px",
									}}
								>
									Confirm
								</span>
							</Button>
						</div>
					</div>
				</div>
			</main>

			<Snackbar
				open={errorAlertOpen}
				autoHideDuration={2500}
				onClose={() => setErrorAlertOpen(false)}
			>
				<Alert severity="error">Login Failed, Please Try Again.</Alert>
			</Snackbar>

			<Snackbar
				open={successAlertOpen}
				autoHideDuration={2500}
				onClose={() => setSuccessAlertOpen(false)}
			>
				<Alert severity="success">Login Successful, Redirecting Now.</Alert>
			</Snackbar>
		</>
	);
};

export default Login;
