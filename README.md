# Salary Predictor


---

### Features

- **RidgeCV ML Engine:** L2-regularized linear model calibrated to prevent multi-collinearity overfit.
- **FastAPI Backend:** Lightweight asynchronous REST API with strict Pydantic validation & health endpoints.
- **Editorial UI:** Built with React 19, Tailwind CSS v4, and Plus Jakarta Sans for a clean fintech look.
- **Zustand State:** Fast client-side state handling with 1-click test profiles and session comparison benchmarks.
- **Statistical Confidence:** Displays realistic margin of error (±$37.2k MAE) instead of arbitrary estimates.

---

### Architecture

```
  ┌─────────────┐       REST / JSON       ┌──────────────┐
  │   React UI  │ ──────────────────────> │ FastAPI Back │
  │  (Vite + Z) │ <────────────────────── │ (Port: 8000) │
  └─────────────┘                         └──────┬───────┘
                                                 │
                                           joblib.load()
                                                 ▼
                                          ┌──────────────┐
                                          │ RidgeCV v1   │
                                          │ (R²: 0.455)  │
                                          └──────────────┘
```

---

### Quickstart

#### 1. Backend (FastAPI)
```bash
cd api
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### 2. Frontend (React + Vite)
```bash
cd ui
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

### Model Snapshot

| Metric | Specification |
| :--- | :--- |
| **Algorithm** | RidgeCV (OneHotEncoder + StandardScaler) |
| **Dataset** | 2,584 Verified Global Tech Salaries |
| **Test MAE** | ~$37,160 USD |
| **R² Score** | 0.455 |

---

### Tech Stack

- **Machine Learning:** `scikit-learn`, `pandas`, `numpy`, `joblib`
- **Backend:** `FastAPI`, `Pydantic v2`, `Uvicorn`
- **Frontend:** `React 19`, `Vite`, `Tailwind CSS v4`, `Zustand`, `Lucide React`
