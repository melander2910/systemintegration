from fastapi import FastAPI
import requests;

app = FastAPI()

@app.get("/")
def root():
        return { "Key": "Value" }

@app.get("/firstroute")
def root():
        return { "firstroute": "message" }

@app.get("/requestexpress")
def root():
        r = requests.get("http://localhost:5555/")
        data = r.json()
        return data

