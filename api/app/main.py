import json

from contextlib import asynccontextmanager
from pathlib import Path

import joblib
import pandas as pd

from fastapi import FastAPI
from app.schemas import SalaryRequest, SalaryResponse


MODEL_DIR = Path(__file__).resolve().parent.parent / "models"


# Load model and metadata once at application startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = joblib.load(
        MODEL_DIR / "salary_model_v1.joblib"
    )

    app.state.meta = json.loads(
        (MODEL_DIR / "metadata.json").read_text()
    )

    yield


# Initialize FastAPI application
app = FastAPI(
    title="Salary Prediction API",
    version="1.0.0",
    lifespan=lifespan
)


# Health check endpoint
@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_version": app.state.meta["model_version"]
    }


# Salary prediction endpoint
@app.post("/predict", response_model=SalaryResponse)
def predict(req: SalaryRequest):
    X = pd.DataFrame([req.model_dump()])  # same column names as training
    pred = float(app.state.model.predict(X)[0])

    return SalaryResponse(
        predicted_salary_usd=round(max(pred, 0.0), 2),
        typical_error_usd=app.state.meta["test_mae"],
        model_version=app.state.meta["model_version"],
    )