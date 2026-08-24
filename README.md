# 2BS College Ball
A fictional college football universe powered by Google Sheets and rendered through a custom multi‑page web app.

This project blends sports fandom, creative world‑building, and data-driven UI. All teams, owners, schedules, and weekly results are stored in Google Sheets and displayed dynamically through vanilla JavaScript.

---

## 📌 Features

- **Owners Page** — Each owner has a roster of teams, clickable logos, and a full schedule.
- **Teams Page** — Every team has a profile, logo, next five games, and full season schedule.
- **Dynamic Schedules** — All game data is pulled from Google Sheets and rendered automatically.
- **Google Sheets Backend** — No database required; everything updates instantly from Sheets.
- **Reusable Components** — Header, navbar, footer, cards, and layout system.
- **Lightweight Front-End** — Pure HTML, CSS, and JavaScript. No frameworks.

---

## 🗂 Project Structure

/assets        # Logos, helmets, images
/components    # Header, navbar, footer, cards
/scripts       # Page-specific JS + Sheets API integration
/styles        # Modular CSS files
/pages         # All HTML pages (owners, teams, schedule, etc.)

Code

---

## 🔌 Data Source (Google Sheets)

All league data comes from a single Google Sheets document.

The app fetches data using the Google Sheets API:

https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{sheetName}?key={API_KEY} (sheets.googleapis.com in Bing)

Code

Each sheet (Teams, Owners, Scores, etc.) is converted into structured objects and used to render pages.

---

## 🚀 Running Locally

Because this is a static site, you only need a local server:

### Option 1 — VS Code Live Server  
Click **“Go Live”**.

### Option 2 — Python  
python3 -m http.server

Code

Then open:

http://localhost:8000

Code

---

## 📁 Deployment

The site is deployed via GitHub Pages:

https://<username>.github.io/<repo>/

Code

Just push to `main` and GitHub Pages handles the rest.

---

## 🛡 About This Project

2BS College Ball is a **fictional** sports universe.  
It is **not affiliated** with the NCAA, any real university, or any real athletic conference.  
Logos and references are used in a **parody / creative context** only.

See `about.html` for full details.

---

## 🤝 Contributing

This project is primarily maintained by the league commissioner and participating owners.

If you want to contribute:

- Keep JS modular  
- Keep CSS scoped  
- Do not hardcode data  
- Use the Sheets API for all data access  

---

## 📬 Contact

For questions or requests, contact the league commissioner.
