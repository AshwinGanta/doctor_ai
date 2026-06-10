from fastapi import FastAPI
from app.graph_builder import graph

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Doctor AI server running"}


@app.post("/analyze")
def analyze(data: dict):

    symptoms = data["symptoms"]

    result = graph.invoke(
        {
            "symptoms": symptoms
        }
    )

    return result
