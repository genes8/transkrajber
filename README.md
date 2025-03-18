# Transkrajber

Audio transkribovanje i analiza zvuka.

## Potrebne Dependencies

### Frontend Dependencies

Frontend aplikacija koristi sledeće pakete:

```bash
# Core Dependencies
next@15.2.3           # Next.js framework
react@19.0.0          # React biblioteka
react-dom@19.0.0      # React DOM

# State Management i HTTP
@tanstack/react-query@5.68.0  # State management
axios@1.8.3                   # HTTP klijent

# Forms i UI
react-hook-form@7.54.2  # Upravljanje formama
react-icons@5.5.0       # UI ikone

# Audio Processing
wavesurfer.js@7.9.1     # Audio vizualizacija i manipulacija
```

### Backend Dependencies

Backend koristi FastAPI framework. Instalirajte sledeće pakete:

```bash
# Core Dependencies
fastapi            # FastAPI framework
uvicorn            # ASGI server
python-multipart   # Za file upload
pydantic          # Data validation

# Audio Processing
whisper           # OpenAI Whisper za transkribovanje
torch             # PyTorch za Whisper
numpy             # Numerička obrada
```

## Instalacija i Pokretanje

### Frontend

```bash
# Instalacija dependencies
cd frontend
npm install

# Pokretanje development servera
npm run dev

# Build za produkciju
npm run build
npm start
```

### Backend

```bash
# Instalacija dependencies
cd backend
pip3 install -r requirements.txt

# Pokretanje servera
uvicorn main:app --reload
```

## Funkcionalnosti

- Snimanje zvuka uživo
- Otpremanje audio fajlova
- Transkribovanje audio sadržaja
- Pregled i pretraga transkripta
- Analiza razgovora

## Struktura Projekta

```
transkrajber/
├── frontend/           # Next.js frontend aplikacija
│   ├── src/           # Source kod
│   ├── public/        # Statički fajlovi
│   └── ...
└── backend/           # FastAPI backend
    ├── main.py       # Glavni API fajl
    └── ...
```
