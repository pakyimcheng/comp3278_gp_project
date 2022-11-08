import React, { useState, useEffect } from "react";
import Timetable from "react-timetable-events";
import axios from "axios";

function TimeTable({ ...props }) {
	const [timetable, setTimetable] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function a() {
			await axios
				.post(
					"http://127.0.0.1:5001/getWeeklyTimetable?studentID=" +
						props.studentID
				)
				.then(async function (res) {
					console.log(res.data.status);
					if (res.data.status === true) {
						const days = [
							"monday",
							"tuesday",
							"wednesday",
							"thursday",
							"friday",
							"saturday",
							"sunday",
						];
						for (let i = 0; i < 4; i++) {
							for (let j = 0; j < res.data.events[days[i]].length; j++) {
								res.data.events[days[i]][j].startTime = new Date(
									res.data.events[days[i]][j].startTime
								);
								res.data.events[days[i]][j].endTime = new Date(
									res.data.events[days[i]][j].endTime
								);
							}
						}
						delete res.data.status;

						const ordered = {};
						Object.keys(res.data.events)
							.sort((a, b) => {
								return (
									days.indexOf(a.toLowerCase()) - days.indexOf(b.toLowerCase())
								);
							})
							.forEach(function (key) {
								ordered[key] = res.data.events[key];
							});

						setTimetable({ events: ordered });
						setIsLoading(false);
					} else {
						setTimetable({
							events: {
								monday: [],
								tuesday: [],
								wednesday: [],
								thursday: [],
								friday: [],
							},
						});
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		a();
	}, []);

	return (
		<>
			{isLoading ? (
				"LOADING"
			) : (
				<div style={{ width: "100%" }}>
					<Timetable
						style={{ height: "500px", margin: "5%" }}
						events={timetable && timetable.events}
						hoursInterval={{ from: 8, to: 20 }}
						timeLabel={"Time"}
					/>
				</div>
			)}
		</>
	);
}

export default TimeTable;
