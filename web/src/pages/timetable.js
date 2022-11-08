import * as React from 'react'
import Timetable from 'react-timetable-events'

function TimeTable() {
	const [timetable, setTimetable] =  useState();

	// useEffect(() => {
	// 	async function a() {
	// 		await axios
	// 			.post("http://127.0.0.1:5001/getWeeklyTimetable?studentID=" + studentID)
	// 			.then(async function (res) {
	// 				setCourseInfo(res.data);
	// 				setCourseID(res.data.courseID);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	}
	// 	a();
	// }, []);

	return (
		<>
			<h1>this is the timetable</h1>;
		</>
	);
}

export default TimeTable;
