from typing import Literal

from pydantic import BaseModel, Field, field_validator


class SalaryRequest(BaseModel):
    work_year: int = Field(
        ...,
        ge=2020,
        le=2035,
        examples=[2023]
    )

    experience_level: Literal["EN", "MI", "SE", "EX"]

    employment_type: Literal["FT", "PT", "CT", "FL"]

    job_title: str = Field(
        ...,
        min_length=2,
        examples=["Data Scientist"]
    )

    employee_residence: str = Field(
        ...,
        min_length=2,
        max_length=2
    )

    remote_ratio: Literal[0, 50, 100]

    company_location: str = Field(
        ...,
        min_length=2,
        max_length=2
    )

    company_size: Literal["S", "M", "L"]

    @field_validator("employee_residence", "company_location")
    @classmethod
    def upper_country(cls, v: str) -> str:
        return v.strip().upper()

    @field_validator("job_title")
    @classmethod
    def clean_title(cls, v: str) -> str:
        return v.strip()


class SalaryResponse(BaseModel):
    predicted_salary_usd: float
    typical_error_usd: float
    model_version: str
