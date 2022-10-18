import React from "react";
import "./class.css";
import { CursorDefaultClick, Email } from "mdi-material-ui";
import { ButtonBase } from "@mui/material";

function Class() {
	return (
		<div className="course-info-detailed-">
			<div className="frame-17">
				<div className="frame-1">
					<div className="frame-12">
						<div className="class-name">
							COMP3278 Introduction to Database Management Systems
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
							Welcome to COMP3278A, 2022/23!
							<br />
							Please feel free to contact me (Dr. Ping Luo), TA Mr. Yao Mu, Mr.
							Yao Lai, and Mr. Yizhou Li.
							<br />
							If you have any questions with the lecture / tutorial materials,
							we are very happy to help!
						</div>
					</div>
					<div className="frame-2">
						<div className="frame-19">
							<div className="frame-262">
								<div className="frame-29">
									<div className="course-instructor">Course Instructor</div>
									<div className="course-instructor-list">
										Dr. Ping Luo
										<br />
										Office: CB326
										<br />
										Email: pluo@cs.hku.hk
									</div>
								</div>
								<div className="frame-30">
									<div className="teaching-assistants">
										<span>
											<span className="teaching-assistants-span">Teaching</span>
											<span className="teaching-assistants-span2"> </span>
											<span className="teaching-assistants-span3">
												Assistants
											</span>
										</span>
									</div>
									<div className="frame-202">
										<div className="teaching-assistant-list">
											Yizhou Li
											<br />
											Email: liyizhuo@connect.hku.hk
										</div>
										<div className="teaching-assistant-list">
											Yao Mu
											<br />
											Email: muyao@connect.hku.hk
										</div>
										<div className="teaching-assistant-list">
											Yao Lai
											<br />
											Email: laiyao@connect.hku.hk
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="frame-192">
							<div className="frame-27">
								<div className="lecture-tut-course-assessment">
									<span>
										<span className="time-title">Lecture:</span>
										<span className="lecture-list">
											Every Thursday 13:30 - 15:20 (MWT2)
											<br />
										</span>
										<span className="time-title">Tutorial:</span>
										<span className="lecture-list">
											Every Monday 14:30 - 15:20 (MWT2 &amp; Zoom)
											<br />
										</span>
										<span className="time-title">
											Course Assessment:
											<br />
										</span>
										<span className="lelecture-list">
											2 written assignments (30%, that is 15% for each
											assignment)
											<br />1 group project (20%)
											<br />1 group SQL challenge (10% bonus)
											<br />
											Final examination (50%)
										</span>
									</span>
								</div>
							</div>
							<div className="frame-263">
								<div className="other-course-materials-">
									Other Course Materials:
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Class;
