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

@app.route("/allstandings")
def index():
    data = mongo.db.standings.find({})
    return json_util.dumps(data)

@app.route("/standings/<season>")
def standings(season):
    if season:
        data = mongo.db.standings.find({"season" : season})
    else:
        data = mongo.db.standings.find({})
    return json_util.dumps(data)


if __name__ == "__main__":
    app.run(debug=True)