from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "logistic_regression_model.pkl"

# Selected from OOF training predictions in the ML notebook.
OPTIMIZED_THRESHOLD = 0.55

app = FastAPI(
    title="CardioRisk ML API",
    description="10-year cardiovascular disease risk prediction API.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PatientInput(BaseModel):
    age: float = Field(..., ge=18, le=120)
    education: float = Field(..., ge=1, le=4)
    cigsPerDay: float = Field(..., ge=0, le=100)
    totChol: float = Field(..., gt=0, le=600)
    sysBP: float = Field(..., gt=0, le=300)
    diaBP: float = Field(..., gt=0, le=200)
    BMI: float = Field(..., gt=0, le=100)
    heartRate: float = Field(..., gt=0, le=250)
    glucose: float = Field(..., gt=0, le=500)
    male: int = Field(..., ge=0, le=1)
    currentSmoker: int = Field(..., ge=0, le=1)
    BPMeds: int = Field(..., ge=0, le=1)
    prevalentStroke: int = Field(..., ge=0, le=1)
    prevalentHyp: int = Field(..., ge=0, le=1)
    diabetes: int = Field(..., ge=0, le=1)


def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Model file not found: {MODEL_PATH}. "
            "Copy logistic_regression_model.pkl into backend/models/."
        )
    return joblib.load(MODEL_PATH)


try:
    model = load_model()
    model_error = None
except Exception as exc:
    model = None
    model_error = str(exc)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "model_error": model_error,
        "threshold": OPTIMIZED_THRESHOLD,
    }


@app.post("/predict")
def predict(patient: PatientInput):
    if model is None:
        raise HTTPException(status_code=503, detail=model_error)

    data = pd.DataFrame([patient.model_dump()])
    probability = float(model.predict_proba(data)[0, 1])
    prediction = int(probability >= OPTIMIZED_THRESHOLD)

    return {
        "probability": probability,
        "risk_percentage": round(probability * 100, 2),
        "prediction": prediction,
        "risk_level": "Higher predicted risk" if prediction else "Lower predicted risk",
        "threshold": OPTIMIZED_THRESHOLD,
        "model": "Tuned Logistic Regression",
    }
