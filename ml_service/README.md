# EcoSangam ML Service (ARIMA Forecast)

This FastAPI microservice trains an ARIMA model on synthetic historical emission data per user and predicts:

- next-day emission
- next-week emission
- next-month emission

It also returns:

- forecast explanation
- reduction tips
- daily/weekly/monthly graph series

## Run locally

```bash
cd ml_service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8001
```

## API

- `GET /health`
- `POST /predict`

### Request

```json
{
  "user_id": "user@example.com",
  "history_days": 210
}
```
