import os
from flask import Flask, render_template, request
from flask_cors import CORS
from classifier import get_prediction
import json
import datetime

from dotenv import load_dotenv

import mysql.connector
from mysql.connector import errorcode

DEV_SERVER_URL = "http://127.0.0.1:3000/"

load_dotenv()

app = Flask(__name__)
CORS(app)

try:
    cnx = mysql.connector.connect(
        user="root",
        password=os.getenv("MYSQL_PASSWORD"),
        host="localhost",
        database="project",
    )

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)

print(cnx)
cursor = cnx.cursor()


@app.route("/")
def index():
    return render_template("index.html")

'''
INFO:
Every result json should include "status"
to indicate whether the request is okay or not
'''

'''
Login In Requests
1. First check matching user
2. Update the current_login_time
3. Get the student info
'''

# email and password login
@app.route("/login", methods=["POST"])
def login():
    email = request.args.get("email_address")
    login_pwd = request.args.get("login_pwd")
    cursor.execute(
        "SELECT studentID FROM student WHERE email_address = %s AND login_pwd = %s",
        (email, login_pwd),
    )
    # get all rows that match the result (though suppose there should be only one)
    row = cursor.fetchall()

    if row:
        r = row[0]
        result = {
            "status": True,
            "studentID": r[0]
        }
    else:
        result = {
            "status": False
        }

    return result

@app.route("/loginFace", methods=["POST"])
def login_face():
    face_idx = request.args.get("face_idx")
    login_pwd = request.args.get("login_pwd")

    cursor.execute(
        "SELECT studentID FROM student WHERE face_idx = %s AND login_pwd = %s",
        (face_idx, login_pwd),
    )

    # get all rows that match the result (though suppose there should be only one)
    row = cursor.fetchall()

    if row:
        r = row[0]
        result = {
            "status": True,
            "studentID": r[0]
        }
    else:
        result = {
            "status": False
        }

    return result


# Update the current login time of the student
@app.route("/createLoginInfo", methods=["POST"])
def create_login_info():
    studentID = request.args.get("studentID")
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(now, studentID)
    # update the current_login_time in the student table
    cursor.execute(
        "UPDATE student SET current_login_time=%s WHERE studentID=%s",
        (now, studentID),
    )
    cnx.commit()

    result = {
        "status": True
    }

    return result

# Return student info
@app.route("/student", methods=["POST"])
def student():
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
            "current_login_time": r[3]
        }

    else:
        result = {
            "status": False
        }

    return result


'''
Course Info related requests
'''

@app.route("/getCourseInfo", methods=["POST"])
def get_course_info():
    # course code should be unique for a year
    course_code = request.args.get("course_code")

    cursor.execute(
        """
        SELECT courseID, course_code, course_name, `summary.course_info`, `summary.teacher_message`, other_course_materials 
        FROM course
        WHERE course_code = %s
        """,
        (course_code,)
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
            "other_course_materials": r[5]
        }

    else:
        result = {
            "status": False
        }

    return result


@app.route("/getCourseTeachingTeam", methods=["POST"])
def get_course_teaching_team():
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

    if rows:
        r = rows[0]

        result = {
            "status": True,
            "courseID": r[0],
            "teacherID": r[1],
            "type": r[2],
            "office_hour": r[3],
            "office_address": r[4],
            "email": r[5],
            "name": r[6]
        }

    else:
        result = {
            "status": False
        }

    return result


@app.route("/getLecture", methods=["POST"])
def get_lecture():
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

    if rows:
        r = rows[0]        

        result = {
            "status": True,
            "courseID": r[0],
            "lectureID": r[1],
            "note": json.loads(r[2]),       # json byte string to json object
            "start_time": r[3],
            "end_time": r[4],
            "zoom_link": r[5],
            "class_address": r[6]
        }

    else:
        result = {
            "status": False
        }
    return result


@app.route("/getTutorial", methods=["POST"])
def get_tutorial():
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

    if rows:
        r = rows[0]

        result = {
            "status": True,
            "courseID": r[0],
            "turorialID": r[1],
            "note": json.loads(r[2]),       # json byte string to json object
            "start_time": r[3],
            "end_time": r[4],
            "zoom_link": r[5],
            "class_address": r[6]
        }

    else:
        result = {
            "status": False
        }

    return result

@app.route("/test")
def members():
    return {"test": ["1", "2", "3"]}


'''
Facial Login Requests
'''

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
