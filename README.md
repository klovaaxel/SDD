# SDD 2026 calendar export

Static web app to choose parallel sessions from the official agenda grid, preview a compact timeline, download an `.ics` calendar file (with 15‑minute alarms in your calendar app), and share your picks via URL or JSON backup.

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

1. In the repository **Settings → Pages**, under **Build and deployment**, set **Source** to **Deploy from a branch**.
2. Choose branch **`gh-pages`**, folder **`/ (root)`**, then save. (The first successful workflow run creates that branch.)
3. Push to **`main`**; the workflow builds the site and pushes **`dist/`** to **`gh-pages`**.

The app uses relative asset paths (`base: './'`), so it works both at the root of `username.github.io` and under `username.github.io/repo-name/`.

## Notes

- **Source of truth:** Session titles and times follow [sddconf.com/agenda](https://sddconf.com/agenda); confirm last‑minute changes on site.
- **Reminders:** Import the downloaded `.ics` into Apple Calendar, Google Calendar, or Outlook — alarms are handled by your calendar app, which works reliably on static hosting (GitHub Pages).
