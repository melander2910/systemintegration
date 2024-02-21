from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
        return { "Key": "Value" }

@app.get("/firstroute")
def root():
        return { "firstroute": "message" }