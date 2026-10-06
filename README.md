# Bharath Venu — Portfolio + Admin

Edit everything at `/admin`: text, images, sections, 40+ theme settings, fonts, and GitHub storage.

## Hosting on Vercel (recommended — edits go live in seconds)
Environment variables (Project → Settings → Environment Variables):
- `ADMIN_PASSWORD` — password for /admin
- `GITHUB_TOKEN`   — fine-grained token, this repo only, **Contents: Read and write**
- `GITHUB_REPO`    — e.g. `imbharathvenu/bharathvenu`
- `GITHUB_BRANCH`  — `main`

Admin saves to `public/content.json` (images to `public/uploads/`) in your repo. The live site reads the
content straight from GitHub through `/api/content`, so changes show within seconds, no rebuild needed.
Use **Admin → GitHub & backups → Test connection** to verify token, repo and write permission.

## GitHub Pages
`.github/workflows/deploy.yml` builds and publishes. The site reads the committed `content.json` directly
from GitHub (no rebuild wait). The admin on Pages talks to your Vercel functions (same password); set the
address in Admin → GitHub & backups. Optional build vars: `VITE_GITHUB_REPO=owner/repo`, `VITE_GITHUB_BRANCH=main`.

## Local
`npm install && npm run dev` → http://localhost:3000 (admin: /admin, default password `admin123`; set
`ADMIN_PASSWORD`). Content saves to `data/content.json`; last 30 versions kept in `data/history/`.

## Admin tips
- Ctrl+S save · Ctrl+Z undo · "Live preview" shows unsaved edits instantly.
- Heading fields: press Enter to split a title across lines; each line gets the next accent colour.
- Every save is a GitHub commit; Version history lets you load any older version back.
- Contact form: paste a Formspree URL (Contact → Form endpoint) to receive messages silently.
  Empty = opens the visitor's email app, pre-filled.
