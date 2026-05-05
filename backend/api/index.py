from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('models/best_model.pkl')

class SalaryInput(BaseModel):
    job_title: str
    experience_level: str
    employment_type: str
    company_size: str
    company_location: str
    work_year: int
    remote_ratio: int

@app.get("/")
def root():
    return {"message": "API is running"}

@app.post("/predict")
def predict(data: SalaryInput):
    df = pd.DataFrame([data.dict()])
    pred = model.predict(df)[0]
    return {'predicted_salary_usd': round(float(pred), 2)}