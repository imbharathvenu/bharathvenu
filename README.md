# Bharath Venu — Portfolio + Admin

## Hosting (Vercel)
Environment variables (Project > Settings > Environment Variables):
- ADMIN_PASSWORD  — password for /admin
- GITHUB_TOKEN    — fine-grained token, this repo only, Contents: Read and write
- GITHUB_REPO     — imbharathvenu/bharathvenu
- GITHUB_BRANCH   — main

Admin: https://<your-project>.vercel.app/admin  (password only)
Edits are saved to public/content.json (and images to public/uploads/) in the GitHub repo.

## GitHub Pages
The workflow in .github/workflows/deploy.yml builds and publishes the site.
Settings > Pages > Source = GitHub Actions.
