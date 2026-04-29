# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Termo" / "Codle" — a Portuguese Wordle clone. The user-facing language is Portuguese (pt-BR); keep UI strings consistent with that.

The repo is a monorepo with two independent services:
- `codle-react/` — React 19 + TypeScript + Vite + Tailwind v4 frontend.
- `backend/djangotutorial/termo_backend/` — Django 6 + DRF backend, persisting `Word` documents to MongoDB via `django-mongodb-backend`.

## Common commands

Frontend (`codle-react/`):
- `npm install` — install deps.
- `npm run dev` — Vite dev server on `5173`.
- `npm run build` — `tsc -b && vite build`. Type errors fail the build.
- `npm run lint` — ESLint over the project.
- `npm run preview` — preview built bundle.

Backend (`backend/djangotutorial/termo_backend/`):
- `python manage.py runserver 0.0.0.0:8000` — dev server.
- `python manage.py makemigrations` / `migrate` — schema changes.
- `python manage.py shell` — used to seed words (model is `base.models.Word`, single `word` CharField, exactly 5 chars).
- Requires `MONGO_URI` env var; settings load it via `python-dotenv` from `backend/.env`.

Docker:
- Root `docker-compose.yaml` — builds both services with their `dockerfile.prod` (frontend on `3000`, backend on `8000`). Needs `UID`, `GID`, `MONGO_URI` set in environment.
- `codle-react/docker-compose.dev.yaml` — Vite dev container on `5173` with bind-mount + named `node_modules` volume (`docker compose -f docker-compose.dev.yaml up`).
- `backend/docker-compose.yaml` — backend-only dev with bind-mount.

CI (`.github/workflows/main.yaml`): on push to `main`, builds **only** the frontend image and pushes to `${DOCKERHUB_USERNAME}/wordle:latest`. Backend is not part of CI publishing.

## Architecture

### Frontend state machine

The game is driven by a single `rowStatus: string[6]` in `GameScreen.tsx`, with values `"activated" | "completed" | "deactivated"`. `GameRow` renders a different sub-component per status:

- `activated` → `WordInput` (controlled 5-input form).
- `completed` → `WordCorrectness` (computes per-letter feedback against `gameWord`).
- `deactivated` → empty squares.

On submit, `GameRow.startCorrection` walks `rowStatus`, flipping the first `"activated"` to `"completed"` and activating the next row. When all rows are completed, `GameScreen`'s effect sets `isEndGameModalOpen` to `[true, "lost"]`. `WordCorrectness` triggers `[true, "won"]` if every letter is `right-position`.

`WordCorrectness.seeIfAWordIsCorrect` is a nested loop, not a frequency-aware Wordle algorithm: any letter that appears in the target gets `wrong-position`, upgraded to `right-position` only on positional match. It does **not** handle duplicate-letter accounting the way the real game does — preserve or fix this deliberately, don't refactor accidentally.

### Cross-component communication

`App.tsx` defines two contexts (`ModalContext`, `EndGameContext`) and exports `useModalContext` / `useEndGameContext`. Most state still flows through props; the contexts exist so deeply-nested components (`WordInput`, `WordCorrectness`) can reach modal state without prop drilling.

To restart the game, `App.tsx` increments `tryAgainKey` and passes it as `key` to `<GameScreen>` — a forced remount is the reset mechanism. Don't try to "properly" reset state inside `GameScreen`; the remount is intentional.

### Word source (currently inconsistent)

There are two word sources and they don't agree:
- `codle-react/assets/data/words.json` — local list, imported but unused.
- `https://wordle-backend-sc1m.onrender.com/api/words` — hardcoded URL in `GameScreen.tsx` `useEffect`. This is what actually drives the game.

The local backend (`api/words/`) is the same shape (`[{word: "..."}]`) but the frontend is not wired to it. Switching to the local backend means changing the fetch URL in `GameScreen.tsx`.

### Backend

- Django project config package: `config/` (settings, urls, wsgi, asgi, apps).
- Apps: `base` (the `Word` model) and `api` (DRF view + serializer + URL).
- Single endpoint: `GET /api/words/` → list of all words. There is no create/update/delete API; words are seeded via Django admin or shell.
- MongoDB-specific config in `config/settings.py`: custom `apps.py` overrides `default_auto_field` to `ObjectIdAutoField` for `admin`/`auth`/`contenttypes`, and `MIGRATION_MODULES` redirects those apps' migrations to `mongo_migrations/{admin,auth,contenttypes}/`. Built-in app migrations live there, **not** in each app's package — don't try to "fix" this.
- `db.sqlite3` exists in the repo but is empty; the real DB is MongoDB.
- CORS is allow-listed for `localhost:3000`, `localhost:5173`, and `https://termo-7n23.onrender.com`. Add new origins to `CORS_ALLOWED_ORIGINS` in `settings.py`.
- Production deploys assume Render: `DEBUG` flips off when `RENDER` is in the environment, and `ALLOWED_HOSTS` includes `.onrender.com`.

## Conventions

- Use comments sparingly. Only comment genuinely complex or non-obvious code; skip self-explanatory lines.
- Frontend components live flat in `codle-react/src/` (not under a `components/` tree). The one `src/components/modalerror/` directory is empty stubs — ignore unless asked to fill it in.
- The custom `dockerfile` filenames (lowercase, plus `dockerfile.dev` / `dockerfile.prod` / `dockerfile.prodOpt`) are referenced explicitly by compose files; renaming them breaks builds.
- `package-lock.json` at the repo root is a stub — the real lockfile is in `codle-react/`.
