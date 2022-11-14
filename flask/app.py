import os
from flask import Flask, render_template, request
from flask_cors import CORS
from flask_mail import Mail, Message
from classifier import get_prediction
import json
from datetime import date, time, timedelta, datetime
import time


from dotenv import load_dotenv

import mysql.connector
from mysql.connector import errorcode

DEV_SERVER_URL = "http://127.0.0.1:3000/"

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = "2022ICMS@gmail.com"
app.config["MAIL_PASSWORD"] = "myfuqlykyimdnrqr"
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True

mail = Mail(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/sendEmail", methods=["POST"])
def sendEmail():
    recipient = request.get_json()["recipient"]
    name = request.get_json()["name"]
    courseCode = request.get_json()["courseCode"]

    courseInfo = request.get_json()["courseInfo"]
    if(courseInfo["summary.teacher_message"]):
        courseTeacherMessage = courseInfo["summary.teacher_message"]
    else:
        courseTeacherMessage = "N/A"

    teachingTeam = request.get_json()["teachingTeam"]
    teachingString = ""
    teachingTeam=teachingTeam["array"]
    for i in range(len(teachingTeam)):
        tempString = "Name:\n"
        tempString+=(teachingTeam[i]["name"]+"\n")
        tempString+="Email:\n"
        tempString+=(teachingTeam[i]["email"]+"\n")
        tempString+="Office Address:\n"
        tempString+=(teachingTeam[i]["office_address"])if(teachingTeam[i]["office_address"]) else "NONE\n"
        tempString+="\nOffice Hour:\n"
        tempString+=(teachingTeam[i]["office_hour"]+"\n")if(teachingTeam[i]["office_hour"]) else "NONE\n"
        tempString+="Teaching Type:\n"
        tempString+=(teachingTeam[i]["type"])
        teachingString+=(tempString+"\n\n")

    assignment = request.get_json()["assignment"]
    asmString = ""
    assignment=assignment["array"]
    for i in range(len(assignment)):
        tempString = "Name:\n"
        tempString+=(assignment[i]["name"]+"\n")
        tempString+="Link:\n"
        tempString+=(assignment[i]["link"]+"\n")
        tempString+="Deadline:\n"
        tempString+=(assignment[i]["deadline"]+"\n")
        tempString+="Weighting:\n"
        tempString+=str(assignment[i]["weighting"])
        asmString+=(tempString+"\n\n")

    lecture = request.get_json()["lecture"]
    lectureString = ""
    lecture=lecture["array"]
    for i in range(len(lecture)):
        tempString = "Class Address:\n"
        tempString+=(lecture[i]["class_address"]+"\n")
        tempString+="Start Time:\n"
        tempString+=(lecture[i]["start_time"]+"\n")
        tempString+="End Time:\n"
        tempString+=(lecture[i]["end_time"]+"\n")
        tempString+="Note:\n"
        for key in lecture[i]["note"]:
            tempString+=("From Class: "+ key +"\n")
            tempString+=("Link: "+ lecture[i]["note"][key] +"\n")
        tempString+="Zoom Link:\n"
        if(lecture[i]["zoom_link"]):
            tempString+=(lecture[i]["zoom_link"]+"\n")
        else:
            tempString+=("Not available\n")
        lectureString+=(tempString+"\n\n")

    tutorial = request.get_json()["tutorial"]
    tutorialString = ""
    tutorial=tutorial["array"]
    for i in range(len(tutorial)):
        tempString = "Class Address:\n"
        tempString+=(lecture[i]["class_address"]+"\n")
        tempString+="Start Time:\n"
        tempString+=(lecture[i]["start_time"]+"\n")
        tempString+="End Time:\n"
        tempString+=(lecture[i]["end_time"]+"\n")
        tempString+="Note:\n"
        for key in lecture[i]["note"]:
            tempString+=("From Class: "+ key +"\n")
            tempString+=("Download Link: "+ lecture[i]["note"][key] +"\n")
        tempString+="Zoom Link:\n"
        if(lecture[i]["zoom_link"]):
            tempString+=(lecture[i]["zoom_link"]+"\n")
        else:
            tempString+=("Not available\n")
        tutorialString+=(tempString+"\n\n")

    courseMaterial = ""
    for key in courseInfo["other_course_materials"]:
        courseMaterial +=("Material Name: "+key+"\n"+"Download Link: "+courseInfo["other_course_materials"][key]+"\n")

    msg = Message(
        "ICMS: " + courseCode + " Course Infomation",
        sender="2022ICMS@gmail.com",
        recipients=[recipient],
    )
    msg.html = render_template(
        "template.html",
        name=name,
        courseCode=courseCode,
        courseName=courseInfo["course_name"],
        courseSummary=courseInfo["summary.course_info"].replace("\\n\r", "").replace("\n\r", ""),
        courseTeacherMessage=courseTeacherMessage.replace("\\n\r", "").replace("\n\r", ""),
        teachingTeam=teachingString,
        assignment=asmString,
        lecture=lectureString,
        tutorial=tutorialString,
        otherCourseMaterials=courseMaterial,
    )
    mail.send(msg)
    return "Sent"


"""
INFO:
Every result json should include "status"
to indicate whether the request is okay or not
"""

"""
Login In Requests
1. First check matching user
2. Update the current_login_time
3. Get the student info
"""

# email and password login
@app.route("/login", methods=["POST"])
def login():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    email = request.get_json()["email_address"]
    login_pwd = request.get_json()["login_pwd"]
    cursor.execute(
        "SELECT studentID, name, email_address FROM student WHERE email_address = %s AND login_pwd = %s",
        (email, login_pwd),
    )
    # get all rows that match the result (though suppose there should be only one)
    row = cursor.fetchall()

    if row:
        r = row[0]
        result = {
            "status": True,
            "studentID": r[0],
            "name": r[1],
            "email_address": r[2],
        }
    else:
        result = {"status": False}

    cursor.close()
    return result


@app.route("/loginFace", methods=["POST"])
def login_face():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    face_idx = request.args.get("face_idx")
    login_pwd = request.args.get("login_pwd")

    cursor.execute(
        "SELECT studentID, name, email_address FROM student WHERE face_idx = %s AND login_pwd = %s",
        (face_idx, login_pwd),
    )

    # get all rows that match the result (though suppose there should be only one)
    row = cursor.fetchall()

    if row:
        r = row[0]
        result = {
            "status": True,
            "studentID": r[0],
            "name": r[1],
            "email_address": r[2],
        }
    else:
        result = {"status": False}

    cursor.close()

    return result


# Update the current login time of the student
@app.route("/createLoginInfo", methods=["POST"])
def create_login_info():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    studentID = request.get_json()["studentID"]
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    IP_Address = request.get_json()["IP_Address"]

    cursor.execute(
        "INSERT INTO logininfo (studentID, login_date_time, login_IPAddress) VALUES (%s, %s, %s)",
        (studentID, now, IP_Address),
    )
    cnx.commit()

    # update the current_login_time in the student table
    cursor.execute(
        "UPDATE student SET current_login_time=%s WHERE studentID=%s",
        (now, studentID),
    )
    cnx.commit()

    cursor.execute(
        "SELECT * FROM `logininfo` WHERE studentID= %s ORDER BY login_date_time DESC LIMIT 1;",
        (studentID,),
    )
    r = cursor.fetchall()

    cursor.close()

    result = {"status": True, "sessionID": r[0][0]}

    return result


@app.route("/updateLoginDuration", methods=["POST"])
def update_login_duration():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    studentID = request.get_json()["studentID"]

    cursor.execute(
        "SELECT sessionID, login_date_time FROM `logininfo` WHERE studentID= %s ORDER BY login_date_time DESC LIMIT 1;",
        (studentID,),
    )
    r = cursor.fetchall()

    delta = datetime.now().replace(microsecond=0) - r[0][1]

    # update the current_login_time in the student table
    cursor.execute(
        "UPDATE logininfo SET duration=%s WHERE studentID=%s AND sessionID=%s",
        (int(delta.total_seconds()), studentID, r[0][0]),
    )
    cnx.commit()

    result = {"status": True}

    return result


# Return student info
@app.route("/student", methods=["POST"])
def student():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    studentID = request.args.get("studentID")

    # TODO: notification
    cursor.execute(
        "SELECT studentID, name, email_address, current_login_time FROM student WHERE studentID = %s",
        (studentID,),
    )
    rows = cursor.fetchall()

    if rows:
        r = rows[0]
        result = {
            "status": True,
            "studentID": r[0],
            "name": r[1],
            "email_address": r[2],
            "current_login_time": r[3],
        }

    else:
        result = {"status": False}

    cursor.close()
    return result


@app.route("/getLoginInfo", methods=["POST"])
def get_login_info():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    studentID = request.get_json()["studentID"]

    cursor.execute(
        "SELECT login_date_time, login_IPAddress, duration FROM logininfo WHERE studentID = %s",
        (studentID,),
    )
    rows = cursor.fetchall()

    print(rows)
    if rows:
        result = {"status": True, "logininfo": rows}
    else:
        result = {"status": False}

    cursor.close()
    return result


"""
Course Info related requests
"""


@app.route("/getCourseInfo", methods=["POST"])
def get_course_info():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    # course code should be unique for a year
    course_code = request.args.get("course_code")

    cursor.execute(
        """
        SELECT courseID, course_code, course_name, `summary.course_info`, `summary.teacher_message`, other_course_materials 
        FROM course
        WHERE course_code = %s
        """,
        (course_code,),
    )

    rows = cursor.fetchall()

    if rows:
        r = rows[0]

        result = {
            "status": True,
            "courseID": r[0],
            "course_code": r[1],
            "course_name": r[2],
            "summary.course_info": r[3],
            "summary.teacher_message": r[4],
            "other_course_materials": json.loads(r[5]) if r[5] else None,
        }

    else:
        result = {"status": False}
    cursor.close()
    return result


@app.route("/getCourseTeachingTeam", methods=["POST"])
def get_course_teaching_team():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    courseID = request.args.get("courseID")

    cursor.execute(
        """
        SELECT courseID, teacherID, type, office_hour, office_address, email, name
        FROM `teachingTeam`
        WHERE courseID = %s
        """,
        (courseID,),
    )

    rows = cursor.fetchall()

    # temporary code for fixing cannot parse array in react for some machines
    if rows:
        array = []
        for r in rows:
            print(r)
            temp = {
                "courseID": r[0],
                "teacherID": r[1],
                "type": r[2],
                "office_hour": r[3],
                "office_address": r[4],
                "email": r[5],
                "name": r[6],
            }
            array.append(temp)

        result = {
            "status": True,
            "array": array
        }

    else:
        result = {"status": False}
    cursor.close()
    return result


@app.route("/getLecture", methods=["POST"])
def get_lecture():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    courseID = request.args.get("courseID")

    cursor.execute(
        """
        SELECT courseID, lectureID, note, start_time, end_time, zoom_link, class_address
        FROM `lecture`
        WHERE courseID = %s
        """,
        (courseID,),
    )

    rows = cursor.fetchall()

    # temporary code for fixing cannot parse array in react for some machines
    if rows:
        array = []
        for r in rows:
            temp = {
                "status": True,
                "courseID": r[0],
                "lectureID": r[1],
                "note": json.loads(r[2]) if r[2] else None,  # json byte string to json object
                "start_time": r[3],
                "end_time": r[4],
                "zoom_link": r[5],
                "class_address": r[6],
            }
            array.append(temp)

        result = {
            "status": True,
            "array": array
        }

    else:
        result = {"status": False}

    cursor.close()
    return result


@app.route("/getTutorial", methods=["POST"])
def get_tutorial():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    courseID = request.args.get("courseID")

    cursor.execute(
        """
        SELECT courseID, tutorialID, note, start_time, end_time, zoom_link, class_address
        FROM `tutorial`
        WHERE courseID = %s
        """,
        (courseID,),
    )

    rows = cursor.fetchall()

    # temporary code for fixing cannot parse array in react for some machines
    if rows:
        array = []
        for r in rows:
            temp = {
                "status": True,
                "courseID": r[0],
                "turorialID": r[1],
                "note": json.loads(r[2]) if r[2] else None,  # json byte string to json object
                "start_time": r[3],
                "end_time": r[4],
                "zoom_link": r[5],
                "class_address": r[6],
            }
            array.append(temp)

        result = {
            "status": True,
            "array": array
        }

    else:
        result = {"status": False}

    cursor.close()
    return result


@app.route("/getAssignment", methods=["POST"])
def get_assignment():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    courseID = request.args.get("courseID")

    cursor.execute(
        """
        SELECT courseID, deadline, name, weighting, asm_id, link
        FROM `assignment`
        WHERE courseID = %s
        """,
        (courseID,),
    )

    rows = cursor.fetchall()

    # temporary code for fixing cannot parse array in react for some machines
    if rows:
        array = []
        for r in rows:
            temp = {
                "status": True,
                "courseID": r[0],
                "deadline": r[1],
                "name": r[2],
                "weighting": r[3],
                "asm_id": r[4],
                "link": r[5],
            }
            array.append(temp)

        result = {
            "status": True,
            "array": array
        }

    else:
        result = {"status": False}
    cursor.close()
    return result


"""
Get near one hour lecture
"""


@app.route("/getNearOneHourLecture", methods=["POST"])
def get_near_one_hour_lecture():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    studentID = request.args.get("studentID")

    commands = [
        "CREATE TEMPORARY TABLE lec SELECT DISTINCT student.studentID, lecture.*, TIMESTAMPDIFF(SECOND, NOW(), lecture.start_time) AS timestamp_diff FROM student, course, courselist, lecture WHERE student.studentID = {} AND student.studentID = courselist.studentID AND course.courseID = courselist.courseID AND lecture.courseID = course.courseID;".format(
            studentID
        ),
        """
        SELECT course.course_code, lec.start_time, lec.end_time FROM lec, course
        WHERE lec.timestamp_diff <= 3600 AND lec.timestamp_diff >= 0 AND lec.courseID = course.courseID;
        """,
    ]

    for command in commands:
        for result in cursor.execute(command, multi=True):
            if result.with_rows:
                print("Rows produced by statement:", result.statement)
                # print("result.fetchall():", result.fetchall())
                break

    rows = result.fetchall()

    # temporary code for fixing cannot parse array in react for some machines
    if rows:
        array = []
        for r in rows:
            temp = {
                "status": True,
                "course_code": r[0],
                "start_time": r[1],
                "end_time": r[2],
            }
            array.append(temp)

        result = {
            "status": True,
            "array": array
        }

    else:
        result = {"status": False}

    cursor.close()
    return result


"""
Get near one hour tutorial
"""


@app.route("/getNearOneHourTutorial", methods=["POST"])
def get_near_one_hour_tutorial():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    studentID = request.args.get("studentID")

    commands = [
        "CREATE TEMPORARY TABLE tut SELECT DISTINCT student.studentID, tutorial.*, TIMESTAMPDIFF(SECOND, NOW(), tutorial.start_time) AS timestamp_diff FROM student, course, courselist, tutorial WHERE student.studentID = {} AND student.studentID = courselist.studentID AND course.courseID = courselist.courseID AND tutorial.courseID = course.courseID;".format(
            studentID
        ),
        """
        SELECT course.course_code, tut.start_time, tut.end_time FROM tut, course
        WHERE tut.timestamp_diff <= 3600 AND tut.timestamp_diff >= 0 AND tut.courseID = course.courseID;
        """,
    ]

    for command in commands:
        for result in cursor.execute(command, multi=True):
            if result.with_rows:
                print("Rows produced by statement:", result.statement)
                break
                # print("result.fetchall():", result.fetchall())
            # else:
            # print("Number of rows affected by statement '{}': {}\n".format(
            #     result.statement, result.rowcount))

    rows = result.fetchall()

    # temporary code for fixing cannot parse array in react for some machines
    if rows:
        array = []
        for r in rows:
            temp = {
                "status": True,
                "course_code": r[0],
                "start_time": r[1],
                "end_time": r[2],
            }
            array.append(temp)

        result = {
            "status": True,
            "array": array
        }

    else:
        result = {"status": False}

    cursor.close()
    return result


@app.route("/test")
def members():
    return {"test": ["1", "2", "3"]}


"""
Get weekly lectures and tutorials for timetable
"""


@app.route("/getWeeklyTimetable", methods=["POST"])
def get_weekly_timetable():
    try:
        cnx = mysql.connector.connect(
            user="root",
            password=os.getenv("MYSQL_PASSWORD"),
            host="localhost",
            database="project",
            port=3306 if not os.getenv("MYSQL_PORT") else os.getenv("MYSQL_PORT"),
        )
        cursor = cnx.cursor()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

    studentID = request.args.get("studentID")

    # get current date
    today = datetime.combine(date.today(), datetime.min.time())
    start = today - timedelta(days=today.weekday())
    end = start + timedelta(days=7) - timedelta(seconds=1)

    starttime_str = start.strftime("%Y-%m-%d %H:%M:%S")
    endtime_str = end.strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute(
        """
        SELECT L.courseID, C.course_code, L.start_time, L.end_time, L.class_address
        FROM lecture L, course C
        WHERE L.start_time >= %s AND L.start_time <= %s AND L.end_time >= %s AND L.end_time <= %s
        AND L.courseID = C.courseID
        AND L.courseID IN (
            SELECT courseID
            FROM courseList
            WHERE courseList.studentID = %s
        );
        """,
        (starttime_str, endtime_str, starttime_str, endtime_str, studentID),
    )

    rows_lecture = cursor.fetchall()

    cursor.execute(
        """
        SELECT T.courseID, C.course_code, T.start_time, T.end_time, T.class_address
        FROM tutorial T, course C
        WHERE T.start_time >= %s AND T.start_time <= %s AND T.end_time >= %s AND T.end_time <= %s
        AND T.courseID = C.courseID
        AND T.courseID IN (
            SELECT courseID
            FROM courseList
            WHERE courseList.studentID = %s
        );
        """,
        (starttime_str, endtime_str, starttime_str, endtime_str, studentID),
    )

    rows_tutorial = cursor.fetchall()

    cursor.close()

    if (not rows_lecture) and (not rows_tutorial):
        return {"status": False}

    events = {
        "monday": [],
        "tuesday": [],
        "wednesday": [],
        "thursday": [],
        "friday": [],
        "saturday": [],
        "sunday": [],
    }

    if rows_lecture:
        for r in rows_lecture:
            # follow the return style of the react library we are using
            temp = {
                "id": int(datetime.timestamp(r[2])),  # id: timestamp of startTime
                "name": "{}: {}".format(r[1], r[4]) if r[4] else "{}".format(r[1]),  # "course_title": "class_address"
                "type": "lecture",
                "startTime": int(datetime.timestamp(r[2])) * 1000,
                "endTime": int(datetime.timestamp(r[3])) * 1000,
            }

            time_diff = r[2] - start
            # print("start time:", r[2], "; end time:", r[3])
            # print("time_diff = ", time_diff)
            if (time_diff.days >= 0) and (time_diff.days < 1):
                events["monday"].append(temp)
            elif time_diff.days < 2:
                events["tuesday"].append(temp)
            elif time_diff.days < 3:
                events["wednesday"].append(temp)
            elif time_diff.days < 4:
                events["thursday"].append(temp)
            elif time_diff.days < 5:
                events["friday"].append(temp)
            elif time_diff.days < 6:
                events["saturday"].append(temp)
            elif time_diff.days < 7:
                events["sunday"].append(temp)

    if rows_tutorial:
        for r in rows_tutorial:
            temp = {
                "id": int(datetime.timestamp(r[2])),  # id: timestamp of startTime
                "course_code:": r[1],
                "class_address": r[4],
                "type": "tutorial",
                "startTime": int(datetime.timestamp(r[2])) * 1000,
                "endTime": int(datetime.timestamp(r[3])) * 1000,
            }

            time_diff = r[2] - start
            # print("start time:", r[2], "; end time:", r[3])
            # print("time_diff = ", time_diff)
            if (time_diff.days >= 0) and (time_diff.days < 1):
                events["monday"].append(temp)
            elif time_diff.days < 2:
                events["tuesday"].append(temp)
            elif time_diff.days < 3:
                events["wednesday"].append(temp)
            elif time_diff.days < 4:
                events["thursday"].append(temp)
            elif time_diff.days < 5:
                events["friday"].append(temp)
            elif time_diff.days < 6:
                events["saturday"].append(temp)
            elif time_diff.days < 7:
                events["sunday"].append(temp)

    result = {
        "status": True, 
        "events": events, 
        "week_start_date": int(datetime.timestamp(start)) * 1000,
        "week_end_date": int(datetime.timestamp(end)) * 1000
    }

    return result


"""
Facial Login Requests
"""


@app.route("/classify", methods=["POST"])
def classify():
    if request.files["image"]:
        file = request.files["image"]

        # result = classifyImage(file)
        result = get_prediction(file)

        # result = json.dumps(str(result))
        # print(result)

        return result


if __name__ == "__main__":
    app.run(port=5001, debug=True)
