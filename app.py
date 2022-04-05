from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import json_util

# Create an instance of our Flask app.
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# Create connection variable
app.config["MONGO_URI"] = "mongodb://localhost:27017/nba_db"
mongo = PyMongo(app)
CORS(app)

@app.route("/")
def index():
    data = mongo.db.standings.find_one({"season" : "2019-2020"})
    print(data)
    return json_util.dumps(data)


if __name__ == "__main__":
    app.run(debug=True)