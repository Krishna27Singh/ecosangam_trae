# EcoSangam

EcoSangam is a full-stack sustainability web app to help users:

- track carbon footprint
- get AI sustainability tips
- set eco goals and maintain streaks
- receive completion certificates by email
- scan receipts/products/meals for emission estimates
- view ARIMA-based emission forecasts (day/week/month)

---

## 1) Project Structure

```text
ecosangam_trae/
  client/        # React + TypeScript + Tailwind frontend (Vite)
  server/        # Node.js + Express backend + MongoDB
  ml_service/    # FastAPI microservice (ARIMA forecasting on synthetic data)
  certs/         # Generated PDF certificates
```

---

## 2) Prerequisites

Install these before running:

- Node.js 18+ (recommended 20+)
- npm 9+
- Python 3.9+ (for `ml_service`)
- pip
- MongoDB (local or Atlas)

Optional:

- virtualenv (`python -m venv`)

---

## 3) Environment Variables

Create environment files from the templates below.  
Do **not** commit real secrets.

### `server/.env`

```env
PORT=8890
MONGO_URI=mongodb://127.0.0.1:27017/ecosangam

JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here

CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret

GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL=your_email@gmail.com

FRONTEND_URL=http://localhost:5175
BACKEND_URL=http://localhost:8890
NODE_ENV=development
```

### `client/.env`

```env
VITE_BACKEND_URI=http://localhost:8890
VITE_ML_SERVICE_URI=http://localhost:8001
```

---

## 4) Database Setup (MongoDB)

### Option A: Local MongoDB

1. Install MongoDB Community Edition.
2. Start MongoDB service.
3. Use:
   - `MONGO_URI=mongodb://127.0.0.1:27017/ecosangam`

### Option B: MongoDB Atlas

1. Create cluster on MongoDB Atlas.
2. Create DB user and allow IP access.
3. Copy connection string and set:
   - `MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/ecosangam?...`

---

## 5) Install Dependencies

From project root:

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd ../client
npm install
```

### ML Service

```bash
cd ../ml_service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Windows (PowerShell):

```powershell
.venv\Scripts\Activate.ps1
```

---

## 6) Run the Project (3 terminals)

### Terminal 1: Backend API

```bash
cd server
node server.js
```

Expected:
- `MongoDB connected`
- `Server running on http://localhost:8890`

### Terminal 2: Frontend

```bash
cd client
npm run dev
```

Expected:
- `http://localhost:5175`

### Terminal 3: ML Service

```bash
cd ml_service
source .venv/bin/activate
uvicorn app:app --reload --port 8001
```

Expected:
- `http://localhost:8001`

---

## 7) Quick Health Checks

Backend:

```bash
curl http://localhost:8890/test
```

ML service:

```bash
curl http://localhost:8001/health
```

If both are healthy, open:

- [http://localhost:5175](http://localhost:5175)

---

## 8) Main Features

- Auth (signup/login + JWT)
- Dashboard metrics
- AI sustainability tips (Gemini)
- Eco goals, streaks, progress tracking
- Completion certificates (PDF + email)
- Eco Scanner (receipt/food/product image analysis)
- ARIMA forecast section in dashboard (next day/week/month + tips)

---

## 9) API Notes

Backend base:
- `http://localhost:8890`

Important routes:
- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me`
- `POST /api/tips`
- `POST /api/eco-scanner/scan`
- `POST /completedecogoal`

ML service base:
- `http://localhost:8001`

Important routes:
- `GET /health`
- `POST /predict`

---

## 10) Troubleshooting

- **Frontend cannot reach backend**
  - Verify `VITE_BACKEND_URI` in `client/.env`
  - Restart frontend after env changes

- **ML predictions not loading**
  - Verify `VITE_ML_SERVICE_URI=http://localhost:8001`
  - Ensure FastAPI service is running

- **MongoDB connection errors**
  - Check `MONGO_URI`
  - Ensure DB service/Atlas access is available

- **Gemini errors (429 / quota exceeded)**
  - Check API key and billing/quota in Google AI Studio
  - Some flows include fallback behavior when quota is exceeded

- **Email/certificate issues**
  - Use valid `EMAIL_USER` + app password in `EMAIL_PASS`
  - Verify SMTP provider allows app access

---

## 11) Production Notes

- Keep all secrets in environment variables
- Never commit `.env` with real keys
- Restrict CORS origins for production domains only
- Run services behind a process manager/reverse proxy

---

## 12) License

Add your preferred license file (`MIT`, `Apache-2.0`, etc.) if open-sourcing publicly.
