from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta
import hashlib
import numpy as np
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA


@dataclass
class ForecastResult:
    predictions: dict
    explanation: str
    reduction_tips: list[str]
    daily_series: list[dict]
    weekly_series: list[dict]
    monthly_series: list[dict]


def _seed_from_user(user_id: str) -> int:
    digest = hashlib.sha256(user_id.encode("utf-8")).hexdigest()
    return int(digest[:8], 16)


def generate_synthetic_emission_history(user_id: str, days: int = 210) -> pd.DataFrame:
    rng = np.random.default_rng(_seed_from_user(user_id))
    start_date = datetime.now() - timedelta(days=days - 1)
    dates = [start_date + timedelta(days=i) for i in range(days)]

    trend = np.linspace(2.7, 3.5, days)
    weekly_seasonality = 0.28 * np.sin(2 * np.pi * np.arange(days) / 7)
    monthly_pattern = 0.14 * np.sin(2 * np.pi * np.arange(days) / 30)
    noise = rng.normal(0, 0.08, days)

    emissions = np.clip(trend + weekly_seasonality + monthly_pattern + noise, 1.8, None)
    return pd.DataFrame({"date": dates, "emission_kg": emissions})


def _fit_arima(series: pd.Series) -> ARIMA:
    # d=1 handles trend; p/q capture autocorrelation + shock effects.
    return ARIMA(series, order=(2, 1, 2)).fit()


def _build_explanation(df: pd.DataFrame, next_day: float) -> str:
    recent_avg = float(df["emission_kg"].tail(14).mean())
    older_avg = float(df["emission_kg"].iloc[-42:-14].mean()) if len(df) >= 42 else recent_avg
    trend_direction = "upward" if recent_avg >= older_avg else "downward"
    delta = abs(recent_avg - older_avg)

    return (
        f"The ARIMA model identifies a {trend_direction} recent trend in your emissions "
        f"(~{delta:.2f} kg difference between recent and earlier windows), and also captures "
        f"weekly seasonality patterns. Based on this time-dependency, your next-day estimate "
        f"is {next_day:.2f} kg CO2."
    )


def _build_reduction_tips(next_day: float, next_week: float) -> list[str]:
    high = next_day >= 3.6 or next_week >= 24
    if high:
        return [
            "Replace 2-3 short car rides this week with bike, walking, or shared transit.",
            "Shift at least 3 meals this week toward plant-forward options.",
            "Set a nightly energy shutdown routine (standby devices, lights, cooling).",
            "Batch deliveries and shopping to reduce transport emission spikes.",
        ]
    return [
        "Keep your current momentum and target one additional low-emission habit this week.",
        "Choose local produce and lower-packaging products on your next grocery run.",
        "Track one avoidable emission source daily and reduce it by 10-15%.",
    ]


def forecast_user_emissions(user_id: str, history_days: int = 210) -> ForecastResult:
    df = generate_synthetic_emission_history(user_id=user_id, days=history_days)
    model = _fit_arima(df["emission_kg"])

    daily_forecast = model.forecast(steps=30)
    next_day = float(daily_forecast.iloc[0])
    next_week = float(daily_forecast.iloc[:7].sum())
    next_month = float(daily_forecast.iloc[:30].sum())

    daily_history = df.tail(30).copy()
    daily_history["label"] = daily_history["date"].dt.strftime("%m-%d")
    daily_history_points = [
        {"label": row["label"], "value": round(float(row["emission_kg"]), 2), "type": "historical"}
        for _, row in daily_history.iterrows()
    ]

    next_day_date = (df["date"].max() + timedelta(days=1)).strftime("%m-%d")
    daily_series = daily_history_points + [
        {"label": next_day_date, "value": round(next_day, 2), "type": "forecast"}
    ]

    weekly_hist = (
        df.set_index("date")["emission_kg"]
        .resample("W")
        .sum()
        .tail(3)
        .reset_index()
    )
    weekly_series = [
        {"label": f"W-{len(weekly_hist) - i}", "value": round(float(row["emission_kg"]), 2), "type": "historical"}
        for i, (_, row) in enumerate(weekly_hist.iterrows(), start=1)
    ]
    weekly_series.append({"label": "Next", "value": round(next_week, 2), "type": "forecast"})

    monthly_hist = (
        df.set_index("date")["emission_kg"]
        .resample("ME")
        .sum()
        .tail(3)
        .reset_index()
    )
    monthly_series = [
        {"label": f"M-{len(monthly_hist) - i}", "value": round(float(row["emission_kg"]), 2), "type": "historical"}
        for i, (_, row) in enumerate(monthly_hist.iterrows(), start=1)
    ]
    monthly_series.append({"label": "Next", "value": round(next_month, 2), "type": "forecast"})

    return ForecastResult(
        predictions={
            "next_day": round(next_day, 2),
            "next_week": round(next_week, 2),
            "next_month": round(next_month, 2),
        },
        explanation=_build_explanation(df, next_day),
        reduction_tips=_build_reduction_tips(next_day, next_week),
        daily_series=daily_series,
        weekly_series=weekly_series,
        monthly_series=monthly_series,
    )
