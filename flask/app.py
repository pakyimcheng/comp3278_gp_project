import os
from flask import Flask, render_template, request
from flask_cors import CORS
from classifier import get_prediction
import json

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


@app.route("/student/<studentID>", methods=["POST"])
def student(studentID):
    cursor.execute(
        "SELECT studentID, name, email_address FROM student WHERE studentID = %s",
        (studentID,),
    )
    s = cursor.fetchone()
    result = {
        "studentID": s[0],
        "name": s[1],
        "email_address": s[2],
    }
    print(result)
    return result


@app.route("/test")
def members():
    return {"test": ["1", "2", "3"]}


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
