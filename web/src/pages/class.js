import React, { useState, useEffect } from "react";
import "./class.css";
import { CursorDefaultClick, Email, CloseCircle } from "mdi-material-ui";
import {
	ButtonBase,
	Button,
	Modal,
	Dialog,
	Box,
	DialogTitle,
	IconButton,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Class({ ...props }) {
	const courseCode = props.courseCode;
	const [courseInfo, setCourseInfo] = useState([]);
	const [courseID, setCourseID] = useState(0);
	const [teachingTeam, setTeachingTeam] = useState([]);
	const [assignment, setAssignment] = useState([]);
	const [lecture, setLecture] = useState([]);
	const [tutorial, setTutorial] = useState([]);

	const [modalOpen, setModalOpen] = useState(false);
	const [zoomModalOpen, setZoomModalOpen] = useState(false);

	const navigate = useNavigate();
	const [fin, setFin] = useState(false);

	if (!props.studentID) {
		navigate("/login");
	}

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleZoomModalClose = () => {
		setZoomModalOpen(false);
	};

	const handleZoomModalOpen = () => {
		setZoomModalOpen(true);
	};

	useEffect(() => {
		async function a() {
			await axios
				.post("http://127.0.0.1:5001/getCourseInfo?course_code=" + courseCode)
				.then(async function (res) {
					setCourseInfo(res.data);
					setCourseID(res.data.courseID);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		a();
	}, []);

	async function sendEmail() {
		if (fin) {
			await axios
				.post("http://127.0.0.1:5001/sendEmail", {
					recipient: props.studentEmail,
					name: props.name,
					courseCode: courseCode,
					courseInfo: courseInfo,
					teachingTeam: teachingTeam,
					assignment: assignment,
					lecture: lecture,
					tutorial: tutorial,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return;
		}
	}

	useEffect(() => {
		async function t() {
			await axios
				.post(
					"http://127.0.0.1:5001/getCourseTeachingTeam?courseID=" + courseID
				)
				.then(async function (res) {
					setTeachingTeam(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
			await axios
				.post("http://127.0.0.1:5001/getLecture?courseID=" + courseID)
				.then(async function (res) {
					console.log(res.data);
					setLecture(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
			await axios
				.post("http://127.0.0.1:5001/getTutorial?courseID=" + courseID)
				.then(async function (res) {
					setTutorial(res.data);
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
			await axios
				.post("http://127.0.0.1:5001/getAssignment?courseID=" + courseID)
				.then(async function (res) {
					setAssignment(res.data);
					setFin(true);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (courseID !== 0) {
			t();
		}
	}, [courseID]);

	return (
		<>
			{fin === true ? (
				<div>
					{/* OTHER MATERIAL MODAL */}
					<Dialog
						open={modalOpen}
						onClose={handleModalClose}
						style={{
							backgroundColor: "white",
							width: "70%",
							height: "70%",
							margin: "auto",
							borderRadius: "20px",
						}}
					>
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
						<DialogTitle
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: "bold",
								fontSize: 39,
								lineHeight: "42px",
								color: "#425F57",
							}}
						>
							{courseInfo.course_code} Assignments
						</DialogTitle>
						{assignment && assignment.length > 0 && assignment !== []
							? assignment.map((ass) => (
									<>
										<div
											style={{
												backgroundColor: "lightgreen",
												borderRadius: "12px",
												margin: "8px",
											}}
										>
											Name: {ass.name}
											<br />
											Deadline: {ass.deadline}
											<br />
											Weight: {ass.weighting}
											<br />
											{ass.link !== null ? (
												<>
													Link: <a href={ass.link}>Click to Download/Visit</a>
													<br />
												</>
											) : null}
										</div>
									</>
							  ))
							: null}

						<DialogTitle
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: "bold",
								fontSize: 39,
								lineHeight: "42px",
								color: "#425F57",
							}}
						>
							{courseInfo.course_code} Other Materials
						</DialogTitle>

						{courseInfo && courseInfo["other_course_materials"]
							? Object.keys(courseInfo["other_course_materials"]).map((key) => (
									<div style={{ fontSize: "18px" }}>
										{key}: <br />
										<a href={courseInfo["other_course_materials"][key]}>
											{courseInfo["other_course_materials"][key]}
										</a>
									</div>
							  ))
							: null}
					</Dialog>

					{/* ZOOM LINK MODAL */}
					<Dialog
						open={zoomModalOpen}
						onClose={handleZoomModalClose}
						style={{
							backgroundColor: "white",
							width: "70%",
							height: "70%",
							margin: "auto",
							borderRadius: "20px",
						}}
					>
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
						<DialogTitle
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: "bold",
								fontSize: 39,
								lineHeight: "42px",
								color: "#425F57",
							}}
						>
							{courseInfo.course_code} Lectures Zoom
						</DialogTitle>
						{lecture && lecture.length > 0 && lecture !== []
							? lecture.map((l) => (
									<>
										<div
											style={{
												backgroundColor: "lightgreen",
												borderRadius: "12px",
												margin: "8px",
											}}
										>
											Location: {l.class_address}
											<br />
											Start: {l.start_time}
											<br />
											End: {l.end_time}
											<br />
											{l.zoom_link ? (
												<>
													Link: <a href={l.zoom_link}>{l.zoom_link}</a>
													<br />
												</>
											) : (
												"No Zoom Link"
											)}
											Notes:{" "}
											{l && l.note && l.note.length > 0 && l.note !== []
												? Object.keys(l.note).map((key) => (
														<div style={{ fontSize: "18px" }}>
															{key}: <br />
															<a href={l.note[key]}>{l.note[key]}</a>
														</div>
												  ))
												: "No notes"}
											<br />
										</div>
									</>
							  ))
							: null}

						<DialogTitle
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: "bold",
								fontSize: 39,
								lineHeight: "42px",
								color: "#425F57",
							}}
						>
							{courseInfo.course_code} Tutorial Zooms
						</DialogTitle>

						{tutorial && tutorial.length > 0 && tutorial !== []
							? tutorial.map((t) => (
									<>
										<div
											style={{
												backgroundColor: "lightgreen",
												borderRadius: "12px",
												margin: "8px",
											}}
										>
											Location: {t.class_address}
											<br />
											Start: {t.start_time}
											<br />
											End: {t.end_time}
											<br />
											Link: <a href={t.zoom_link}>{t.zoom_link}</a>
											<br />
											Notes:{" "}
											{t && t.note && t.note.length > 0 && t.note !== []
												? Object.keys(t.note).map((key) => (
														<div style={{ fontSize: "18px" }}>
															{key}: <br />
															<a href={t.note[key]}>{t.note[key]}</a>
														</div>
												  ))
												: "No notes"}
											<br />
										</div>
									</>
							  ))
							: null}
					</Dialog>

					<div className="course-info-detailed-">
						<div className="frame-17">
							<div className="frame-1">
								<div className="frame-12">
									<div className="class-name">
										{courseInfo.course_code} {courseInfo.course_name}
									</div>
								</div>
								<ButtonBase
									className="email"
									sx={{
										backgroundColor: "#38e54d",
										borderRadius: "32px",
										padding: "12px",
										display: "flex",
										flexDirection: "column",
										gap: "0px",
										alignItems: "center",
										justifyContent: "center",
										maxWidth: "16%",
										alignSelf: "stretch",
										flexShrink: 0,
										position: "relative",
										boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
									}}
									onClick={() => handleZoomModalOpen()}
								>
									<CursorDefaultClick
										style={{
											width: "32px",
											height: "32px",
											fontSize: 82,
											color: "#ffffff",
										}}
									/>
									<div className="zoom-links">Zoom Link(s)</div>
								</ButtonBase>
								<ButtonBase
									className="email"
									sx={{
										backgroundColor: "#38e54d",
										borderRadius: "32px",
										padding: "12px",
										display: "flex",
										flexDirection: "column",
										gap: "0px",
										alignItems: "center",
										justifyContent: "center",
										maxWidth: "16%",
										alignSelf: "stretch",
										flexShrink: 0,
										position: "relative",
										boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
									}}
									onClick={() => sendEmail()}
								>
									<Email
										style={{
											width: "32px",
											height: "32px",
											fontSize: 82,
											color: "#ffffff",
										}}
									/>
									<div className="send-email">Send Email</div>
								</ButtonBase>
							</div>
							<div className="frame-20">
								<div className="frame-26">
									<div className="course-message">
										{courseInfo["summary.teacher_message"]}
									</div>
								</div>
								<div className="frame-2">
									<div className="frame-19">
										<div className="frame-262">
											<div className="frame-29">
												<div className="course-instructor">
													Course Instructor
												</div>
												<div
													className="course-instructor-list"
													style={{ display: "flex", flexDirection: "column" }}
												>
													{teachingTeam.status === true &&
													teachingTeam.array.length > 0 &&
													teachingTeam.array !== []
														? teachingTeam.array.map((member) => (
																<>
																	{member.type === "Course Instructor" ||
																	member.type === "Instructor" ? (
																		<div>
																			{member.name}
																			<br />
																			Office:{" "}
																			{member.office_address
																				? member.office_address
																				: "N/A"}
																			<br />
																			Office Hours:{" "}
																			{member.office_hour
																				? member.office_hour
																				: "N/A"}
																			<br />
																			Email:{" "}
																			{member.email ? member.email : "N/A"}
																		</div>
																	) : null}
																</>
														  ))
														: null}
												</div>
											</div>
											<div className="frame-30">
												<div className="teaching-assistants">
													<span>
														<span className="teaching-assistants-span">
															Teaching
														</span>
														<span className="teaching-assistants-span2"> </span>
														<span className="teaching-assistants-span3">
															Assistants
														</span>
													</span>
												</div>
												<div className="frame-202">
													{teachingTeam.status === true &&
													teachingTeam.array.length > 0 &&
													teachingTeam.array !== []
														? teachingTeam.array.map((member) => (
																<div className="teaching-assistant-list">
																	{member.type !== "Course Instructor" &&
																	member.type !== "Instructor" ? (
																		<div>
																			{member.name}
																			<br />
																			Office:{" "}
																			{member.office_address
																				? member.office_address
																				: "N/A"}
																			<br />
																			Office Hours:{" "}
																			{member.office_hour
																				? member.office_hour
																				: "N/A"}
																			<br />
																			Email:{" "}
																			{member.email ? member.email : "N/A"}
																		</div>
																	) : null}
																</div>
														  ))
														: null}
												</div>
											</div>
										</div>
									</div>
									<div className="frame-192">
										<div className="frame-27">
											<div className="lecture-tut-course-assessment">
												{courseInfo["summary.course_info"]}
											</div>
										</div>

										<div className="frame-263">
											<Button onClick={handleModalOpen}>
												<div className="other-course-materials-">
													Other Course Materials:
												</div>
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				"LOADING"
			)}
		</>
	);
}

export default Class;
