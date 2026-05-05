# Salary Predictor

> Predict data science salaries using a trained ML pipeline served via a REST API

---

## Project Overview

This project is an end-to-end machine learning application that predicts data science salaries based on features like job title, experience level, employment type, company size, location, and remote ratio. It covers the full ML lifecycle — from raw data analysis to a deployed web application.


https://github.com/user-attachments/assets/32eda4a4-0cd7-4dd9-b7a3-d1999bb595d1


---

## Project Structure

```
salary-predictor/
├── backend/          # FastAPI app + trained model
│   ├── api/
│   ├── models/       # best_model.pkl
│   ├── requirements.txt
│   └── vercel.json
├── frontend/         # React + Vite UI
│   └── src/
├── notebooks/
│   ├── eda.ipynb
│   └── ds_salaries_modeling.ipynb
└── data/
    └── ds_salaries.csv
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Data & ML | Python, Pandas, Scikit-learn | EDA, feature engineering, model training |
| Model Serialization | Joblib | Save & load trained pipeline |
| Backend API | FastAPI | REST endpoint for predictions |
| Frontend | React + Vite | User interface |
| Deployment | Vercel | Hosting backend & frontend |

---

## Exploratory Data Analysis

Full EDA is in `notebooks/eda.ipynb`.

| Finding | Detail |
|---------|--------|
| Dataset Shape | 3,755 rows x 11 columns |
| Missing Values | None |
| Duplicates | 1,171 rows (~31%) |
| Salary Range | $5,132 - $450,000 |
| Most Common Job | Data Scientist / Data Engineer |
| Highest-Paid Level | Executive (EX) |
| Dominant Country | United States |
| Salary Trend | Increasing year over year |
| Remote Work | Majority fully remote |

**Key insights:**
- Salary is right-skewed — executives earn far above the median
- Experience level is the strongest salary driver: EX earns ~2x more than EN
- Fully remote roles pay slightly more than on-site
- Salary grew year-over-year from 2020 to 2023

---

## EDA Screenshots

**Salary Distribution**

<img width="1692" height="593" alt="image" src="https://github.com/user-attachments/assets/f839b24b-e33a-457a-aaf8-dc84fa61951e" />


---

**Average Salary by Experience Level**

<img width="985" height="613" alt="image" src="https://github.com/user-attachments/assets/07548cbe-88d3-4f67-b487-a14abaed827b" />


---

**Top 10 Highest-Paying Job Titles**

<img width="1247" height="738" alt="image" src="https://github.com/user-attachments/assets/66090bf1-0d4b-4daf-9e35-318300093b3d" />


---

## Model Selection & Training

Full pipeline is in `notebooks/ds_salaries_modeling.ipynb`.

### Preprocessing Pipeline

A scikit-learn `ColumnTransformer` inside a `Pipeline`:
- **Numeric** (`work_year`, `remote_ratio`) → `StandardScaler`
- **Categorical** (`job_title`, `experience_level`, etc.) → `OneHotEncoder`

### Models Evaluated

| Model | MAE | RMSE | R2 |
|-------|-----|------|----|
| Linear Regression | ~$28K | ~$38K | ~0.55 |
| Ridge Regression | ~$27K | ~$37K | ~0.56 |
| Lasso Regression | ~$28K | ~$38K | ~0.54 |
| Polynomial Regression | ~$26K | ~$36K | ~0.58 |
| SVR | ~$30K | ~$41K | ~0.50 |
| Decision Tree | ~$22K | ~$34K | ~0.62 |
| **Random Forest** | **~$18K** | **~$28K** | **~0.76** |

### Why Random Forest?

- Best R2 (~0.76) — explains the most variance in salaries
- Lowest MAE (~$18K) — closest predictions on average
- Robust to outliers via ensemble averaging
- Handles mixed feature types naturally after encoding
- No need for feature scaling (tree-based model)
- Reduces overfitting by averaging across many trees

The trained pipeline is saved as `models/best_model.pkl` using Joblib.

---

## FastAPI Backend

### How It Works

1. On startup, the server loads `best_model.pkl` via `joblib.load()`
2. Client sends a `POST /predict` request with JSON input
3. FastAPI validates input against the `SalaryInput` Pydantic schema
4. Input is converted to a DataFrame and passed to `model.predict()`
5. Predicted salary is returned as JSON

### Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Health check |
| POST | `/predict` | Returns predicted salary |

### Example

**Request:**
```json
{
  "job_title": "Data Scientist",
  "experience_level": "SE",
  "employment_type": "FT",
  "company_size": "M",
  "company_location": "US",
  "work_year": 2023,
  "remote_ratio": 100
}
```

**Response:**
```json
{
  "predicted_salary_usd": 142500.00
}
```

### Why FastAPI?

- Auto-generated Swagger docs at `/docs`
- Pydantic validation rejects malformed input before it reaches the model
- Async-ready with minimal inference latency
- CORS middleware allows the React frontend to call from any origin

---

## How to Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn api.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`, proxying API requests to FastAPI on port `8000`.

---

## Deployment

Both backend and frontend are deployed on **Vercel**. The `vercel.json` in the backend directory configures FastAPI as a serverless function. The frontend is deployed as a static Vite build.
