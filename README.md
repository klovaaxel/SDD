# SDD 2026 schedule picker

Static web app to choose parallel sessions from the SDD 2026 PDF grid, see a compact timeline, export an `.ics` calendar (with 15‑minute alarms), share your picks via URL, and optionally use browser notifications while the page stays open.

## Run locally

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

Output is written to `dist/`.

## GitHub Pages

1. In the repository **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from branch”).
2. Push to `main`; the workflow in `.github/workflows/pages.yml` builds and deploys `dist/`.

The app uses relative asset paths (`base: './'`), so it works both at the root of `username.github.io` and under `username.github.io/repo-name/`.

## Notes

- **Wednesday** parallel sessions are not present in the PDF extract used to build the dataset; the app shows a placeholder and a personal note field.
- **Notifications:** Pure static hosting cannot schedule push notifications when the site is closed. Use **Export .ics** for calendar alarms, or keep the tab open with **Enable browser reminders**.
