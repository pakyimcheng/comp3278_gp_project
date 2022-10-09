from flask import Flask

app = Flask(__name__)

# /test API Router
@app.route("/test")
def members():
    return {"test": ["1", "2", "3"]}


if __name__ == "__main__":
    app.run(port=5001, debug=True)
