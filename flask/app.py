from flask import Flask, render_template, request
from flask_cors import CORS
from classifier import get_prediction
import json

DEV_SERVER_URL = "http://127.0.0.1:3000/"

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/test")
def members():
    return {"test": ["1", "2", "3"]}


@app.route("/classify", methods=["POST"])
def classify():
    if request.files["image"]:
        file = request.files["image"]

        # result = classifyImage(file)
        result = get_prediction(file)

        result = json.dumps(str(result))

        return result


if __name__ == "__main__":
    app.run(port=5001, debug=True)
