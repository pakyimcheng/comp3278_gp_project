import React, { useEffect, useRef, useState } from "react";

const Login = () => {
	const canvasRef = useRef();
	const imageRef = useRef();
	const videoRef = useRef();

	const [result, setResult] = useState("");

	useEffect(() => {
		async function getCameraStream() {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: true,
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
		}

		getCameraStream();
	}, []);

	useEffect(() => {
		const interval = setInterval(async () => {
			captureImageFromCamera();

			if (imageRef.current) {
				const formData = new FormData();
				formData.append("image", imageRef.current);

				const response = await fetch("http://127.0.0.1:5001/classify", {
					method: "POST",
					body: formData,
				});

				console.log(response);

				if (response.status === 200) {
					const text = await response.text();
					setResult(text);
				} else {
					setResult("Error from API.");
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	}, []);

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
			<header>
				<h1>Image classifier</h1>
			</header>
			<main>
				<video ref={videoRef} onCanPlay={() => playCameraStream()} id="video" />
				<canvas ref={canvasRef} hidden></canvas>
				<p>Currently seeing: {result}</p>
			</main>
		</>
	);
};

export default Login;
