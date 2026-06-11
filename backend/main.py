from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.graph_builder import graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.post("/hospitals")
def hospitals(data: dict):
    return {"message": "Hospitals endpoint"}