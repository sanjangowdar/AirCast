# AirCast Frontend

A dark black-and-gold React frontend prototype for the AirCast air-quality project.

## Requirements
- Node.js 20.19+ or 22.12+
- VS Code

## Run locally
1. Extract this folder.
2. Open the `aircast-frontend` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Build check

```bash
npm run build
```

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Open Vercel and import that repository.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

## Important prototype notes
- Login is a frontend-only demo gate; it is NOT secure authentication.
- Profile/onboarding preferences are stored in browser localStorage.
- The prediction uses an illustrative formula, not a trained statistical model.
- Dashboard charts currently use sample/illustrative values.
- Next integration step: connect a Python Flask/FastAPI backend, a real historical weather + AQI dataset, a trained regression model, and a proper authentication provider (e.g. Supabase Auth).
- Do not present demo values as live air-quality readings or validated forecasts.
