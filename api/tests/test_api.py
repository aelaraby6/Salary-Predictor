from fastapi.testclient import TestClient
from app.main import app

VALID = {
    "work_year": 2023,
    "experience_level": "SE",
    "employment_type": "FT",
    "job_title": "Data Scientist",
    "employee_residence": "us",
    "remote_ratio": 100,
    "company_location": "US",
    "company_size": "M",
}


def test_health():
    with TestClient(app) as client:
        r = client.get("/health")

        assert r.status_code == 200
        assert r.json()["status"] == "ok"


def test_predict_ok():
    with TestClient(app) as client:
        r = client.post("/predict", json=VALID)

        assert r.status_code == 200
        assert 10_000 < r.json()["predicted_salary_usd"] < 600_000


def test_invalid_level_rejected():
    with TestClient(app) as client:
        r = client.post(
            "/predict",
            json={**VALID, "experience_level": "XX"}
        )

        assert r.status_code == 422