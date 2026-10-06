# Bharath Venu — Portfolio + Admin

Same design as bharath-main, now with a content admin panel.

## Run
    npm install
    cp .env.example .env      # set ADMIN_PASSWORD
    ADMIN_PASSWORD=yourpass npm run dev        # http://localhost:3000  ·  admin: /admin

## Production
    npm run build
    ADMIN_PASSWORD=yourpass npm start

## How it works
- Content lives in `data/content.json` (created on first save; defaults come from `src/data/portfolioData.ts`).
- Uploaded images go to `uploads/`. Back up both `data/` and `uploads/`.
- `/admin` edits every section: personal/contact, tags, images, capabilities, experience, flow, skills, education, leadership, languages, career focus, gallery. Add / remove / reorder items, upload images, Save = live instantly.
- Needs a Node host (Render, Railway, VPS) with a persistent disk for `data/` and `uploads/`.
