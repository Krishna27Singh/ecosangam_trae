from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from model import forecast_user_emissions


class ForecastRequest(BaseModel):
    user_id: str = "anonymous-user"
    history_days: int = 210


app = FastAPI(title="EcoSangam ML Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175", "http://127.0.0.1:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(request: ForecastRequest):
    result = forecast_user_emissions(
        user_id=request.user_id,
        history_days=max(120, min(request.history_days, 365)),
    )
    return {
        "predictions": result.predictions,
        "explanation": result.explanation,
        "reduction_tips": result.reduction_tips,
        "daily_series": result.daily_series,
        "weekly_series": result.weekly_series,
        "monthly_series": result.monthly_series,
    }
