markdown
# 2BS College Ball
A fictional college football universe built on a lightweight, modular front‑end and a Google Sheets data backend.  
Teams, owners, games, logos, helmets, and league lore all flow through a clean normalization + composition pipeline and render into dynamic pages.

---

## What This Project Is
2BS College Ball is a custom, parody‑universe football league featuring:

- Weekly schedules and game results  
- Dynamic team, owner, and game detail pages  
- A simple Sheets‑powered data engine  

Everything updates instantly when the sheet updates.

---

## Core Features
- **Live Data Pipeline**  
  Google Sheets → Fetch → Normalize → Compose → Render.

- **Modular Components**  
  Cards, layouts, navigation, and utilities built for reuse.

- **Dynamic Pages**  
  Teams, Owners, Games, Schedule, Standings (in progress).

- **Team Identity System**  
  Logos, helmets, colors, mascots, and metadata displayed in hero layouts.

---

## Scoring System Status
The scoring engine is **not installed yet**.  
Upcoming modules include:

- Weekly scoring system  
- Season standings  
- Postseason scoring and bracket logic  
- Award tracking  
- Poll tracking (weekly rankings and movement)

These systems will plug directly into the existing normalization and composition pipeline.

---

## Project Structure
src/
pages/        # HTML views
scripts/      # Controllers, routing, API wrappers
components/   # Cards, header, footer, navbar
data/         # Normalizers, composers, fetchers, schemas
styles/       # Global + component CSS
assets/       # Logos, helmets, icons, backgrounds

Code

---

## How It Works
1. Sheets API fetches raw rows  
2. Normalize → clean and validate  
3. Compose → enrich with linked data  
4. Render → build pages with modular components  
5. Update → sheet changes instantly reflect on the site  

---

## Local Development
Start a simple local server:

python3 -m http.server

Code

Open:

http://localhost:8000/src/pages/index.html

Code

---

## Creative Notice
2BS College Ball is a fictional parody project.  
All teams, owners, and identities exist solely within this universe.

---

## Roadmap
- Team page polish  
- Rivalry UI enhancements  
- Poll tracking
- Conference pages  
- Standings engine  
- Weekly scoring system  
- Postseason module  
- Award tracking  
